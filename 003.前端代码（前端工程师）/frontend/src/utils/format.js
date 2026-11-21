/**
 * 金额格式化：¥1,234
 * @param {number} n 金额（可为负）
 * @returns {string}
 */
export function formatMoney(n) {
  return '¥' + Math.abs(n).toLocaleString('zh-CN')
}

/**
 * 带符号金额：收入 +¥1,234 / 支出 -¥1,234
 * @param {number} n 金额（正收入，负支出）
 * @returns {string}
 */
export function formatSigned(n) {
  return (n < 0 ? '-' : '+') + formatMoney(n)
}
