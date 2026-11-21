import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  // toast
  const toastMsg = ref('')
  const toastVisible = ref(false)
  let toastTimer = null

  function toast(msg) {
    toastMsg.value = msg
    toastVisible.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastVisible.value = false
    }, 1800)
  }

  // 记账弹层
  const sheetVisible = ref(false)
  function openSheet() {
    sheetVisible.value = true
  }
  function closeSheet() {
    sheetVisible.value = false
  }

  return { toastMsg, toastVisible, toast, sheetVisible, openSheet, closeSheet }
})
