<template>
  <form class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

    <label class="label">使用者名稱</label>
    <input v-model="username" type="text" class="input" placeholder="使用者名稱" />

    <label class="label">密碼</label>
    <input v-model="password" type="password" class="input" placeholder="密碼" />

    <button @click="doLogin" class="btn btn-neutral mt-4" :disabled="isLogining">
      <span :class="{ 'loading loading-ring loading-xl': isLogining }">
        {{ isLogining ? '' : '登入' }}
      </span>
    </button>

  </form>
</template>

<script setup>
  import { ref } from 'vue';

  const username = ref('admin')
  const password = ref('123456')

  const isLogining = ref(false)

  const doLogin = () => {
    isLogining.value = true
    setTimeout(() => {
      isLogining.value = false
    }, 1000)
  }
</script>

<style scoped></style>