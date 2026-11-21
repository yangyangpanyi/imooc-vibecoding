<script setup>
import { ref } from 'vue'

import { useLedgerStore } from '@/stores/ledger'

import TransactionItem from '@/components/TransactionItem.vue'

const ledger = useLedgerStore()
const ranges = ['本月', '本周', '今天', '自定义']
const activeRange = ref('本月')
</script>

<template>
  <section class="page">
    <div class="page-head"><h2>账单</h2><span class="chip">🔍 筛选</span></div>

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

    <div v-for="g in ledger.bills" :key="g.day" class="day-group">
      <div class="day-label"><span>{{ g.day }}</span><b>{{ g.sum }}</b></div>
      <TransactionItem v-for="tx in g.items" :key="tx.name + tx.amt" :tx="tx" />
    </div>
  </section>
</template>
