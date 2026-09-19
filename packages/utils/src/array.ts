/**
 * Array & Collection Utility Functions
 */

export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0 || !array.length) return [];
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function sample<T>(array: T[], count = 1): T[] {
  if (!array.length || count <= 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
