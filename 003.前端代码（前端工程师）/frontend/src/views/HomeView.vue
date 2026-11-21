<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLedgerStore } from '@/stores/ledger'
import { formatMoney } from '@/utils/format'

import DonutChart from '@/components/DonutChart.vue'
import TransactionItem from '@/components/TransactionItem.vue'

const router = useRouter()
const ledger = useLedgerStore()

const recentItems = computed(() => ledger.bills.flatMap((g) => g.items).slice(0, 3))
const budgetPercent = computed(() =>
  Math.min((ledger.budget.used / ledger.budget.total) * 100, 100),
)
const budgetOver = computed(() => ledger.budget.used > ledger.budget.total)
const budgetOverAmount = computed(() => ledger.budget.used - ledger.budget.total)
</script>

<template>
  <section class="page">
    <div class="hero">
      <div class="label">本月支出</div>
      <div class="big">{{ formatMoney(ledger.summary.expense) }}</div>
      <div class="row">
        <span>收入 <b>{{ formatMoney(ledger.summary.income) }}</b></span>
        <span>结余 <b>{{ formatMoney(ledger.summary.balance) }}</b></span>
      </div>
      <div class="net"><span>净资产</span><b>{{ formatMoney(ledger.summary.net) }}</b></div>
    </div>

    <div class="card">
      <div class="budget-top">
        <span class="name">🍜 {{ ledger.budget.name }}预算</span>
        <span class="amt">
          已用 <b>{{ formatMoney(ledger.budget.used) }}</b> / {{ formatMoney(ledger.budget.total) }}
        </span>
      </div>
      <div class="bar" :class="{ over: budgetOver }"><i :style="{ width: budgetPercent + '%' }"></i></div>
      <div v-if="budgetOver" class="budget-note">⚠ 已超支 {{ formatMoney(budgetOverAmount) }}</div>
    </div>

    <div class="card" style="cursor: pointer" @click="router.push('/stats')">
      <div class="card-title"><span>📊 本月分类占比</span><span class="link">查看统计 →</span></div>
      <DonutChart :items="ledger.categories" :size="150" />
    </div>

    <div class="card">
      <div class="card-title"><span>最近流水</span><span class="link" @click="router.push('/bills')">全部 →</span></div>
      <TransactionItem v-for="tx in recentItems" :key="tx.name + tx.amt" :tx="tx" />
    </div>
  </section>
</template>
