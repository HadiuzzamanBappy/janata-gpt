import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@repo/auth/server';
import { streamChatResponse, getModel, defaultModels } from '@repo/ai';
import { NextResponse } from 'next/server';
import type { UIMessage } from 'ai';

type MessageInput = UIMessage | { content?: string; parts?: Array<{ type: string; text?: string }> } | undefined;

function extractMessageText(msg: MessageInput): string {
  if (!msg) return '';
  if ('content' in msg && typeof msg.content === 'string' && msg.content) return msg.content;
  if ('parts' in msg && Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
      .map((p) => p.text)
      .join('');
  }
  return '';
}

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    // 1. Authenticate user securely via Supabase SSR
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the very last user message text to save to DB
    const lastMessage = messages[messages.length - 1];
    const lastMessageText = extractMessageText(lastMessage);
    const firstMessageText = extractMessageText(messages[0]);
    
    // 2. Ensure chat session exists and save user message (Zero-Bottleneck approach)
    if (sessionId && lastMessage?.role === 'user') {
      // Upsert the session first to satisfy foreign key constraints
      await supabase
        .from('chat_sessions')
        .upsert(
          { 
            id: sessionId, 
            user_id: user.id, 
            title: firstMessageText.substring(0, 50) || "New Chat" 
          }, 
          { onConflict: 'id' }
        );

      const { error: dbError } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          role: 'user',
          content: lastMessageText,
        });
        
      if (dbError) {
        console.error('Failed to save user message:', dbError);
      }
    }

    // 3. Trigger the AI Stream (Powered by DeepSeek)
    return await streamChatResponse(
      messages,
      "You are Janata GPT powered by DeepSeek. Think creatively and assist the user with maximum effort.",
      getModel(defaultModels.deepseekChat),
      
      // 4. Background Database Saving (Triggers silently when AI finishes)
      async ({ text, toolCalls }) => {
        if (!sessionId) return; // Skip saving if no session provided

        // Wait for the stream to completely finish, then save AI response
        const { error: aiDbError } = await supabase
          .from('chat_messages')
          .insert({
            session_id: sessionId,
            role: 'assistant',
            content: text,
            tool_calls_json: toolCalls?.length ? JSON.parse(JSON.stringify(toolCalls)) : null,
          });

        if (aiDbError) {
          console.error('Failed to save AI message:', aiDbError);
        }
      }
    );

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
