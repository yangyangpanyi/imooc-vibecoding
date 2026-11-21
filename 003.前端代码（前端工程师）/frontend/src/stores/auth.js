import { ref } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'ledger_user'

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(readStorage())
  const isLoggedIn = ref(!!user.value)

  function login(payload = {}) {
    const nickname = payload.nickname || user.value?.nickname || '小李'
    user.value = { nickname }
    isLoggedIn.value = true
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }

  function register(payload = {}) {
    login(payload)
  }

  function logout() {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem(STORAGE_KEY)
  }

  return { user, isLoggedIn, login, register, logout }
})
