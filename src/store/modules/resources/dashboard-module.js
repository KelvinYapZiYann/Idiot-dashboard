import service from '@/store/services/resources/dashboard-service';

const state = {
    maxTrafficsEnter: '0',
    maxTrafficsExit: '0',
    todayEnter: '0',
    todayExit: '0',
    yesterdayEnter: '0',
    yesterdayExit: '0',
    thisWeekEnter: '0',
    thisWeekExit: '0',
    lastWeekEnter: '0',
    lastWeekExit: '0',
    thisMonthEnter: '0',
    thisMonthExit: '0',
    lastMonthEnter: '0',
    lastMonthExit: '0',
};

const mutations = {
    SET_MAX_TRAFFICS: (state, response) => {
        state.maxTrafficsEnter = response.maxTrafficsEnter;
        state.maxTrafficsExit = response.maxTrafficsExit;
    },
    SET_TODAY_TRAFFICS: (state, response) => {
        state.todayEnter = response.todayEnter;
        state.todayExit = response.todayExit;
    },
    SET_YESTERDAY_TRAFFICS: (state, response) => {
        state.yesterdayEnter = response.yesterdayEnter;
        state.yesterdayExit = response.yesterdayExit;
    },
    SET_THIS_WEEK_TRAFFICS: (state, response) => {
        state.thisWeekEnter = response.thisWeekEnter;
        state.thisWeekExit = response.thisWeekExit;
    },
    SET_LAST_WEEK_TRAFFICS: (state, response) => {
        state.lastWeekEnter = response.lastWeekEnter;
        state.lastWeekExit = response.lastWeekExit;
    },
    SET_THIS_MONTH_TRAFFICS: (state, response) => {
        state.thisMonthEnter = response.thisMonthEnter;
        state.thisMonthExit = response.thisMonthExit;
    },
    SET_LAST_MONTH_TRAFFICS: (state, response) => {
        state.lastMonthEnter = response.lastMonthEnter;
        state.lastMonthExit = response.lastMonthExit;
    },
};

const actions = {
    getMaxTraffics({commit}) {
        return service.getMaxTraffics().then((response) => {
            commit('SET_MAX_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getTodayTraffics({commit}) {
        return service.getTodayTraffics().then((response) => {
            commit('SET_TODAY_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getYesterdayTraffics({commit}) {
        return service.getYesterdayTraffics().then((response) => {
            commit('SET_YESTERDAY_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getThisWeekTraffics({commit}) {
        return service.getThisWeekTraffics().then((response) => {
            commit('SET_THIS_WEEK_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getlastWeekTraffics({commit}) {
        return service.getlastWeekTraffics().then((response) => {
            commit('SET_LAST_WEEK_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getThisMonthTraffics({commit}) {
        return service.getThisMonthTraffics().then((response) => {
            commit('SET_THIS_MONTH_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getlastMonthTraffics({commit}) {
        return service.getlastMonthTraffics().then((response) => {
            commit('SET_LAST_MONTH_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
};

const getters = {
    maxTrafficsEnter: state => state.maxTrafficsEnter,
    maxTrafficsExit: state => state.maxTrafficsExit,
    todayEnter: state => state.todayEnter,
    todayExit: state => state.todayExit,
    yesterdayEnter: state => state.yesterdayEnter,
    yesterdayExit: state => state.yesterdayExit,
    thisWeekEnter: state => state.thisWeekEnter,
    thisWeekExit: state => state.thisWeekExit,
    lastWeekEnter: state => state.lastWeekEnter,
    lastWeekExit: state => state.lastWeekExit,
    thisMonthEnter: state => state.thisMonthEnter,
    thisMonthExit: state => state.thisMonthExit,
    lastMonthEnter: state => state.lastMonthEnter,
    lastMonthExit: state => state.lastMonthExit,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;