<script setup>
import { formatSigned } from '@/utils/format'

defineProps({
  tx: { type: Object, required: true },
})
</script>

<template>
  <div class="tx">
    <div class="ic">{{ tx.icon }}</div>
    <div class="info">
      <div class="n">{{ tx.name }}</div>
      <div class="m">{{ tx.meta }}</div>
    </div>
    <div class="amt" :class="tx.amt < 0 ? 'out' : 'in'">{{ formatSigned(tx.amt) }}</div>
  </div>
</template>
