import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";
import router from "./router/index";
import store from "./store";
import i18n from "./i18n";

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
