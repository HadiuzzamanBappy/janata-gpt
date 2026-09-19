import { describe, it, expect } from 'vitest';
import {
  cn,
  capitalize,
  truncate,
  generateInitials,
  slugify,
  formatDate,
  formatTime,
  formatRelativeTime,
  formatCurrency,
  formatNumber,
  formatBytes,
  delay,
  generateId,
  groupBy,
  chunk,
  sample,
} from '../src/index';

describe('@repo/utils Utility Functions', () => {
  describe('cn (Tailwind Class Merger)', () => {
    it('should merge class names conditionally', () => {
      const isActive = true;
      const isHidden = false;
      expect(cn('bg-red-500', isActive && 'text-white', isHidden && 'hidden')).toBe('bg-red-500 text-white');
    });

    it('should resolve conflicting Tailwind CSS classes', () => {
      expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });

  describe('String Utilities', () => {
    it('should capitalize strings properly', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('')).toBe('');
    });

    it('should truncate strings to specified max length with ellipsis', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
      expect(truncate('', 5)).toBe('');
    });

    it('should generate initials from user names', () => {
      expect(generateInitials('Hadi Bappy')).toBe('HB');
      expect(generateInitials('Single')).toBe('S');
      expect(generateInitials('John Mid Doe')).toBe('JD');
      expect(generateInitials('')).toBe('');
    });

    it('should slugify strings for URL routes', () => {
      expect(slugify('My Project Alpha #1!')).toBe('my-project-alpha-1');
      expect(slugify('  Spaces and---Dashes  ')).toBe('spaces-and-dashes');
      expect(slugify('')).toBe('');
    });
  });

  describe('Date Utilities', () => {
    it('should format dates consistently', () => {
      const testDate = new Date('2026-01-15T12:00:00Z');
      const formatted = formatDate(testDate);
      expect(formatted).toContain('2026');
      expect(formatted).toContain('Jan');
    });

    it('should format time string', () => {
      const testDate = new Date('2026-01-15T14:30:00Z');
      const formatted = formatTime(testDate);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });

    it('should format relative time dynamically', () => {
      const now = new Date();
      const tenSecsAgo = new Date(now.getTime() - 10 * 1000);
      const relativeStr = formatRelativeTime(tenSecsAgo);
      expect(typeof relativeStr).toBe('string');
    });
  });

  describe('Number Utilities', () => {
    it('should format currency values', () => {
      expect(formatCurrency(29)).toContain('29.00');
      expect(formatCurrency(0)).toContain('0.00');
      expect(formatCurrency(NaN)).toBe('$0.00');
    });

    it('should format compact numbers', () => {
      expect(formatNumber(15400)).toBe('15.4K');
      expect(formatNumber(1200000)).toBe('1.2M');
      expect(formatNumber(500)).toBe('500');
    });

    it('should format byte sizes', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1572864)).toBe('1.5 MB');
    });
  });

  describe('Async Utilities', () => {
    it('should pause execution with delay', async () => {
      const start = Date.now();
      await delay(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(45);
    });

    it('should generate unique entity IDs', () => {
      const id1 = generateId('chat');
      const id2 = generateId('chat');
      expect(id1).toContain('chat_');
      expect(id1).not.toBe(id2);
    });
  });

  describe('Array Utilities', () => {
    it('should group items by key', () => {
      const items = [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
        { category: 'veggie', name: 'carrot' },
      ];
      const grouped = groupBy(items, (item) => item.category);
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.veggie).toHaveLength(1);
    });

    it('should chunk array into sub-arrays', () => {
      const list = [1, 2, 3, 4, 5];
      const chunked = chunk(list, 2);
      expect(chunked).toHaveLength(3);
      expect(chunked[0]).toEqual([1, 2]);
      expect(chunked[2]).toEqual([5]);
    });

    it('should return random sample items from array', () => {
      const list = ['A', 'B', 'C', 'D'];
      const sampled = sample(list, 2);
      expect(sampled).toHaveLength(2);
      expect(list).toContain(sampled[0]);
    });
  });
});
