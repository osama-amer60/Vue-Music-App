import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firbase";
import Icon from "./directives/globalIcon";

import "./assets/base.css";
import "./assets/main.css";
import i18n from "./includes/i18n";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(veeValidatePlugin);
    app.directive('globalIcon',Icon)
    app.use(i18n)




    app.mount("#app");
  }
});
