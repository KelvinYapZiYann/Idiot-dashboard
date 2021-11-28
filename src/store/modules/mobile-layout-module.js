const state = {
    isMobileLayout: false,
};

const mutations = {
    IS_MOBILE_LAYOUT: (state, payload) => {
      state.isMobileLayout = payload;
    }
};

const actions = {
    update({commit}, params) {
        commit("IS_MOBILE_LAYOUT", params);
    }
};

const getters = {
    isMobileLayout: state => state.isMobileLayout,
};

const mobileLayout = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};

export default mobileLayout;