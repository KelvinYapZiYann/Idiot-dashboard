import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

function get(pageId) {
    if (pageId && typeof pageId == "number") {
        return axios.get(`${url}/device?page=${pageId}`, config).then(response => {
            return response.data;
        });
    } else {
      return axios.get(`${url}/device`, config)
        .then(response => {
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

export default {
    get,
    getById,
    create,
    add,
    update,
    remove,
  };