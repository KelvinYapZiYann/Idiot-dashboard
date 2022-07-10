import service from '@/store/services/resources/store-service';

const state = {
    models: [],
    data: {},
    selector: {},
    model: {},
};

const mutations = {
    SET_RESOURCES_ALL: (state, response) => {
        state.models = [];
        response.forEach((item) => {
            let obj = {};
            obj.id = item.store_id;
            for (let key in item) {
                obj[key] = item[key];
            }
            state.models.push(obj);
        });
    },
    SET_RESOURCES: (state, response) => {
        state.models = [];
        response.data.forEach((item) => {
            let fields = item.fields;
            let obj = {};
            obj.id = item.id;
            for (let key in fields) {
                obj[key] = fields[key];
            }
            state.models.push(obj);
        });
        state.data = {
            'can_add': response.meta.canAdd,
            'current_page': response.meta.current_page,
            'from': response.meta.from,
            'to': response.meta.to,
            'total': response.meta.total,
            'per_page': response.meta.per_page,
            'links': response.meta.links,
        }
    },
    SET_RESOURCE: (state, response) => {
        state.model = response[0];
    },
};

const actions = {
    getAll({commit}) {
        return service.getAll().then((response) => {
            commit('SET_RESOURCES_ALL', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getDetailAll({commit}) {
        return service.getDetailAll().then((response) => {
            commit('SET_RESOURCES_ALL', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    get({commit}, pageId) {
        return service.get(pageId).then((response) => {
            commit('SET_RESOURCES', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getById({commit}, param) {
        return service.getById(param.id).then((response) => {
            commit('SET_RESOURCE', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    create({commit}) {
        return service.create().then((response) => {
            commit('SET_RESOURCE', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    add(payload) {
        return service.add(payload).then(() => {}).catch((e) => {
            console.error(e);
        });
    },
    update() {
        return service.add().then(() => {}).catch((e) => {
            console.error(e);
        });
    },
    remove(id) {
        return service.remove(id).then(() => {}).catch((e) => {
            console.error(e);
        });
    },
};

const getters = {
    models: state => state.models,
    data: state => state.data,
    selector: state => state.selector,
    model: state => state.model,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;