import { describe, it, expect } from 'vitest';
import { streamChatResponse } from '../src/index';

describe('@repo/ai Chat Response Streamer', () => {
  it('should stream chat response with default options', async () => {
    const response = await streamChatResponse([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hello, respond in one word.' }] }
    ]);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBeDefined();
  }, 15000);

  it('should stream chat response by intent mode (fast)', async () => {
    const response = await streamChatResponse([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hi' }] }
    ], { mode: 'fast' });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  }, 15000);

  it('should stream chat response by intent mode (fallback via OpenRouter)', async () => {
    const response = await streamChatResponse([
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hi' }] }
    ], { mode: 'fallback' });

    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  }, 15000);
});
