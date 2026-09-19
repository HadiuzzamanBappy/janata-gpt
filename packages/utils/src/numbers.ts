/**
 * Number & Currency Utility Functions
 */

export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  if (isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(
  num: number,
  options?: Intl.NumberFormatOptions
): string {
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
    ...options,
  }).format(num);
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  if (isNaN(bytes) || bytes < 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const index = Math.min(i, sizes.length - 1);
  const value = bytes / Math.pow(k, index);

  return `${parseFloat(value.toFixed(dm))} ${sizes[index]}`;
}
