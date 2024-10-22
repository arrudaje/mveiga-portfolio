import { createRouter, createWebHashHistory } from "vue-router";
import Burger from "@/views/Burger.vue";
import Pixel from "@/views/pixel/Pixel.vue";
import MapSetup from "@/views/MapSetup.vue";
import Home from "@/views/pixel/Home.vue";
import Studies from "@/views/pixel/Studies.vue";
import About from "@/views/pixel/About.vue";
import MapView from "@/views/pixel/MapView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "pixel",
      component: Pixel,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
        {
          path: "/about",
          name: "about",
          component: About,
        },
        {
          path: "/studies",
          name: "studies",
          component: Studies,
        },
        {
          path: "/map",
          name: "map",
          meta: {
            transition: 'scroll',
          },
          component: MapView,
        },
      ],
    },
    {
      path: "/setup",
      name: "setup",
      component: MapSetup,
    },
    // {
    //   path: `/burger`,
    //   name: 'burger',
    //   component: Burger,
    //   children: [
    //     {
    //       path: '/about',
    //       name: 'about',
    //       component: Burger
    //     },
    //     {
    //       path: '/studies',
    //       name: 'studies',
    //       component: Burger
    //     },
    //     {
    //       path: '/contact',
    //       name: 'contact',
    //       component: Burger
    //     }
    //   ]
    // },
  ],
});

export default router;
