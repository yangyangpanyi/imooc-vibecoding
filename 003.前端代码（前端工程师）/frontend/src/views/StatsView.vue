<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useLedgerStore } from '@/stores/ledger'
import { formatMoney } from '@/utils/format'

import DonutChart from '@/components/DonutChart.vue'
import LineChart from '@/components/LineChart.vue'

const router = useRouter()
const ledger = useLedgerStore()

const ranges = ['本月', '近3月', '今年', '自定义']
const activeRange = ref('本月')

const total = computed(() => ledger.categories.reduce((s, d) => s + d.amount, 0))
</script>

<template>
  <section class="page stats-page">
    <div class="back" @click="router.back()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
      返回
    </div>
    <h2>统计报表</h2>

    <div class="chip-row">
      <div
        v-for="r in ranges"
        :key="r"
        class="chip"
        :class="{ on: activeRange === r }"
        @click="activeRange = r"
      >
        {{ r }}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span>分类占比</span><span style="color: var(--text-muted); font-size: 12px">支出</span></div>
      <DonutChart :items="ledger.categories" :size="200" />
      <div class="legend">
        <div v-for="d in ledger.categories" :key="d.name" class="li">
          <div class="dot" :style="{ background: d.color }"></div>
          <span class="n">{{ d.icon }} {{ d.name }}</span>
          <span class="p">{{ ((d.amount / total) * 100).toFixed(1) }}%</span>
          <span class="a">{{ formatMoney(d.amount) }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span>收支趋势</span>
        <span style="display: flex; gap: 12px; font-size: 12px">
          <span style="color: var(--income)">● 收入</span>
          <span style="color: var(--expense)">● 支出</span>
        </span>
      </div>
      <LineChart :data="ledger.trend" />
    </div>
  </section>
</template>
