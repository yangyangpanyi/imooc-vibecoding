import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { MONTH, SUMMARY, BUDGET, CATEGORY_STATS, TREND, BILLS } from '@/data/mock'

export const useLedgerStore = defineStore('ledger', () => {
  const month = ref(MONTH)
  const summary = ref({ ...SUMMARY })
  const budget = ref({ ...BUDGET })
  const categories = ref([...CATEGORY_STATS])
  const trend = ref([...TREND])
  const bills = ref(JSON.parse(JSON.stringify(BILLS)))

  const totalExpense = computed(() => categories.value.reduce((s, d) => s + d.amount, 0))

  function addTransaction(tx) {
    // 原型阶段：仅插入账单列表并更新汇总，不真正持久化
    const amount = Number(tx.amount) || 0
    const signed = tx.type === 'income' ? amount : -amount
    const icon = tx.icon || '📦'
    const item = {
      icon,
      name: tx.name || '自定义',
      meta: `${tx.account} · ${tx.type === 'income' ? '收入' : tx.cat || '未分类'}`,
      amt: signed,
      cat: tx.type === 'income' ? '收入' : tx.cat || '未分类',
    }

    const todayGroup = bills.value[0]
    if (todayGroup) {
      todayGroup.items.unshift(item)
    } else {
      bills.value.unshift({ day: '今天', sum: '', items: [item] })
    }

    if (tx.type === 'expense') {
      summary.value.expense += amount
      summary.value.balance = summary.value.income - summary.value.expense
    } else if (tx.type === 'income') {
      summary.value.income += amount
      summary.value.balance = summary.value.income - summary.value.expense
    }
  }

  return {
    month,
    summary,
    budget,
    categories,
    trend,
    bills,
    totalExpense,
    addTransaction,
  }
})
