<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()

const mode = ref('sms') // 'sms' | 'pwd'
const isRegister = ref(false)

// 登录表单
const loginPhone = ref('')
const loginCode = ref('')
const loginName = ref('')
const loginPwd = ref('')

// 注册表单
const regPhone = ref('')
const regCode = ref('')
const regName = ref('')
const regPwd = ref('')
const regPwd2 = ref('')
const regNick = ref('')
const regAgree = ref(true)

// 验证码倒计时
const codeCountdown = ref(0)
const codeBtnText = computed(() =>
  codeCountdown.value > 0 ? `${codeCountdown.value}s 后重发` : '获取验证码',
)
let codeTimer = null

function sendCode(which) {
  const phone = which === 'login' ? loginPhone.value : regPhone.value
  if (!/^1\d{10}$/.test(phone)) {
    ui.toast('请输入正确的手机号')
    return
  }
  ui.toast('验证码已发送（演示码 123456）')
  codeCountdown.value = 60
  clearInterval(codeTimer)
  codeTimer = setInterval(() => {
    codeCountdown.value -= 1
    if (codeCountdown.value <= 0) clearInterval(codeTimer)
  }, 1000)
}

function doLogin() {
  if (mode.value === 'sms') {
    if (!/^1\d{10}$/.test(loginPhone.value)) return ui.toast('请输入正确的手机号')
    if (!loginCode.value) return ui.toast('请输入验证码')
  } else {
    if (!loginName.value) return ui.toast('请输入登录名')
    if (!loginPwd.value) return ui.toast('请输入密码')
  }
  auth.login({ nickname: '小李' })
  ui.toast('欢迎回来，小李')
  router.push(route.query.redirect || '/')
}

function doRegister() {
  if (!/^1\d{10}$/.test(regPhone.value)) return ui.toast('请输入正确的手机号')
  if (!regCode.value) return ui.toast('请输入验证码')
  if (!regName.value) return ui.toast('请设置登录名')
  if (regPwd.value.length < 6) return ui.toast('密码至少 6 位')
  if (regPwd.value !== regPwd2.value) return ui.toast('两次密码不一致')
  if (!regAgree.value) return ui.toast('请先阅读并同意协议')
  auth.register({ nickname: regNick.value || '小李' })
  ui.toast('注册成功，欢迎使用')
  router.push('/')
}

onUnmounted(() => clearInterval(codeTimer))
</script>

<template>
  <div class="auth">
    <!-- 登录 -->
    <div v-if="!isRegister" class="auth-page">
      <div class="auth-logo">
        <div class="logo-badge">¥</div>
        <div class="logo-name grad-text">财务管家</div>
        <div class="logo-slogan">打开就能记，记了就有用</div>
      </div>

      <div class="auth-tabs">
        <button :class="{ on: mode === 'sms' }" @click="mode = 'sms'">验证码登录</button>
        <button :class="{ on: mode === 'pwd' }" @click="mode = 'pwd'">密码登录</button>
      </div>

      <template v-if="mode === 'sms'">
        <div class="inp"><input v-model="loginPhone" type="tel" maxlength="11" placeholder="手机号" /></div>
        <div class="inp">
          <input v-model="loginCode" type="text" maxlength="6" placeholder="验证码" />
          <button class="code-btn" :disabled="codeCountdown > 0" @click="sendCode('login')">{{ codeBtnText }}</button>
        </div>
      </template>
      <template v-else>
        <div class="inp"><input v-model="loginName" type="text" placeholder="登录名" /></div>
        <div class="inp"><input v-model="loginPwd" type="password" placeholder="密码" /></div>
      </template>

      <button class="auth-btn" @click="doLogin">登录</button>
      <div class="auth-switch">还没有账号？<span @click="isRegister = true">立即注册</span></div>
    </div>

    <!-- 注册 -->
    <div v-else class="auth-page">
      <div class="back" @click="isRegister = false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
        返回登录
      </div>
      <div class="auth-title">创建账号</div>
      <div class="inp"><input v-model="regPhone" type="tel" maxlength="11" placeholder="手机号" /></div>
      <div class="inp">
        <input v-model="regCode" type="text" maxlength="6" placeholder="验证码" />
        <button class="code-btn" :disabled="codeCountdown > 0" @click="sendCode('reg')">{{ codeBtnText }}</button>
      </div>
      <div class="inp"><input v-model="regName" type="text" placeholder="登录名" /></div>
      <div class="inp"><input v-model="regPwd" type="password" placeholder="设置密码（至少 6 位）" /></div>
      <div class="inp"><input v-model="regPwd2" type="password" placeholder="确认密码" /></div>
      <div class="inp"><input v-model="regNick" type="text" placeholder="昵称（可选）" /></div>
      <label class="agree"><input v-model="regAgree" type="checkbox" /> 我已阅读并同意《用户协议》与《隐私政策》</label>
      <button class="auth-btn" @click="doRegister">注册</button>
      <div class="auth-switch">已有账号？<span @click="isRegister = false">去登录</span></div>
    </div>
  </div>
</template>
