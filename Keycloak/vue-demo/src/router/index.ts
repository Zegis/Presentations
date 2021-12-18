import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isAuthenticated: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      isAuthenticated: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export const createHackRouter = (app: App) => {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach((to, from, next) => {
    console.log(`Before route ${app.config.globalProperties.$keycloak.authenticated}`);
    const auth = app.config.globalProperties.$keycloak.authenticated;
    const basePath = window.location.toString();
    if (to.meta.isAuthenticated) {
      app.config.globalProperties.$keycloak.updateToken(70)
        .success((refreshed : boolean) => { console.log(`Was refreshed? ${refreshed}`); next(); }).error(() => console.log('error'));
    } else {
      next();
    }
  });

  return router;
};

export { createHackRouter as default };
