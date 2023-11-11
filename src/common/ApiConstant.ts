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

  GET_WISHLIST_DETAILS: 'api/wishlist',
  ADD_PRODUCT_TO_WISHLIST: 'api/wishlist/add-item',
  REMOVE_PRODUCT_FROM_WISHLIST: 'api/wishlist/remove-item',

  CREATE_PRODUCT: 'api/sell/create',
  ASK_PART_REQUEST: 'api/mypartrequest/create',
  GET_ASK_PART_DROPDOWN_LIST: 'api/mypartrequest/create-dropdown-list',
  GET_RATINGS_DATA: 'api/qualifying',
  GET_SUBSCRIPTION_PLANS: 'api/subscrition/list',
  PROFILE_DETAILS: 'api/profile/details',
  WINNING_BID: 'api/mypartrequest/winning',
  BID_REQUEST: 'api/mypartrequest/bids-received/',
  UPDATE_USER_NAME: 'api/profile/update-name',
  UPDATE_PASSWORD: 'api/profile/update-password',
  UPDATE_USER_INFO: 'api/profile/update-profile',
  UPDATE_PROFILE_PHOTO: 'api/profile/update-photo',
  FETCH_PART_REQUEST_FILTER_LIST: 'api/partoffer/filters-list',
  FETCH_BIDDING_OPTIONS: 'api/partoffer/save-bid-options',
  FETCH_PART_REQUEST_LSIT: 'api/partoffer',
  PART_REQUEST_DETAIL: 'api/partoffer/product-details',
  IGNORE_PART_REQUEST: 'api/partoffer/ignore-product/add',
  ADD_PART_REQUEST_TO_WISHLIST: 'api/partoffer/wishlist/add',
  SAVE_BID_MSG_BY_BUYER: 'api/partoffer/save-bid-msg/by-buyer',
  SAVE_BID_MSG_BY_SELLER: 'api/partoffer/save-bid-msg/by-seller',
  SELECT_WINNING_BID: 'api/partoffer/select-winner',
  PROPOSE_NEW_OFFER: 'api/partoffer/save-bid',
  GET_ORDER_RECIEVED_LIST: 'api/orderreceived',
  GET_ORDER_PLACED_LIST: 'api/order',
  GET_ORDER_DETAILS: 'api/orderreceived/details',
  CITY_API: 'api/profile/dropdown-list',

  MY_PART_REQUEST_LIST: 'api/mypartrequest/my-request/',
  CANCEL_MY_PART_REQUEST: 'api/mypartrequest/cancel-a-request-by-buyer',
  GIVE_RATING: 'api/qualifying/add-rating',
  ADD_REMARKS: 'api/orderreceived/update-remark',
  UPDATE_ORDER_STATUS: 'api/orderreceived/change-status',
  LOGOUT_USER: 'api/user/logout'
}

export const API_STATUS_CODE = {
  SUCCESS: 200,
  USER_NOT_EXISTS: 422,
  LOGOUT: 422
}