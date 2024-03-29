import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";
import router from "./router/index";
import store from "./store";
import i18n from "./i18n";

import SideBar from "@/components/SidebarPlugin";
import Element from "element-ui";
import locale from 'element-ui/lib/locale/lang/en';
import "element-ui/lib/theme-chalk/index.css";
import VueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import swal from "vue-sweetalert2";
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
import VueMoment from 'vue-moment';

import VueFab from 'vue-float-action-button';
import VModal from 'vue-js-modal';

import "@/assets/scss/dashboard.scss";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(SideBar);
Vue.use(Element, { locale });
Vue.use(VueLoadingOverlay, {
  canCancel: false,
  color: '#1d8cf8',
  loader: 'spinner',
});
Vue.use(swal, {
  confirmButtonClass: "btn btn-info btn-fill",
  cancelButtonClass: "btn btn-neutral btn-fill",
  buttonsStyling: false,
});
Vue.use(VueMoment);
Vue.use(VueFab);
Vue.use(VModal);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
