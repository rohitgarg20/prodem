import { textColor } from "./Colors"
import { icons } from "./Icons"

export const CHECK_USER_EXISTANCE_SCREEN = {
  Heading: 'Welcome to prodem',
  SubHeading: 'Enter your email to login or register',
  Email: 'Email',
  TermsAndCondition: 'Terms and Conditions',
  PrivacyPolicy: 'Privacy Policy',
  SignupBtn: 'Don\'t have an account'
}

export const SIGNUP_SCREEN = {
  Heading: 'Welcome to prodem',
  SubHeading: 'Enter your details to register',
  AlreadyAccount: 'Already have an account'
}

export const LOGIN_SCREEN = {
  Heading: 'Welcome to prodem',
  SubHeading: 'Enter your details to login',
  ForgetPassword: 'Forget Password?'
}

export const OTP_VERIFICATION_SCREEN = {
  OTP_VERIFICATION: 'Email Verification',
  OTP_SEND: 'Enter the 6 digit code that has been sent to ',
  CLICK_HERE: 'Click here',
  RESEND_OTP: 'Resend Code',
  RESEND_OTP_IN: 'Didn\'t recieve OTP code ?',
  EDIT: 'Edit Number'
}

export const BUTTONS = {
  NextBtnText: 'Next',
  RegisterBtn: 'Register',
  Login: 'Login',
  SEND_OTP: 'Send Message',
  VERIFY_OTP: 'Verify & Proceed',
  EDIT_MOBILE_NO: 'Edit',
  SEND: 'Send',
  POST_YOUR_AD: 'Post Your Ad',
  CANCEL: 'Cancel',
  APPLY: 'Apply',
  REQUEST_QUOTE: 'Request A Quote Now',
  IGNORE: 'Ignore',
  LATER: 'Later',
  BIDDING: 'Bidding',
  ADD_OFFER: 'Add Offer',
  ORDER_DETAILS: 'Order Details',
  VIEW_DETAILS: 'View Detail'
}

export const FORGET_PASSWORD = {
  TITLE: 'Forget Password',
  DESCRIPTION: 'Enter your email to recover password',
  EMAIL_PLACEHOLDER: 'example@gmail.com',
  Email: 'Email',
}

export const SET_PASSWORD = {
  TITLE: 'Set Password',
  CREATE_PASSWORD: 'Create new password',
  PASSWORD_LABEL: 'Password *',
  CONFIRM_PASSWORD_LABEL: 'Confirn Password *'
}

export const ADD_PART_SCREEN = {
  headerTitle: 'Add Part'
}

export const ASK_PART_SCREEN = {
  headerTitle: 'Ask Offer'
}

export const CART_COMPONENT = {
  ENTER_QUANTITY: 'Enter Quantity',
  PLACEHOLDER: 'Quantity'
}

export const HOME_SCREEN = {
  HEADER_TITLE: 'Home',
  CATEGORIES: 'CATEGORIES',
  SUBHEADING: 'Popular categories of the month'
}

export const PRODUCT_DETAIL_SCREEN = {
  HEADER_TITLE: 'Product Details',
  ADD_TO_CART: 'Add to Cart',
  REMOVE_FROM_CART: 'Remove from Cart'
}

export const CART_SCREEN = {
  HEADER_TITLE: 'Cart List'
}

export const WISHLIST_SCREEN = {
  HEADER_TITLE: 'Wishlist'
}

export const CART_MESSAGES = {
  ITEM_SUCCESS: 'Product is added to cart',
  REMOVE_SUCCESS: 'Product is removed from cart'
}

export const RATINGS_SCREEN = {
  HEADER_TITLE: 'Ratings',
  ORDER_NO: 'Order No:'
}

export const SUBSCRIPTION_SCREEN = {
  HEADER_TITLE: 'Subscription Plans',
  PRICE: 'Price:',
  QUANTITY: 'Quantity:',
  VALIDITY: 'Validity:'
}

export const PROFILE_SCREEN = {
  HEADER_TITLE: 'Profile Details',
  NAME_LABEL: 'Name',
  ADDRESS_LABEL: 'Address',
  BANK_LABEL: 'Bank',
  COMPANY_LABEL:'Company',
  LAST_LOGIN_LABEL:'Last Login',
  TAX_CODE_LABEL:'Tax Code',
  EDIT_INFO: 'Edit Info'
}

export const EDIT_PROFILE_SCREEN = {
  HEADER_TITLE: 'Edit Profile',
}

export const EDIT_NAME_PROFILE_SCREEN = {
  HEADER_TITLE: 'Edit Profile',
  EDIT_PERSONAL_INFO_HEADER: 'Edit Personal Info',
  NAME_LABEL: 'Name',
  SAVE_BUTTON: 'SAVE',
  CHANGE_PASSWORD_HEADER: 'Change Password',
  CHANGE_PASSWORD_SUBHEADER: 'To reset your password, enter your current password and the new password below',
  CURRENT_PASSWORD_LABEL: 'Current Password',
  NEW_PASSWORD_LABEL: 'New Password',
  RESET_BUTTON: 'RESET'
}

export const BID_REQUEST_SCREEN = {
  HEADER_TITLE: 'My Bid Request',
}

export const WINNING_BID_SCREEN = {
  HEADER_TITLE: 'Winning Bid',
}

export const BID_COMPONENT_LABEL = {
  BID_ID_LABEL : 'Bid ID',
  USER_ID_LABEL: 'User ID',
  BID_TITLE: 'Bid Title',
  BID_REMARK: 'Bid Remark',
  BID_PRICE: 'Bid Price',
  BID_CREATED_AT: 'Bid Created At',
  PART_REQUEST_TITLE: 'Part Request Title',
  PART_REQUEST_VEHICLE: 'Part Request Vehicle',
  PART_REQUEST_YEAR: 'Part Request Year',
  PART_REQUEST_VERIANT: 'Part Request Veriant',
  PART_REQUEST_ENGINE: 'Part Request Engine',
  PART_REQUEST_DELIVERY_LOCATION: 'Part Request Delivery Location',
  PART_REQUEST_CREATED_AT: 'Part Request Created At',
  COMPANY_NAME: 'Company Name',
  COMPANY_TRADE: 'Company Trade'
}

export const PART_REQUEST_SCREEN = {
  HEADER_TITLE: 'Car Parts Request',
  IAM_LOOING: `I'm just looking for car parts `,
  COMPANY_DETAILS: 'Company Details',
  OFFER_FROM: 'Offer from',
  SELECT_WINNING: 'Select as Winning Bid',
  COMPANY: 'Company',
  WARRANTY: 'Warranty',
  STARE: 'Stare',
  DELIVERY_COST: 'Delivery cost estimated',
  DELIVERY_COST_VALUE: '$10.91 by courier Lifting from the headquarters',
  OFFERED_BY: 'Offered By',
  COMPLIANCE: 'Guarantee compliance',
  COMPLIANCE_DURATION: '12 months',
  RETURN: 'Return',
  RETURN_DURATION: '14 days',
  PROPOSE_OFFER_FORM: 'Propose an offer',
  REQUEST_STATUS_IS: 'Request status is :'
}

export const PART_REQUEST_DETAIL_SCREEN = {
  HEADER_TITLE: 'Part Detail'
}

export enum PartTypesButton {
  PROPOSE_OFFER = 'proposeOffer',
  OFFER_LATER =  'offerLater',
  IGNORE_REQUEST = 'ignoreRequest'
}

export const PART_REQUEST_BUTTONS = {
  [PartTypesButton.PROPOSE_OFFER]: {
    icon: icons.EDIT_ICON,
    label: 'Propose an offer',
    color: textColor.white,
    key: PartTypesButton.PROPOSE_OFFER
  },
  [PartTypesButton.OFFER_LATER]: {
    icon: icons.TIMER_ICON,
    label: 'Offer Later',
    color: textColor.black,
    key: PartTypesButton.OFFER_LATER
  },
  [PartTypesButton.IGNORE_REQUEST]: {
    icon: icons.DELETE_ICON,
    label: 'Ignore the request',
    color: textColor.black,
    key: PartTypesButton.IGNORE_REQUEST
  }

}

export const ORDER_RECIEVED = {
  HEADER_TITLE: 'Order Received'
}


export const ORDER_PLACED = {
  HEADER_TITLE: 'My Orders'
}

export const MY_PART_REQUEST_LIST_SCREEN = {
  HEADER_TITLE: 'My Part Request'
}
