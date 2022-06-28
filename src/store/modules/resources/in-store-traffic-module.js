import service from '@/store/services/resources/in-store-traffic-service';

const state = {
    models: [],
    data: {},
    selector: {},

    totalTraffics: {},
};

const mutations = {
    SET_RESOURCES_DETAIL: (state, response) => {
        state.models = [];
        response.forEach((item) => {
            let obj = {};
            obj.id = item.device_id;
            for (let key in item) {
                obj[key] = item[key];
            }
            state.models.push(obj);
        });
    },
    SET_RESOURCES: (state, response) => {
        state.models = [];
        response.forEach((item) => {
            let obj = {};
            for (let key in item) {
                obj[key] = item[key];
            }
            state.models.push(obj);
        });
        // state.data = {
        //     'canAdd': response.meta.canAdd,
        //     'currentPage': response.meta.current_page,
        //     'from': response.meta.from,
        //     'to': response.meta.to,
        //     'total': response.meta.total,
        //     'perPage': response.meta.per_page,
        //     'links': response.meta.links,
        // }
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

    SET_TOTAL_TRAFFICS: (state, response) => {
        state.totalTraffics = response;
    },
};

const actions = {
    getDetail({commit}, param) {
        return service.getDetail(param).then((response) => {
            commit('SET_RESOURCES_DETAIL', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getAll({commit}, param) {
        return service.getAll(param ? param.param : null).then((response) => {
            commit('SET_RESOURCES', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getById({commit}, param) {
        return service.getById(param.id, param.param).then((response) => {
            return response;
            // commit('SET_RESOURCE', response);
        }).catch((e) => {
            console.log(commit);
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

    getTotalTraffics({commit}, param) {
        return service.getTotalTraffics(param.param).then((response) => {
            return response;
            // commit('SET_TOTAL_TRAFFICS', response);
        }).catch((e) => {
            console.log(commit);
            console.error(e);
        });
    },
    getDailyTraffics({commit}, param) {
        return service.getDailyTraffics(param.param).then((response) => {
            return response;
        }).catch((e) => {
            console.log(commit);
            console.error(e);
        });
    },
    getMinuteTraffics({commit}, param) {
        return service.getMinuteTraffics(param.param).then((response) => {
            return response;
        }).catch((e) => {
            console.log(commit);
            console.error(e);
        });
    },
};

const getters = {
    models: state => state.models,
    data: state => state.data,
    selector: state => state.selector,
    totalTraffics: state => state.totalTraffics,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;