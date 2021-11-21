import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
  };

function login(payload) {
    return axios.post(`${url}/login`, payload, config).then(response => {
        localStorage.setItem("vue-authenticate.vueauth_access_token", `Bearer ${response.data.access_token}`);
        return response.data;
    });
}

function register(payload) {
    console.log(payload);
    return axios.post(`${url}/register`, payload, config).then(response => {
        localStorage.removeItem("vue-authenticate.vueauth_access_token");
        console.log(response.data);
        return response.data;
    });
}

function logout() {
    return axios.post(`${url}/logout`, config).then(response => {
        localStorage.removeItem("vue-authenticate.vueauth_access_token");
        return response.data;
    }).catch((e) => {
        localStorage.removeItem("vue-authenticate.vueauth_access_token");
        return e;
    });
}

export default {
    login,
    register,
    logout,
};