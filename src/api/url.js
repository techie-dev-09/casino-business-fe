export const DevURL = `${process.env.REACT_APP_BACKEND_HOST}/api/`;

const BUSINESS = "business/";

// ? Authentication URL
export const LOGIN_URL = BUSINESS + "login";
export const REGISTER_URL = BUSINESS + "register";
export const VERIFICATION = BUSINESS + "verification";
export const RESEND_CODE = BUSINESS + "resend_code";
export const FORGOT_PASSWORD = BUSINESS + "forgot_password";
export const RESET_PASSWORD = BUSINESS + "change_password";
export const GET_USER_ACCOUNT = BUSINESS + "me";
export const PROFILE_IMAGE = BUSINESS + "profile";
export const DASHBOARD = BUSINESS + "dashboard";

// ? API Key
export const API_KEY = BUSINESS + "api_key";

// ? Products
export const PRODUCT = BUSINESS + "product";
export const ALL_PRODUCT = PRODUCT + "/all";
export const TRANSACTIONS = BUSINESS + "transactions";
export const SET_WEBHOOK = BUSINESS + "/webhook";
export const DEPOSIT_WALLET = BUSINESS + "/dev_deposit_wallet";

export const URL = DevURL;
