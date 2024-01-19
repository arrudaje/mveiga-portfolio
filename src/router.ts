import { createRouter, createWebHistory } from 'vue-router'
import Burger from '@/views/Burger.vue'
import Pixel from '@/views/Pixel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pixel',
      name: 'pixel',
      alias: '/',
      component: Pixel,
      children: []
    },
    {
      path: `/burger`,
      name: 'burger',
      component: Burger,
      children: [
        {
          path: '/about',
          name: 'about',
          component: Burger
        },
        {
          path: '/studies',
          name: 'studies',
          component: Burger
        },
        {
          path: '/contact',
          name: 'contact',
          component: Burger
        }
      ]
    },
  ]
})

export default router
