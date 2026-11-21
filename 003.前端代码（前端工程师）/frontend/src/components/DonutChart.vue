<script setup>
import { computed } from 'vue'

import { formatMoney } from '@/utils/format'

const props = defineProps({
  items: { type: Array, required: true },
  size: { type: Number, default: 200 },
  label: { type: String, default: '总支出' },
})

const total = computed(() => props.items.reduce((s, d) => s + d.amount, 0))
const radius = computed(() => props.size / 2 - 14)
const circumference = computed(() => 2 * Math.PI * radius.value)

const segments = computed(() => {
  let acc = 0
  return props.items.map((d) => {
    const frac = d.amount / total.value
    const dash = Math.max(frac * circumference.value - 3, 0.5)
    const seg = {
      color: d.color,
      dashArray: `${dash.toFixed(2)} ${(circumference.value - dash).toFixed(2)}`,
      dashOffset: (-acc).toFixed(2),
    }
    acc += frac * circumference.value
    return seg
  })
})
</script>

<template>
  <div class="donut-wrap" :style="{ width: size + 'px' }">
    <svg :width="size" :height="size">
      <circle
        v-for="(seg, i) in segments"
        :key="i"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="seg.color"
        stroke-width="22"
        :stroke-dasharray="seg.dashArray"
        :stroke-dashoffset="seg.dashOffset"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
      />
    </svg>
    <div class="donut-center">
      <span class="l">{{ label }}</span>
      <span class="v">{{ formatMoney(total) }}</span>
    </div>
  </div>
</template>
