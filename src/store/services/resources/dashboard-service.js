import axios from 'axios';


const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("vue-authenticate.vueauth_access_token")
    }
};

function getTotalTraffics(param) {
    return axios.get(`${url}/device/total-traffics?${param}`, config)
        .then(response => {
            return response.data;
        });
}

function getDailyTrafficsInCustomDateRange(param) {
    return axios.get(`${url}/device/custom-traffics?store_id=${param.storeId}&device_id=${param.deviceId}&start_date=${param.startDate}&end_date=${param.endDate}`, config)
        .then(response => {
            return response.data;
        });
}

function getDailyTrafficsInMonth(param) {
    return axios.get(`${url}/device/daily-traffics?store_id=${param.storeId}&device_id=${param.deviceId}&month=${param.month}`, config)
        .then(response => {
            return response.data;
        });
}

function getHourlyTrafficsInDay(param) {
    return axios.get(`${url}/device/hourly-traffics?store_id=${param.storeId}&device_id=${param.deviceId}&date=${param.date}`, config)
        .then(response => {
            return response.data;
        });
}

function getMinuteTrafficsInDay(param) {
    return axios.get(`${url}/device/traffics?store_id=${param.storeId}&device_id=${param.deviceId}&date=${param.date}&interval=${param.interval}`, config)
        .then(response => {
            return response.data;
        });
}





function getTodayTraffics() {
    return axios.get(`${url}/total-traffics?type=today`, config)
        .then(response => {
            return response.data;
        });
}

function getYesterdayTraffics() {
    return axios.get(`${url}/total-traffics?type=yesterday`, config)
        .then(response => {
            return response.data;
        });
}

function getThisWeekTraffics() {
    return axios.get(`${url}/total-traffics?type=thisWeek`, config)
        .then(response => {
            return response.data;
        });
}

function getlastWeekTraffics() {
    return axios.get(`${url}/total-traffics?type=lastWeek`, config)
        .then(response => {
            return response.data;
        });
}

function getThisMonthTraffics() {
    return axios.get(`${url}/total-traffics?type=thisMonth`, config)
        .then(response => {
            return response.data;
        });
}

function getlastMonthTraffics() {
    return axios.get(`${url}/total-traffics?type=lastMonth`, config)
        .then(response => {
            return response.data;
        });
}

export default {
    getTotalTraffics,
    getDailyTrafficsInCustomDateRange,
    getDailyTrafficsInMonth,
    getHourlyTrafficsInDay,
    getMinuteTrafficsInDay,

    getTodayTraffics,
    getYesterdayTraffics,
    getThisWeekTraffics,
    getlastWeekTraffics,
    getThisMonthTraffics,
    getlastMonthTraffics,
};