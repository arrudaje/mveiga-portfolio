import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/${import.meta.env.GITHUB_REPOSITORY_NAME ?? ''}`,
      name: 'home',
      component: Home,
      children: [
        {
          path: '/about',
          name: 'about',
          component: Home
        },
        {
          path: '/studies',
          name: 'studies',
          component: Home
        },
        {
          path: '/contact',
          name: 'contact',
          component: Home
        }
      ]
    },
  ]
})

export default router
