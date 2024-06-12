export const DevURL = `${process.env.REACT_APP_BACKEND_HOST}/api/admin/`;

// ? Dashboard
export const DASHBOARD_COUNTS = "dashboard/counts";
export const LINK_BIO_COUNT = "link_bio/link_bio_counts";
export const DASHBOARD_USERS = "dashboard/users";
export const DASHBOARD_URLS = "dashboard/urls";
export const ADMIN_DELETED_URLS = "dashboard/deleted_urls";
export const ADMIN_DELETED_URLS_COUNT = "dashboard/deleted_urls_count";
export const ADMIN_CRON_DELETED_URLS = "dashboard/deleted_urls/cron_job";

export const DASHBOARD_NO_AUTH_URLS_COUNT = "dashboard/no_auth/url_count";
export const DASHBOARD_NO_AUTH_URLS = "dashboard/no_auth";
export const DASHBOARD_URLS_DETAILS = "dashboard/no_auth/details";
export const DASHBOARD_NO_AUTH_QR_CODE = "dashboard/no_auth/qrcode";
export const CREATE_NO_AUTH_URLS = "dashboard/no_auth/url_shortner";
export const APP_DASHBOARD_COUNTS = "dashboard/no_auth/counts";
export const UPDATE_USER_STATUS = "users";
export const USER_LIST_COUNT = "users/users_count";
export const UPDATE_API_ADDON_STATUS = "users/update";

export const PAID_USER = "users/paid";
export const USER_DETAILS = "users/details";
export const USER_BIO_LINK_URL = "/link_bio/link_bio_urls";
export const USER_RESELLER = "users/reseller";
export const USER_SSL = "users/ssl_create";
export const ALL_ADMINS_LIST = "users/admins_list";

export const SUB_USERS = "users/sub_users";
export const USER_DOMAIN_LIST = "users/domain?user_id=";
export const ALL_DOMAINS = "users/domain_all";
export const ALL_DOMAIN_COUNT = "users/domain_all_count";
export const DAU = "users/dau";
export const MAU = "users/mau";
export const DAU_MAU_RATIO = "users/dau_mau_per";
export const COUNTRY_USER = "users/register_country";
export const COUNTRY_USER_LAST_DAYS = "users/register_country/lastdays";
export const COUNTRY_USER_MONTH = "users/register_country/month";
export const COUNTRY_USER_DYNAMIC = "users/register_country/dynamic_dates";
export const LOGGED_IN_COUNTRY_USER = "users/login_country";
export const LOGGED_IN_COUNTRY_USER_LAST_DAYS = "users/login_country/lastdays";
export const LOGGED_IN_COUNTRY_USER_MONTH = "users/login_country/month";
export const LOGGED_IN_COUNTRY_USER_DYNAMIC =
  "users/login_country/dynamic_dates";
export const BACK_TO_DEFAULT = "users/default_package";
export const DELETE_LONG_URL = "dashboard/no_auth/url_shortner";
export const DELETE_LINK_BIO_USER = "link_bio/delete_bio_users";
export const EDIT_LINK_BIO_USER = "link_bio/update_bio_users";

export const WEB_URLS = "web_url";
export const LINK_BIO_USERS = "link_bio/link_bio_users";
export const WEB_URLS_COUNT = "web_url/web_url_count";
export const LINK_BIO_USERS_COUNT = "link_bio/link_bio_users_count";
export const APPLICATION_DATA = "config/applications";
export const APPLICATION = "config/application";
export const WR_APPLICATION_DATA = "config/wr_applications";
export const CAT_APPLICATION_DATA = "config/cat_applications";
export const BGREMOVER_APPLICATION_DATA = "config/image_bg_remover_app";
export const BGREMOVER_APP_CONFIG = "config/image_bg_remover/host";

export const GET_TOTAL_VIRUS = "virus_total";
export const ADD_TOTAL_VIRUS = "virus_total";
export const UPDATE_TOTAL_VIRUS = "virus_total";
export const DELETE_TOTAL_VIRUS = "virus_total";

export const API_USERS = "users/api_user";
export const API_USER_COUNT = "users/api_users_count";
export const DELETE_API_KEY = "users";

// ? config package
export const ADD_CONFIG_PACKAGE = "config/package";
export const BUY_CONFIG_PACKAGE = "config/buy_package";
export const ADD_CONFIG_DOMIAN = "config/domain";

export const OPENDNS_CONFIG = "config/dns_dig_ip";

export const ADD_CONFIG_COUPON = "coupon";

export const GET_ALL_CONFIG = "config/package";
export const GET_ALL_LOGS = "logs";
export const GET_ALL_LOGS_COUNT = "logs/logs_count";

export const GET_BUY_PACKAGES_CONFIG = "config/buy_package";
export const STATIC_DOMAIN_CONFIG = "config/static_domain";
export const TELEGRAM_BOT_CONFIG = "config/telegram_bot";
export const PAYPAL_DATA_CONFIG = "config/paypal";

export const DOMAIN = "domain";
export const DOMAIN_COUNT = "domain/domain_count";
export const TEST_DOMAIN = "domain/test?domain_id=";
export const VERIFY_DOMAIN = "domain/verify_domain";

export const APP_DOMAIN = "app_domain";
export const APP_DOMAIN_COUNT = "app_domain/app_domain_count";
export const DEFAULT_DOMAIN = "app_domain/default";
export const TEST_APP_DOMAIN = "app_domain/test?domain_id=";
export const VERIFY_APP_DOMAIN = "app_domain/verify_domain";

export const GET_ALL_COUPON = "coupon";
export const GET_ALL_COUPON_COUNT = "coupon/coupon_count";
export const PACKAGE = "package";
export const PROMO_CODE = "promo_code";

// ? BLOCK DOMAIN
export const BLOCKED_DOMAIN = "block_domain";
export const UPDATE_DOMAIN = "block_domain?block_domain_id=";

// ? config ads
export const GET_ADS_CONFIG = "config/hold_page";

// ? Support Text
export const SUPPORT_TEXT_CONFIG = "config/support_text";

// ? Chrome Extension Add-on
export const ADD_ON_CONFIG = "config/add_on";
export const ADD_ON_TRAIN_CONFIG = "config/add_training_domain";
export const PURCHASED_ADD_ON_USERS = "purchased_add_on";

// ? ads
export const USER_ADS_STATUS = "users/show_ads?user_id=";

// ? Add On
export const CHROME_ADD_ON = "users/enable_add_on?user_id=";
export const API_ADD_ON = "users/enable_api_add_on?user_id=";

export const UNSUBSCRIBE_USER = "users/unsubscribe?user_id=";

export const UNVERIFIED_USER = "users/unverified";

// ? Deleted User
export const DELETED_USER = "users/deleted_users";
export const DELETED_USER_COUNT = "users/deleted_users_count";
export const UNSUBSCRIBE_USER_MAIL = "users/unsubscribe_mail";
export const SUBSCRIBE_USER_MAIL = "users/subscribe_mail";

// ? Chart
export const TODAY_GRAPH = "dashboard/no_auth/statistics/all";
export const LASTDAYS_GRAPH = "dashboard/no_auth/statistics/all/lastdays";
export const MONTH_GRAPH = "dashboard/no_auth/statistics/all/month";
export const CUSTOM_GRAPH = "dashboard/no_auth/statistics/all/dynamic_dates";

// ? Browser Chart
export const BROWSER_TODAY_GRAPH = "dashboard/no_auth/statistics/all/platforms";
export const BROWSER_MONTH_GRAPH =
  "dashboard/no_auth/statistics/all/platforms/month";
export const BROWSER_LAST_DAY =
  "dashboard/no_auth/statistics/all/platforms/lastdays";
export const BROWSER_DYNAMIC_GRAPH =
  "dashboard/no_auth/statistics/all/platforms/dynamic_dates";

// ? Help Center Config
export const HELP_CENTER_CONFIG = "config/help_center";

// ? Terms Url Config
export const TERMS_URL_CONFIG = "config/terms_of_url";

export const COMMON_CONFIG_SETTINGS = "config/common_settings";
export const REDIRECT_DOMAIN_SETTINGS = "config/redirect_domain";
export const URL_ROTATING = "config/url_rotating";

export const CHECK_SAFE_BROWSING = "safe_browsing/check_url";
export const GET_SAFE_BROWSING_CONFIG = "config/safe_browsing";
export const SAFE_BROWSING = "safe_browsing";

//? Pabbly package
export const PABBLY_PACKAGE = "pabbly/package";
export const PABBALY_PACKAGE_COUNT = "pabbly/package/pabbly_count";
export const PABBLY_COUPON = "pabbly/package/coupon";
export const USER_BIO_LINK_URLS = "/link_bio/link_bio_urls";
export const PABBLY_CONFIG = "config/pabbly";
export const PABBLY_PURCHASE = "pabbly/package/pabblydata";
export const PABBLY_PURCHASE_COUNT = "pabbly/package/pabblydata_count";

//? check all domain at once
export const CHECK_ALL_DOMAINS = "domain/manually_check";

export const URL = DevURL;

// Expired Users
export const EXPIRED_USER = "users/expired_users";
export const EXPIRED_USER_COUNT = "users/expired_users_count";
