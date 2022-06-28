import moment from 'moment';

const actions = {
    decodeDateRange({commit}, param) {
        if (typeof param != 'string') {
            console.log(commit);
            return null;
        }
        let today = moment();
        switch (param) {
            case 'all':
                return '1970-01-01,2050-12-31';
            case 'today':
                return `${today.format("YYYY-MM-DD")},${today.add(1, 'days').format("YYYY-MM-DD")}`;
            case 'yesterday':
                return `${moment().subtract(1, 'days').format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'weekTillDate':
                return `${moment().startOf('week').format("YYYY-MM-DD")},${today.add(1, 'days').format("YYYY-MM-DD")}`;
            case 'lastWeek':
                return `${moment().startOf('week').subtract(7, 'days').format("YYYY-MM-DD")},${today.startOf('week').format("YYYY-MM-DD")}`;
            case 'monthTillDate':
                return `${moment().startOf('month').format("YYYY-MM-DD")},${today.add(1, 'days').format("YYYY-MM-DD")}`;
            case 'lastMonth':
                return `${moment().startOf('month').subtract(1,'months').format("YYYY-MM-DD")},${today.startOf('month').format("YYYY-MM-DD")}`;
            case 'yearTillDate':
                return `${moment().startOf('year').format("YYYY-MM-DD")},${today.add(1, 'days').format("YYYY-MM-DD")}`;
            case 'lastYear':
                return `${moment().startOf('year').subtract(1,'years').format("YYYY-MM-DD")},${today.startOf('year').format("YYYY-MM-DD")}`;
            default:
                return null;
        }
    },
    decodeDateRangeOneDayBefore({commit}, param) {
        if (typeof param != 'string') {
            console.log(commit);
            return null;
        }
        let today = moment();
        switch (param) {
            case 'all':
                return '1970-01-01,2050-12-31';
            case 'today':
                return `${today.format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'yesterday':
                return `${today.subtract(1, 'days').format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'weekTillDate':
                return `${moment().startOf('week').format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'lastWeek':
                return `${today.startOf('week').subtract(7, 'days').format("YYYY-MM-DD")},${today.add(7, 'days').format("YYYY-MM-DD")}`;
            case 'monthTillDate':
                return `${moment().startOf('month').format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'lastMonth':
                return `${moment().startOf('month').subtract(1,'months').format("YYYY-MM-DD")},${today.startOf('month').subtract(1, 'days').format("YYYY-MM-DD")}`;
            case 'yearTillDate':
                return `${moment().startOf('year').format("YYYY-MM-DD")},${today.format("YYYY-MM-DD")}`;
            case 'lastYear':
                return `${moment().startOf('year').subtract(1,'years').format("YYYY-MM-DD")},${today.startOf('year').subtract(1, 'days').format("YYYY-MM-DD")}`;
            default:
                return null;
        }
    },
};

const store = {
    namespaced: true,
    actions,
};

export default store;