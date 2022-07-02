import service from '@/store/services/resources/sales-service';

const state = {
};

const mutations = {
    
};

const actions = {
    getAll({commit}, payload) {
        return service.getAll(payload.param).then((response) => {
            return response;
        }).catch(() => {
            console.log(commit);
        });
    },
    getById({commit}, payload) {
        return service.getById(payload.id).then((response) => {
            return response;
        }).catch(() => {
            console.log(commit);
        });
    },
    add({commit}, payload) {
        return service.add(payload.model).then((response) => {
            return response;
        }).catch(() => {
            console.log(commit);
        });
    },
    update({commit}, payload) {
        return service.update(payload.id, payload.model).then((response) => {
            return response
        }).catch(() => {
            console.log(commit);
        });
    },
    remove({commit}, payload) {
        return service.remove(payload.id).then((response) => {
            return response;
        }).catch(() => {
            console.log(commit);
        });
    },
};

const getters = {
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;