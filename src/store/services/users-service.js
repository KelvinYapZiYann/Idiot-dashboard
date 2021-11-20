import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const config = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

function get() {
  return axios.get(`${url}/users`, config).then(response => {
    return response.data;
  });
}

function update(params) {
  return axios.post(`${url}/users/update`, params, config).then(response => {
    return response.data;
  });
}

export default {
  get,
  update
};

