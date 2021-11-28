import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth-module";
import users from "./modules/users-module";
import mobileLayout from "./modules/mobile-layout-module";
// import reset from "./modules/reset";
import dashboard from "./modules/resources/dashboard-module";
import store from "./modules/resources/store-module";
import inStoreTraffic from "./modules/resources/in-store-traffic-module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    mobileLayout,
    // reset,
    dashboard,
    store,
    inStoreTraffic,
  }
});
