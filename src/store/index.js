import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import users from "./modules/users-module";
import reset from "./modules/reset";
import dashboard from "./modules/resources/dashboard-module";
import store from "./modules/resources/store-module";
import inStoreTraffic from "./modules/resources/in-store-traffic-module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    reset,
    dashboard,
    store,
    inStoreTraffic,
  }
});
