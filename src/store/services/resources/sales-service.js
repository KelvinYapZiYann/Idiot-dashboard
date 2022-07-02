import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("vue-authenticate.vueauth_access_token")
    }
};

function getAll(param) {
    return axios.get(`${url}/revenue?${param}`, config).then(response => {
        return response.data;
    });
}
  
function getById(id) {
    return axios.get(`${url}/revenue/${id}`, config).then(response => {
        return response.data;
    });
}

function add(model) {
    return axios.post(`${url}/revenue`, model, config).then(response => {
        return response.data;
    });
}
  
function update(id, model) {
    return axios.put(`${url}/revenue/${id}`, model, config).then(response => {
        return response.data;
    });
}
  
function remove(id) {
    return axios.delete(`${url}/revenue/${id}`, config).then(response => {
          return response.data;
    });
}

export default {
    getAll,
    getById,
    add,
    update,
    remove,
};