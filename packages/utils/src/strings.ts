/**
 * Modular String Utilities
 */

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number): string {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function generateInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() || '';
  return `${parts[0]?.charAt(0)}${parts[parts.length - 1]?.charAt(0)}`.toUpperCase();
}

export function slugify(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
