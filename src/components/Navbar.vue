<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-300">
        <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost">
          <!-- Sidebar toggle icon -->
          <i class="bi bi-layout-text-sidebar text-lg"></i>
        </label>
        <div class="px-4">{{ NavbarTitle }}</div>
      </nav>

      <!-- Page content here -->
      <slot></slot>

    </div>

    <div class="drawer-side is-drawer-close:overflow-visible">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <!-- Sidebar content here -->
        <ul class="menu w-full grow">

          <!-- LOGO -->
          <div class="is-drawer-close:tooltip is-drawer-close:tooltip-right text-accent-content text-2xl text-center py-4">
            <i class="bi bi-book is-drawer-open:hidden my-1.5 inline-block"></i>
            <span class="is-drawer-close:hidden">悅讀</span>
          </div>

          <!-- 總覽 -->
          <li>
            <RouterLink to="/" @click="setNavTitle('總覽')" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="總覽">
              <i class="bi bi-house my-1.5 inline-block "></i>
              <span class="is-drawer-close:hidden">總覽</span>
            </RouterLink>
          </li>
          
          <!-- 新增紀錄 -->
          <li>
            <RouterLink to="/create" @click="setNavTitle('新增紀錄')" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="新增紀錄">
              <i class="bi bi-file-earmark-plus my-1.5 inline-block "></i>
              <span class="is-drawer-close:hidden">新增紀錄</span>
            </RouterLink>
          </li>
          
          <!-- 個人資訊 -->
          <li>
            <RouterLink to="/profiles" @click="setNavTitle('個人資訊')" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="個人資訊">
              <i class="bi bi-person-rolodex my-1.5 inline-block "></i>
              <span class="is-drawer-close:hidden">個人資訊</span>
            </RouterLink>
          </li>
          
          <!-- 社群 -->
          <li>
            <button @click="setNavTitle('社群')" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="社群">
              <i class="bi bi-people my-1.5 inline-block"></i>
              <span class="is-drawer-close:hidden">社群</span>
            </button>
          </li>

          <!-- 隱私權 -->
          <li>
            <RouterLink to="/safety-and-privacy" @click="setNavTitle('隱私權與安全性')" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="隱私權與安全性">
              <i class="bi bi-shield-exclamation my-1.5 inline-block "></i>
              <span class="is-drawer-close:hidden">隱私權與安全性</span>
            </RouterLink>
          </li>

          <div class="divider mt-auto"></div>

          <!-- 檢視原始碼 -->
          <li>
            <a href="https://github.com/YauNai/user-dashboard" target="_blank" class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="檢視原始碼">
              <i class="bi bi-github my-1.5 inline-block"></i>
              <span class="is-drawer-close:hidden">檢視原始碼</span>
              <i class="bi bi-box-arrow-up-right is-drawer-close:hidden"></i>
            </a>
          </li>

          <!-- 登出 -->
          <li>
            <button class="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="登出">
              <i class="bi bi-box-arrow-left my-1.5 inline-block"></i>
              <span class="is-drawer-close:hidden">登出</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  import avatar from '@/assets/images/avatar.jpg'
  import { ref } from 'vue';

  const NavbarTitle = ref('總覽')
  const setNavTitle = (title) => {
    NavbarTitle.value = title
  }
</script>

<style scoped></style>