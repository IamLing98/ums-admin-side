import axios from "axios";

const API_ROOT = "http://127.0.0.1:8080";

const responseBody = (res) => res.data;

let token = localStorage.getItem("jwtToken");

const tokenPlugin = (secured) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
    }, 
  };
  if (token && secured) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const api = {
  get: (url, secured = true) => {
    return axios
      .get(`${API_ROOT}${url}`, tokenPlugin(secured))
      .then(responseBody);
  },
  post: (url, body = null, secured = true) => {
    return axios
      .post(`${API_ROOT}${url}`, body, tokenPlugin(secured))
      .then(responseBody);
  },
  put: (url, body = null, secured = true) => {
    return axios
      .put(`${API_ROOT}${url}`, body, tokenPlugin(secured))
      .then(responseBody);
  },
  upload: (url, file, secured = true) => {
    return superagent
      .post(`${API_ROOT}${url}`)
      .attach("file", file)
      .use(tokenPlugin(secured))
      .then(responseBody);
  },
  delete: (url, secured = true) => {
    return axios
      .delete(`${API_ROOT}${url}`, tokenPlugin(secured))
      .then(responseBody);
  },
  setToken: (newToken) => (token = newToken),
};
