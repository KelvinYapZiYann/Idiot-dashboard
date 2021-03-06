import service from '@/store/services/auth-service';

const state = {
  isAuthenticated: localStorage.getItem("vue-authenticate.vueauth_access_token") !== null,
};

const mutations = {
  IS_AUTHENTICATED: (state, payload) => {
    state.isAuthenticated = payload.isAuthenticated;
  }
};

const actions = {
  login({commit}, payload) {
    return service.login(payload).then(() => {
      commit("IS_AUTHENTICATED", {
        isAuthenticated: true
      });
    });
  },
  register({commit}, payload) {
    return service.register(payload).then(() => {
      commit("IS_AUTHENTICATED", {
        isAuthenticated: false
      });
    });
  },
  logout({commit}) {
    return service.logout().then(() => {
      commit("IS_AUTHENTICATED", {
        isAuthenticated: false
      });
    });
  },
  forgotPassword({commit}, payload) {
    return service.forgotPassword(payload).then(() => {
      commit("IS_AUTHENTICATED", {
        isAuthenticated: false
      });
    });
  },
  resetPassword({commit}, payload) {
    console.log(commit);
    return service.resetPassword(payload).then((response) => {
      return response;
    });
  },
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
