<script setup>
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
</script>

<template>
  <div class="toast" :class="{ show: ui.toastVisible }">{{ ui.toastMsg }}</div>
</template>
