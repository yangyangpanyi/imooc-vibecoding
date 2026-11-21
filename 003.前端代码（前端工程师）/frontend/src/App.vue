<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import AppTabbar from '@/components/AppTabbar.vue'
import AddSheet from '@/components/AddSheet.vue'
import ToastMessage from '@/components/ToastMessage.vue'

const route = useRoute()

// 底部导航显示在 home/bills/me，隐藏于 login/stats
const showTabbar = computed(() => ['home', 'bills', 'me'].includes(route.name))
const showHeader = computed(() => route.name !== 'login')
</script>

<template>
  <div class="app">
    <!-- 渐变 defs（底部导航激活态引用 url(#navGrad)） -->
    <svg width="0" height="0" style="position: absolute" aria-hidden="true">
      <defs>
        <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#6366f1" />
          <stop offset="0.5" stop-color="#8b5cf6" />
          <stop offset="1" stop-color="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>

    <AppHeader v-if="showHeader" />

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <AppTabbar v-if="showTabbar" />

    <AddSheet />
    <ToastMessage />
  </div>
</template>
