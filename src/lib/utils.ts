import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatURL(url: string) {
  if (!url || url === '#') return '#';
  let formatted = url.trim();
  
  // Auto-correct: If URL contains '@' (like t.me@user), replace with '/'
  if (formatted.includes('@')) {
    formatted = formatted.replace('@', '/');
  }

  if (/^(http|https):\/\//.test(formatted)) return formatted;
  if (formatted.startsWith('//')) return `https:${formatted}`;
  return `https://${formatted}`;
}

export function sanitizeInput(input: string) {
  if (!input) return '';
  // Basic XSS protection: strip HTML tags and scripts
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[&<>"']/g, (m) => { // Escape special characters
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return map[m];
    });
}

export function isValidSecureURL(url: string) {
  if (!url || url === '#') return false;
  // Relaxed validation: Must start with https:// and look like a URL
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return url.startsWith('https://') && url.includes('.');
  }
}
