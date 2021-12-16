import Keycloak from 'keycloak-js';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const initOptions = {
  url: 'http://127.0.0.1:8080/auth/',
  realm: 'Keycloak_101',
  clientId: 'Keycloak101',
};

const keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: 'login-required' }).success((auth: boolean) => {
  if (!auth) {
    window.location.reload();
  } else {
    createApp(App).use(router).mount('#app');
  }

  setInterval(() => {
    keycloak.updateToken(70).success((refreshed) => {
      if (refreshed) {
        // Token was refreshed, we're good to go
      } else {
        // Token was not refreshed, but we still have valid token for some time
      }
    });
  }, 6000); // every 6 seconds...
});
