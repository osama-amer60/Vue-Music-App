import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firbase";
import Icon from "./directives/globalIcon";
import { registerSW } from "virtual:pwa-register";
import i18n from "./includes/i18n";
import GlobalComponents  from "./includes/_globals";
import progressBar from "./includes/progress-bar";


import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css"

//registerSW is load and register service worker 
registerSW({immediate:true})
progressBar(router)
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(veeValidatePlugin);
    app.use(GlobalComponents)
    app.directive('globalIcon',Icon)
    app.use(i18n)




    app.mount("#app");
  }
});
