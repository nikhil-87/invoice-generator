// Numeric input sanitizers and currency formatting helpers

export function sanitizeIntegerInput(value) {
  if (value === null || value === undefined) return '';
  // Keep digits only
  let s = String(value).replace(/\D/g, '');
  // Trim leading zeros but keep a single zero when appropriate
  s = s.replace(/^0+(?=\d)/, '');
  return s;
}

export function sanitizeDecimalInput(value) {
  if (value === null || value === undefined) return '';
  let s = String(value).replace(/[^0-9.]/g, '');
  if (s === '') return '';

  // Split on the first dot; collapse any additional dots into decimals
  const parts = s.split('.');
  const intRaw = parts.shift() || '';
  const decRaw = parts.join('');

  // Integer: strip leading zeros but keep a single 0 if there will be a decimal part
  let intPart = intRaw.replace(/^0+(?=\d)/, '');
  let decPart = decRaw.replace(/[^0-9]/g, '').slice(0, 2); // limit to 2 decimals

  const hadDot = s.includes('.');
  if (hadDot) {
    // Preserve trailing dot while typing (e.g., "123.")
    return `${intPart || '0'}.${decPart}`;
  }
  return intPart;
}

export function formatCurrency(value, currency = 'INR', locale = 'en-IN') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value) || 0);
  } catch (e) {
    // Fallback
    return `₹ ${(Number(value) || 0).toFixed(2)}`;
    }
}
