import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";
import router from "./router/index";
import i18n from "./i18n";

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
