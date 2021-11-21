import axios from 'axios';


const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

function getMaxTraffics() {
    return axios.get(`${url}/total-traffics?type=total`, config)
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
    getMaxTraffics,
    getTodayTraffics,
    getYesterdayTraffics,
    getThisWeekTraffics,
    getlastWeekTraffics,
    getThisMonthTraffics,
    getlastMonthTraffics,
};