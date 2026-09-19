import { describe, it, expect } from 'vitest';
import { cn, capitalize, truncate, generateInitials, formatDate, formatTime, formatRelativeTime } from '../src/index';

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
});
