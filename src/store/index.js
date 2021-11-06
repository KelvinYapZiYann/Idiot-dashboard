import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import users from "./modules/users-module";
import reset from "./modules/reset";
// import dashboard from "./modules/resources/dashboard-modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    reset,
    // dashboard,
  }
});
