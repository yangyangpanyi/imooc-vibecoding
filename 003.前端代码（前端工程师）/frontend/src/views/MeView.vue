<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useLedgerStore } from '@/stores/ledger'
import { useUiStore } from '@/stores/ui'
import { formatMoney } from '@/utils/format'

const router = useRouter()
const auth = useAuthStore()
const ledger = useLedgerStore()
const ui = useUiStore()

const nickname = computed(() => auth.user?.nickname || '小李')
const avatarChar = computed(() => nickname.value[0])

function logout() {
  auth.logout()
  ui.toast('已退出登录')
  router.push('/login')
}
</script>

<template>
  <section class="page">
    <div class="me-head">
      <div class="avatar">{{ avatarChar }}</div>
      <div>
        <div class="nm">{{ nickname }}</div>
        <div class="sub">已连续记账 86 天 · 净资产 {{ formatMoney(ledger.summary.net) }}</div>
      </div>
    </div>

    <div class="menu">
      <div class="mi"><div class="ic">💳</div><div class="t">账户管理</div><div class="arr">›</div></div>
      <div class="mi"><div class="ic">🏷️</div><div class="t">分类管理</div><div class="arr">›</div></div>
      <div class="mi"><div class="ic">🎯</div><div class="t">预算管理</div><div class="arr">›</div></div>
      <div class="mi" @click="router.push('/stats')"><div class="ic">📊</div><div class="t">统计报表</div><div class="arr">›</div></div>
      <div class="mi"><div class="ic">📤</div><div class="t">数据导出</div><div class="arr">›</div></div>
    </div>

    <div class="menu">
      <div class="mi"><div class="ic">⚙️</div><div class="t">设置</div><div class="arr">›</div></div>
      <div class="mi"><div class="ic">ℹ️</div><div class="t">关于财务管家</div><div class="arr">›</div></div>
    </div>

    <div class="menu">
      <div class="mi" @click="logout">
        <div class="ic">🚪</div><div class="t" style="color: var(--expense)">退出登录</div><div class="arr">›</div>
      </div>
    </div>
  </section>
</template>
