<script setup>
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { useLedgerStore } from '@/stores/ledger'

const auth = useAuthStore()
const ledger = useLedgerStore()

const avatarChar = computed(() => (auth.user?.nickname || '李')[0])
</script>

<template>
  <header class="appbar">
    <div>
      <div class="brand grad-text">财务管家</div>
      <div class="month">{{ ledger.month }}</div>
    </div>
    <div class="avatar">{{ avatarChar }}</div>
  </header>
</template>
