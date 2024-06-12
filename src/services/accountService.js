import api from "../api/api";
import * as url from "../api/url";

export const AuthVerifyEmail = (paydata) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.VERIFICATION, paydata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const authResendCode = (paydata) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.RESEND_CODE, paydata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const getUserAccount = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.GET_USER_ACCOUNT)
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

export const updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .putWithToken(url.GET_USER_ACCOUNT, data)
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

export const UploadProfileApi = (paydata) => {
  return new Promise(async (resolve, reject) => {
    return api
      .putWithToken(url.PROFILE_IMAGE, paydata)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const DashboardAPI = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.DASHBOARD)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
