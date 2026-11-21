<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
})

const W = 340
const H = 180
const PAD_L = 38
const PAD_R = 12
const PAD_T = 18
const PAD_B = 28

const chart = computed(() => {
  const d = props.data
  const max = Math.max(...d.map((x) => Math.max(x.income, x.expense))) * 1.08
  const x = (i) => PAD_L + ((W - PAD_L - PAD_R) * i) / (d.length - 1)
  const y = (v) => PAD_T + (H - PAD_T - PAD_B) * (1 - v / max)

  const gridLines = []
  for (let g = 0; g <= 4; g++) {
    const vv = (max * g) / 4
    gridLines.push({ y: y(vv), label: `${Math.round(vv / 1000)}k` })
  }

  const incomePath = d
    .map((p, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(p.income)}`)
    .join(' ')
  const expensePath = d
    .map((p, i) => `${i ? 'L' : 'M'} ${x(i)} ${y(p.expense)}`)
    .join(' ')

  const dots = d.flatMap((p, i) => [
    { cx: x(i), cy: y(p.income), fill: '#34D399' },
    { cx: x(i), cy: y(p.expense), fill: '#FB7185' },
  ])

  const xLabels = d.map((p, i) => ({ x: x(i), label: p.m }))

  return { gridLines, incomePath, expensePath, dots, xLabels }
})
</script>

<template>
  <div class="line-wrap">
    <svg viewBox="0 0 340 180" preserveAspectRatio="xMidYMid meet">
      <template v-for="(g, i) in chart.gridLines" :key="'g' + i">
        <line :x1="PAD_L" :y1="g.y" :x2="W - PAD_R" :y2="g.y" stroke="#28334D" stroke-width="1" />
        <text :x="PAD_L - 8" :y="g.y + 3" fill="#64748B" font-size="9" text-anchor="end">{{ g.label }}</text>
      </template>

      <path
        :d="chart.incomePath"
        fill="none"
        stroke="#34D399"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :d="chart.expensePath"
        fill="none"
        stroke="#FB7185"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <circle
        v-for="(d, i) in chart.dots"
        :key="'d' + i"
        :cx="d.cx"
        :cy="d.cy"
        r="3.5"
        :fill="d.fill"
        stroke="#0B1120"
        stroke-width="1.5"
      />

      <text
        v-for="(l, i) in chart.xLabels"
        :key="'x' + i"
        :x="l.x"
        :y="H - 8"
        fill="#64748B"
        font-size="9"
        text-anchor="middle"
      >
        {{ l.label }}
      </text>
    </svg>
  </div>
</template>
