import { icons } from "./Icons"

export const ScreenNames = {
  CHECK_USER_EXISTANCE: 'check_user_existance',
  LOGIN_SCREEN: 'login_screen',
  SIGNUP_SCREEN: 'signup_screen',
  EMAIL_VERIFICATION: 'email_verification',
  FORGET_PASSWORD: 'forget_password',
  SET_PASSWORD: 'set_password',
  HOME_SCREEN: 'home_screen',
  ACCOUNT_SCREEN: 'account_screen',
  ADD_PART_SCREEN: 'add_part_screen',
  CART_SCREEN: 'cart_screen',
  ASK_OFFER: 'ask_offer_screen',
  PRODUCT_LIST_SCREEN: 'product_list_screen',
  PRODUCT_DETAIL_SCREEN: 'product_detail_screen',
  PROFILE_DETAILS: 'profile_detail_screen',
  RATINGS_SCREEN: 'ratings_screen',
  SUBSCRIPTION_SCREEN: 'subscription_screen',
  PROFILE_SCREEN: 'profile_screen',
  EDIT_PROFILE_SCREEN: 'edit_profile_screen',
  EDIT_NAME_PROFILE_SCREEN: 'edit_name_profile_screen',
  MY_BID_REQUEST_SCREEN: 'my_bid_request_screen',
  WINNING_BID_SCREEN: 'winning_bid_screen',
  PART_REQUEST_SCREEN: 'part_request_screen',
  PART_REQUEST_DETAIL_SCREEN: 'part_request_detail_screen',
  ORDER_RECIEVED_LIST_SCREEN: 'order_recieved_list_screen',
  ORDER_PLACED_LIST_SCREEN: 'order_placed_list_screen',
  WISHLIST_SCREEN: 'wishlist_screen',
  MY_PART_REQUEST_LIST_SCREEN: 'my_part_request_list_screen',
  ORDER_RECEIVED_DETAIL: 'order_received_detail',
  SPLASH_SCREEN: 'splash_screen',
  ORDER_PLACED_DETAIL_SCREEN: 'order_placed_detail_screen',
  NOTIFICATION_LIST_SCREEN: 'notification_list_screen',
  SELLER_PRODUCT_LIST_SCREEN: 'seller_product_list_screen',
  TERMS_OF_CONDITION_SCREEN: 'terms_of_condition_screen'
}

export const StackNames = {
  HOME_STACK: 'home_stack',
  CART_STACK: 'cart_stack',
  ASK_OFFER_STACK: 'ask_offer_stack',
  ADD_PART_STACK: 'add_part_stack',
  ACCOUNT_STACK: 'account_stack',
  BOTTOM_TAB_STACK: 'bottom_tab_stack',
  LOGIN_STACK: 'login_stack',
  PARENT_STACK: 'parent_stack',
}


export const BOTTOM_TAB_CONFIG = {
  [ScreenNames.HOME_SCREEN]: {
    childStackName: StackNames.HOME_STACK,
    displayName: 'Home',
    icon: icons.HOME
  },
  [ScreenNames.ADD_PART_SCREEN]: {
    childStackName: StackNames.ADD_PART_STACK,
    displayName: 'Add Part',
    icon: icons.ADD_PART
  },
  [ScreenNames.CART_SCREEN]: {
    childStackName: StackNames.CART_STACK,
    displayName: 'Cart',
    icon: icons.CART
  },
  [ScreenNames.ASK_OFFER]: {
    childStackName: StackNames.ASK_OFFER_STACK,
    displayName: 'Ask Offer',
    icon: icons.ASK_OFFER
  },
  [ScreenNames.ACCOUNT_SCREEN]: {
    childStackName: StackNames.ACCOUNT_STACK,
    displayName: 'Account',
    icon: icons.ACCOUNT
  }
}