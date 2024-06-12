import api from "../api/api";
import * as url from "../api/url";

// User Login API
export const userAuthLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.LOGIN_URL, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const userAuthRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.REGISTER_URL, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const userForgotPassword = (payload) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.FORGOT_PASSWORD, payload)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const userResetPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.RESET_PASSWORD, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
