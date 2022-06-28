import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("vue-authenticate.vueauth_access_token")
    }
};

function getAll() {
    return axios.get(`${url}/details/store`, config).then(response => {
        return response.data;
    });
}

function getDetailAll() {
    return axios.get(`${url}/details/all`, config).then(response => {
        return response.data;
    });
}

function get(pageId) {
    if (pageId && typeof pageId == "number") {
        return axios.get(`${url}/store?page=${pageId}`, config).then(response => {
            return response.data;
        });
    } else {
        return axios.get(`${url}/store`, config).then(response => {
            return response.data;
        });
    }
}
  
function getById(id) {
    return axios.get(`${url}/store/${id}`, config).then(response => {
        return response.data;
    });
}
  
function create() {
    return axios.get(`${url}/store/create`, config).then(response => {
        return response.data;
    });
}

function add(payload) {
    let model = payload.model;
  
    return axios.post(`${url}/store`, model, config).then(response => {
        return response.data;
    });
}
  
function update(payload) {
    let assetId = payload.assetId;
    let model = payload.model;
  
    return axios.post(`${url}/store/${assetId}/update`, model, config).then(response => {
        return response.data;
    });
}
  
function remove(id) {
    return axios.delete(`${url}/store/${id}`, config).then(response => {
          return response.data;
    });
}

export default {
    getAll,
    getDetailAll,
    get,
    getById,
    create,
    add,
    update,
    remove,
};