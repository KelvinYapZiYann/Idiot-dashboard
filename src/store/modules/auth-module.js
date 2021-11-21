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
    console.log(payload);
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
