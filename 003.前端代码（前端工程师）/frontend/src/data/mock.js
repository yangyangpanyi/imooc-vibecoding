// 记账页分类选项（弹层九宫格）
export const CATS = {
  expense: [
    ['🍜', '餐饮'],
    ['🚌', '交通'],
    ['🛍️', '购物'],
    ['🏠', '居住'],
    ['🎬', '娱乐'],
    ['💊', '医疗'],
    ['🎓', '教育'],
    ['📦', '其他'],
  ],
  income: [
    ['💼', '工资'],
    ['🎁', '奖金'],
    ['📈', '理财'],
    ['🧧', '兼职'],
    ['📦', '其他'],
  ],
  transfer: [],
}

// 账户选项
export const ACCOUNTS = ['微信', '支付宝', '银行卡', '现金']

// 首页汇总
export const MONTH = '2026年11月'
export const SUMMARY = { expense: 7020, income: 12500, balance: 5480, net: 38650 }

// 预算
export const BUDGET = { name: '餐饮', used: 1860, total: 1500 }

// 分类占比（环形图数据）
export const CATEGORY_STATS = [
  { name: '居住', amount: 2000, color: '#3987e5', icon: '🏠' },
  { name: '餐饮', amount: 1860, color: '#d95926', icon: '🍜' },
  { name: '购物', amount: 1580, color: '#9085e9', icon: '🛍️' },
  { name: '娱乐', amount: 660, color: '#199e70', icon: '🎬' },
  { name: '其他', amount: 500, color: '#e66767', icon: '📦' },
  { name: '交通', amount: 420, color: '#c98500', icon: '🚌' },
]

// 收支趋势（近 6 月）
export const TREND = [
  { m: '6月', income: 12000, expense: 6800 },
  { m: '7月', income: 12000, expense: 7400 },
  { m: '8月', income: 12000, expense: 6500 },
  { m: '9月', income: 12800, expense: 7800 },
  { m: '10月', income: 12500, expense: 8200 },
  { m: '11月', income: 12500, expense: 7020 },
]

// 账单（按天分组）
export const BILLS = [
  {
    day: '11月21日 · 今天',
    sum: '支出 ¥36',
    items: [
      { icon: '🍜', name: '午餐', meta: '微信 · 餐饮', amt: -32, cat: '餐饮' },
      { icon: '🚌', name: '地铁', meta: '现金 · 交通', amt: -4, cat: '交通' },
    ],
  },
  {
    day: '11月20日 · 周五',
    sum: '收入 ¥12,500 · 支出 ¥2,000',
    items: [
      { icon: '💼', name: '工资', meta: '银行卡 · 收入', amt: 12500, cat: '收入' },
      { icon: '🏠', name: '房租', meta: '支付宝 · 居住', amt: -2000, cat: '居住' },
    ],
  },
  {
    day: '11月19日 · 周四',
    sum: '支出 ¥427',
    items: [
      { icon: '🛍️', name: '网购', meta: '支付宝 · 购物', amt: -399, cat: '购物' },
      { icon: '☕', name: '咖啡', meta: '微信 · 餐饮', amt: -28, cat: '餐饮' },
    ],
  },
]
