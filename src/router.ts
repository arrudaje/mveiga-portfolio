import { createRouter, createWebHistory } from 'vue-router'
import Burger from '@/views/Burger.vue'
import Pixel from '@/views/Pixel.vue'
import MapSetup from '@/views/MapSetup.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'pixel',
      component: Pixel,
    },
    {
      path: '/setup',
      name: 'setup',
      component: MapSetup
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
