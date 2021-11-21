import service from '@/store/services/resources/dashboard-service';

const state = {
    totalTrafficsEnter: '0',
    totalTrafficsExit: '0',
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

    models: []
};

const mutations = {
    SET_TRAFFICS: (state, response) => {
        state.models = response;
    },
    // SET_TOTAL_TRAFFICS: (state, response) => {
    //     state.totalTrafficsEnter = response.totalTrafficsEnter;
    //     state.totalTrafficsExit = response.totalTrafficsExit;
    // },
    // SET_TODAY_TRAFFICS: (state, response) => {
    //     state.todayEnter = response.todayEnter;
    //     state.todayExit = response.todayExit;
    // },
    // SET_YESTERDAY_TRAFFICS: (state, response) => {
    //     state.yesterdayEnter = response.yesterdayEnter;
    //     state.yesterdayExit = response.yesterdayExit;
    // },
    // SET_THIS_WEEK_TRAFFICS: (state, response) => {
    //     state.thisWeekEnter = response.thisWeekEnter;
    //     state.thisWeekExit = response.thisWeekExit;
    // },
    // SET_LAST_WEEK_TRAFFICS: (state, response) => {
    //     state.lastWeekEnter = response.lastWeekEnter;
    //     state.lastWeekExit = response.lastWeekExit;
    // },
    // SET_THIS_MONTH_TRAFFICS: (state, response) => {
    //     state.thisMonthEnter = response.thisMonthEnter;
    //     state.thisMonthExit = response.thisMonthExit;
    // },
    // SET_LAST_MONTH_TRAFFICS: (state, response) => {
    //     state.lastMonthEnter = response.lastMonthEnter;
    //     state.lastMonthExit = response.lastMonthExit;
    // },
};

const actions = {
    getTotalTraffics({commit}, param) {
        return service.getTotalTraffics(param).then((response) => {
            commit('SET_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getDailyTrafficsInCustomDateRange({commit}, param) {
        return service.getDailyTrafficsInCustomDateRange(param).then((response) => {
            commit('SET_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    getDailyTrafficsInMonth({commit}, param) {
        return service.getDailyTrafficsInMonth(param).then((response) => {
            commit('SET_TRAFFICS', response);
        }).catch((e) => {
            console.error(e);
        });
    },
    // getTodayTraffics({commit}) {
    //     return service.getTodayTraffics().then((response) => {
    //         commit('SET_TODAY_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
    // getYesterdayTraffics({commit}) {
    //     return service.getYesterdayTraffics().then((response) => {
    //         commit('SET_YESTERDAY_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
    // getThisWeekTraffics({commit}) {
    //     return service.getThisWeekTraffics().then((response) => {
    //         commit('SET_THIS_WEEK_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
    // getlastWeekTraffics({commit}) {
    //     return service.getlastWeekTraffics().then((response) => {
    //         commit('SET_LAST_WEEK_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
    // getThisMonthTraffics({commit}) {
    //     return service.getThisMonthTraffics().then((response) => {
    //         commit('SET_THIS_MONTH_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
    // getlastMonthTraffics({commit}) {
    //     return service.getlastMonthTraffics().then((response) => {
    //         commit('SET_LAST_MONTH_TRAFFICS', response);
    //     }).catch((e) => {
    //         console.error(e);
    //     });
    // },
};

const getters = {
    totalTrafficsEnter: state => state.totalTrafficsEnter,
    totalTrafficsExit: state => state.totalTrafficsExit,
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

    models: state => state.models,
};

const store = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

export default store;