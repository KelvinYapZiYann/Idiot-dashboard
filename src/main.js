import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";
import router from "./router/index";
import store from "./store";
import i18n from "./i18n";

import SideBar from "@/components/SidebarPlugin";
import VueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import "@/assets/scss/dashboard.scss";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(SideBar);
Vue.use(VueLoadingOverlay, {
  canCancel: false,
  color: '#1d8cf8',
  loader: 'spinner',
});

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
