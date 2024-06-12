export const STORAGEKEY = {
  ACCESSTOKEN: "ACCESSTOKEN",
  ROLE: "ROLE",
  EMAIL: "EMAIL",
  FULL_NAME: "FULLNAME",
  NEW_FEATURE_ALERT: "NEW_FEATURE_ALERT",
  REACT_APP_CAPTCHA_KEY: "6LfhfjIgAAAAAApCKJv8MwH6NDE4_xv9XP4OAhne",
};

export const disabledOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const setFeildValues = (formObj, feild, value) => {
  formObj.formRef.current.setFieldValue(feild, value);
};

// export const WEB_URL = "https://192.168.1.12:7000";
export const WEB_URL = process.env.REACT_APP_BACKEND_HOST;

// export const UrlRegX =
//   /((https?):\/\/)?(www.)?[a-z0-9]+(.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
