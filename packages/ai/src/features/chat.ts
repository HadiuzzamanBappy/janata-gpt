import { type LanguageModel, streamText, convertToModelMessages, type UIMessage } from "ai";
import { FEATURE_ROUTES, type ChatMode } from "../core/registry";
import { getModel } from "../core/client";
import { aiTools } from "../tools";

export interface StreamChatOptions {
  mode?: ChatMode;
  model?: LanguageModel;
  systemPrompt?: string;
  onFinish?: Parameters<typeof streamText>[0]["onFinish"];
}

/**
 * Universal Chat Streamer Feature.
 * Streams response based on feature intent mode ('fast', 'reasoning', 'coder', etc.).
 */
export async function streamChatResponse(
  messages: UIMessage[],
  options: StreamChatOptions = {}
): Promise<Response> {
  const mode = options.mode ?? 'fast';
  const model = options.model ?? getModel(FEATURE_ROUTES[mode] ?? FEATURE_ROUTES.fast);
  
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    messages: modelMessages,
    system: options.systemPrompt,
    tools: aiTools,
    onFinish: options.onFinish,
  });

  return result.toUIMessageStreamResponse();
}
