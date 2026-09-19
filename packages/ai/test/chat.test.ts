import { describe, it, expect } from 'vitest';
import { streamChatResponse, streamChatByMode } from '../src/index';

describe('@repo/ai Chat Response Streamer', () => {
  it('should stream chat response and return UIMessageStream response', async () => {
    const response = await streamChatResponse([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello, respond in one word.' }] }
    ]);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBeDefined();
  }, 15000);

  it('should stream chat response by intent mode (fast)', async () => {
    const response = await streamChatByMode([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hi' }] }
    ], 'fast');

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  }, 15000);

  it('should stream chat response by intent mode (fallback via OpenRouter)', async () => {
    const response = await streamChatByMode([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hi' }] }
    ], 'fallback');

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  }, 15000);
});
