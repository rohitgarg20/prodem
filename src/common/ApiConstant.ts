// export const BASE_URL = 'https://demo.exultcybersolution.in/'

export const BASE_URL = 'https://bms-market.it/'


export const API_END_POINT = {
  CHECK_USER_EXISTENCE: 'api/user/account-exists',
  CREATE_USER: 'api/user/signup',
  VERIFY_OTP: 'api/user/signup-verification',
  RESEND_OTP: 'api/user/resend-signup-code',
  LOGIN_USER: 'api/user/login',
  FORGET_PASSWORD: 'api/user/forget',
  FORGET_OTP_VERIFICATION: 'api/user/forget-verification',
  FORGET_RESEND_OTP: 'resend-forgot-code',
  RESET_PASSWORD: 'api/user/set-new-password',
  GET_CATEGORIES_BRAND_DATA: 'api/home',
  GET_SELL_DROPDOWN_LIST: 'api/sell/dropdown-list',
  GET_PRODUCT_LIST: 'api/shop',
  GET_PRODUCT_DETAIL: 'api/shop/product-details',
  GET_CART_DETAILS: 'api/cart/details',
  ADD_PRODUCT_TO_CART: 'api/cart/add-item',
  REMOVE_PRODUCT_FROM_CART: 'api/cart/remove-item',
  CREATE_PRODUCT: 'api/sell/create',
  ASK_PART_REQUEST: 'api/mypartrequest/create',
  GET_ASK_PART_DROPDOWN_LIST: 'api/mypartrequest/create-dropdown-list',
  GET_RATINGS_DATA: 'api/qualifying',
  GET_SUBSCRIPTION_PLANS: 'api/subscrition/list'
}

export const API_STATUS_CODE = {
  SUCCESS: 200,
  USER_NOT_EXISTS: 422
}