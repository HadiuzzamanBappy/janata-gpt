/**
 * Modular Date Utilities using zero-dependency Intl API
 */

export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(d);
}

export function formatTime(date: Date | string | number): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(d);
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute');
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, 'hour');
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return rtf.format(-diffInDays, 'day');
  
  return formatDate(d); // Fallback to standard date
}
