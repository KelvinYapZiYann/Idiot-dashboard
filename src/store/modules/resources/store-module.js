import service from '@/store/services/resources/store-service';

const state = {
    models: [],
    data: {},
    selector: {},
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
        })
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
            'canAdd': response.meta.canAdd,
            'currentPage': response.meta.current_page,
            'from': response.meta.from,
            'to': response.meta.to,
            'total': response.meta.total,
            'perPage': response.meta.per_page,
            'links': response.meta.links,
        }
    },
    SET_RESOURCE: (state, response) => {
        let fields = response.data.fields;
        let obj = {};
        obj.id = response.data.id;
        for (let key in fields) {
            obj[key] = fields[key];
        }
        state.models = [obj];
        let selectors = response.meta.selector;
        for (let field in selectors) {
            let options = [];
            let selector = selectors[field];
            for (let key in selector) {
                options.push({
                    id: key,
                    name: selector[key]
                });
            }
            state.selector[field] = options;
        }
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
    get({commit}, pageId) {
        return service.get(pageId).then((response) => {
            commit('SET_RESOURCES', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getById({commit}, id) {
        return service.getById(id).then((response) => {
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
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;