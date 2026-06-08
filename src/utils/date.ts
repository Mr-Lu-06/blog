/**
 * Format a date string into readable Chinese format.
 * e.g. "2026-06-07" → "2026年6月7日"
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format for short display in diary cards.
 * e.g. "2026-06-07" → "6月7日"
 */
export function formatShortDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * Get year from date string
 */
export function getYear(dateStr) {
  return new Date(dateStr).getFullYear();
}

/**
 * Sort by date descending
 */
export function sortByDate(items, key = 'data.date') {
  return [...items].sort((a, b) => {
    const aVal = key.split('.').reduce((o, k) => o[k], a);
    const bVal = key.split('.').reduce((o, k) => o[k], b);
    return new Date(bVal) - new Date(aVal);
  });
}
