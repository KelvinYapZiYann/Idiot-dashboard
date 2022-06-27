import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("vue-authenticate.vueauth_access_token")
    }
};

function getDetail(param) {
    return axios.get(`${url}/details/device?store_id=${param}`, config).then(response => {
        return response.data;
    });
}

function getAll(param) {
    if (param) {
        if (typeof param == "number") {
            return axios.get(`${url}/device?page=${param}`, config).then(response => {
                return response.data;
            });
        } else if (typeof param == "object") {
            if (param.pageId && param.storeId) {
                return axios.get(`${url}/device?page=${param.pageId}&storeId=${param.storeId}`, config).then(response => {
                    return response.data;
                });
            } else if (param.pageId) {
                return axios.get(`${url}/device?page=${param.pageId}`, config).then(response => {
                    return response.data;
                });
            } else if (param.storeId) {
                return axios.get(`${url}/device?storeId=${param.storeId}`, config).then(response => {
                    return response.data;
                });
            } else {
                return axios.get(`${url}/device`, config).then(response => {
                    return response.data;
                });
            }
        }
    } else {
        return axios.get(`${url}/details/device`, config).then(response => {
            return response.data;
        });
    }
}
  
function getById(id) {
    return axios.get(`${url}/device/${id}`, config).then(response => {
        return response.data;
    });
}
  
function create() {
    return axios.get(`${url}/device/create`, config).then(response => {
        return response.data;
    });
}

function add(payload) {
    let model = payload.model;
  
    return axios.post(`${url}/device`, model, config).then(response => {
        return response.data;
    });
}
  
function update(payload) {
    let assetId = payload.assetId;
    let model = payload.model;
  
    return axios.post(`${url}/device/${assetId}/update`, model, config).then(response => {
        return response.data;
    });
}
  
function remove(id) {
    return axios.delete(`${url}/device/${id}`, config).then(response => {
          return response.data;
    });
}

function getTotalTraffics(param) {
    return axios.get(`${url}/device/total-traffics?${param}`, config)
        .then(response => {
            return response.data;
        });
}

export default {
    getDetail,
    
    getAll,
    getById,
    create,
    add,
    update,
    remove,

    getTotalTraffics,
  };