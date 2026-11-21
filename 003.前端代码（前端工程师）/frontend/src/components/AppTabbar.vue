<script setup>
import { useRoute, useRouter } from 'vue-router'

import { useUiStore } from '@/stores/ui'

const route = useRoute()
const router = useRouter()
const ui = useUiStore()

const tabs = [
  { name: 'home', label: '首页', path: '/' },
  { name: 'bills', label: '账单', path: '/bills' },
]
const me = { name: 'me', label: '我的', path: '/me' }

function isActive(name) {
  return route.name === name
}

function go(path) {
  if (route.path !== path) router.push(path)
}
</script>

<template>
  <nav class="tabbar">
    <div
      v-for="t in tabs"
      :key="t.name"
      class="tab"
      :class="{ active: isActive(t.name) }"
      @click="go(t.path)"
    >
      <svg viewBox="0 0 24 24">
        <path
          v-if="t.name === 'home'"
          d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"
        />
        <path v-else d="M4 6h16M4 12h16M4 18h10" />
      </svg>
      <span>{{ t.label }}</span>
    </div>

    <div class="tab add" @click="ui.openSheet()">
      <div class="fab">
        <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
      </div>
      <span>记账</span>
    </div>

    <div class="tab" :class="{ active: isActive(me.name) }" @click="go(me.path)">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
      <span>{{ me.label }}</span>
    </div>
  </nav>
</template>
