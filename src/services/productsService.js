import api from "../api/api";
import * as url from "../api/url";

export const GenerateAPIKey = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .postWithToken(url.API_KEY)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const CreateProductAPI = (payload) => {
  return new Promise(async (resolve, reject) => {
    return api
      .postWithToken(url.PRODUCT, payload)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const DeleteProductAPI = (product_id) => {
  return new Promise(async (resolve, reject) => {
    return api
      .deleteWithToken(url.PRODUCT + `?product_id=${product_id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetProductListAPI = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.ALL_PRODUCT)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetTransactionsListAPI = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.TRANSACTIONS)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetWebhookDataAPI = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.SET_WEBHOOK)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const SetWebhookDataAPI = (payload) => {
  return new Promise(async (resolve, reject) => {
    return api
      .postWithToken(url.SET_WEBHOOK, payload)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetDepositWalletDataAPI = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.DEPOSIT_WALLET)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const SetDepositWalletDataAPI = (payload) => {
  return new Promise(async (resolve, reject) => {
    return api
      .postWithToken(url.DEPOSIT_WALLET, payload)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
