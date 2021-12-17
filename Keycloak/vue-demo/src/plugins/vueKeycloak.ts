import Keycloak from 'keycloak-js';
import type { KeycloakInstance } from 'keycloak-js';
import type { App } from 'vue';

let installed = false;

export default {
  install: (app: App, options?: any): void => {
    if (installed) return;

    if (options) {
      app.config.globalProperties.$keycloak = Keycloak(options);
      installed = true;
    }
  },
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $keycloak: KeycloakInstance;
  }
}
