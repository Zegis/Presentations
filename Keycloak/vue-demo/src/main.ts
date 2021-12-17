import { createApp } from 'vue';
import App from './App.vue';
import { createHackRouter } from './router';
import vueKeyCloak from './plugins/vueKeycloak';

const initOptions = {
  url: 'http://127.0.0.1:8080/auth/',
  realm: 'Keycloak_101',
  clientId: 'Keycloak101',
};

const instance = createApp(App).use(vueKeyCloak, initOptions);
const router = createHackRouter(instance);
instance.use(router);

instance.config.globalProperties.$keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).success(
  (auth: boolean) => {
    if (!auth) {
      window.location.reload();
    } else {
      instance.mount('#app');
    }
  },
);
