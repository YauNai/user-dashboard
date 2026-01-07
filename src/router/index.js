import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilesView from '@/views/ProfilesView.vue'
import SafetyAndPrivacyView from '@/views/SafetyAndPrivacyView.vue'
import CreateView from '@/views/CreateView.vue'
import Community from '@/views/Community.vue'

const mainTitle = '悅讀'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '總覽'
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        title: '新增紀錄'
      }
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView,
      meta: {
        title: '個人資訊'
      }
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      meta: {
        title: '社群'
      }
    },
    {
      path: '/safety-and-privacy',
      name: 'safety-and-privacy',
      component: SafetyAndPrivacyView,
      meta: {
        title: '隱私權與安全性'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - ${mainTitle}`
  next()
})

export default router
