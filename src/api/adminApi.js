import axios from "axios";
import { URL } from "./adminUrl";
import { STORAGEKEY } from "../components/Constant";
export const Bearer = "Bearer ";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.assign("/user-login");
    } else {
      return Promise.reject(error);
    }
  }
);

export default {
  get: (url) => {
    return axios.get(URL + url);
  },

  post: (url, data) => {
    return axios.post(URL + url, data);
  },

  postWithToken: (url, data) => {
    return axios({
      method: "post",
      data: data,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  getWithParams: (url, params) => {
    return axios({
      method: "get",
      params,
      url: URL + url,
    });
  },

  getWithToken: (url) => {
    return axios({
      method: "get",
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  putWithToken: (url, data) => {
    return axios({
      method: "put",
      data: data,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  deleteWithToken: (url, params) => {
    return axios({
      method: "delete",
      params,
      url: URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },
};
