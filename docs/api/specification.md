# API Specification & Data Transfer Objects (DTOs)

## 1. Route Handler Specifications

### POST `/api/chat`
- **Description**: Streams LLM token responses for user chat messages using Vercel AI SDK and Google Gemini.
- **Authentication**: Requires valid Supabase Auth session cookie.
- **Request Body**:
  ```json
  {
    "messages": [
      { "role": "user", "content": "Explain monorepo architecture" }
    ]
  }
  ```
- **Response**: `200 OK` (Content-Type: `text/plain; charset=utf-8` - DataStream format).
- **Error Responses**:
  - `401 Unauthorized`: `{ "error": "Authentication required" }`
  - `400 Bad Request`: `{ "error": "Invalid request payload" }`

---

## 2. API Response Formatting Standard
All standard REST endpoints MUST format responses using JSON DTO wrapper:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```
