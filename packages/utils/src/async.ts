/**
 * Async & Timing Utility Functions
 */

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(prefix = ''): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  const timestampPart = Date.now().toString(36);
  return prefix ? `${prefix}_${timestampPart}${randomPart}` : `${timestampPart}${randomPart}`;
}
