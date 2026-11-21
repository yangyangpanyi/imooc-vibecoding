<script setup>
import { ref, computed } from 'vue'

import { useUiStore } from '@/stores/ui'
import { useLedgerStore } from '@/stores/ledger'
import { CATS, ACCOUNTS } from '@/data/mock'

const ui = useUiStore()
const ledger = useLedgerStore()

const type = ref('expense')
const amount = ref('')
const account = ref('微信')
const note = ref('')
const date = ref('2026-11-21')
const selectedCat = ref('')

const cats = computed(() => CATS[type.value])
const isExpense = computed(() => type.value === 'expense')

function setType(t) {
  type.value = t
  selectedCat.value = ''
}

function pickCat(name) {
  selectedCat.value = name
}

function save() {
  const amt = Number(amount.value)
  if (!amt || amt <= 0) {
    ui.toast('请输入金额')
    return
  }

  const label = type.value === 'expense' ? '支出' : type.value === 'income' ? '收入' : '转账'
  const picked = cats.value.find((c) => c[1] === selectedCat.value)

  ledger.addTransaction({
    type: type.value,
    amount: amt,
    cat: selectedCat.value,
    account: account.value,
    name: selectedCat.value || undefined,
    icon: picked?.[0],
  })

  ui.toast(`已记账 · ${label} ¥${amt}`)
  amount.value = ''
  selectedCat.value = ''
  ui.closeSheet()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.sheetVisible" class="mask" @click="ui.closeSheet()"></div>
    </Transition>

    <div class="sheet" :class="{ open: ui.sheetVisible }">
      <div class="grab"></div>

      <div class="type-switch">
        <button
          :class="{ on: type === 'expense', exp: type === 'expense' }"
          @click="setType('expense')"
        >
          支出
        </button>
        <button :class="{ on: type === 'income' }" @click="setType('income')">收入</button>
        <button :class="{ on: type === 'transfer' }" @click="setType('transfer')">转账</button>
      </div>

      <div class="amount-row">
        <span class="cur">¥</span>
        <input v-model="amount" type="number" inputmode="decimal" placeholder="0.00" />
      </div>

      <div v-if="type === 'transfer'" class="grid">
        <div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 13px; padding: 16px; text-align: center">
          转账无需分类，请在下方选择转出/转入账户
        </div>
      </div>
      <div v-else class="grid">
        <div
          v-for="c in cats"
          :key="c[1]"
          class="cat"
          :class="{ on: selectedCat === c[1] }"
          @click="pickCat(c[1])"
        >
          <div class="ic">{{ c[0] }}</div>
          <span>{{ c[1] }}</span>
        </div>
      </div>

      <div class="field">
        <span class="k">账户</span>
        <div class="v">
          <select v-model="account">
            <option v-for="a in ACCOUNTS" :key="a" :value="a">{{ a }}</option>
          </select>
        </div>
      </div>
      <div class="field">
        <span class="k">备注</span>
        <div class="v"><input v-model="note" placeholder="添加备注（可选）" /></div>
      </div>
      <div class="field">
        <span class="k">日期</span>
        <div class="v"><input v-model="date" type="date" /></div>
      </div>

      <button class="save" :class="{ exp: isExpense }" @click="save">保存</button>
    </div>
  </Teleport>
</template>
