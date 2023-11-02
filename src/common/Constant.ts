import { Dimensions, KeyboardType, Platform } from 'react-native'

import { icons } from './Icons'
import { RatingTypes } from './Interfaces'
import { ScreenNames } from './Screens'

export const INPUT_FIELD_PLAEHOLDERS = {
  Email: 'Enter your Email'
}

export const RETURN_KEY_LABEL = {
  Done: 'Done'
}

export const ReducerName = {
  REGISTER: 'register',
  USER_EXISTANCE: 'userExistance',
  LOADER: 'loader',
  SIGN_UP: 'signUp',
  OTP_VERIFICATION: 'otpVerification',
  LOGIN: 'login',
  ADD_PART: 'addPart',
  HOME: 'home',
  PRODUCT_DETAIL: 'productDetail',
  CART_DETAIL: 'cartDetail',
  ASK_PART: 'askPart',
  RATING: 'rating',
  SUBSCRIPTION: 'subscription'
}


export const FORM_KEYS = {
  USERNAME: 'userName',
  EMAIL: 'email',
  PASSWORD: 'password',
  DEVICE: 'device'
}

export type FormKeys = 'userName' | 'email' | 'password' | 'device'
export type LoginFormKeys = 'userName' | 'password' | 'device'


export const SIGN_UP_FORM = {
  'userName': {
    label: 'Username',
    key: FORM_KEYS.USERNAME,
    apiKey: 'p_user_name',
    inputValue: ''
  },
  'email': {
    label: 'Email',
    key: FORM_KEYS.EMAIL,
    apiKey: 'p_user_email',
    inputValue: ''
  },
  'password': {
    label: 'Password',
    key: FORM_KEYS.PASSWORD,
    inputValue: '',
    secureTextEntry: true,
    apiKey: 'p_user_password'
  },
  'device': {
    label: 'Device',
    key: FORM_KEYS.DEVICE,
    inputValue: Platform.OS,
    editable: false,
    apiKey: 'device'
  }
}

export const LOGIN_FORM = {
  'userName': {
    label: 'Username',
    key: 'userName',
    apiKey: 'username',
    inputValue: ''
  },
  'password': {
    label: 'Password',
    key: 'password',
    apiKey: 'password',
    inputValue: '',
    secureTextEntry: true
  },
  'device': {
    label: 'Password',
    key: 'device',
    apiKey: 'device',
    inputValue: Platform.OS,
    editable: false
  }
}

export enum AddPartFieldKeys {
  NAME = 'name',
  DESCRIPTION = 'detail',
  CATEGORY = 'category',
  IMAGES = 'productSlides',
  VEHICLES = 'vehicles',
  STATUS = 'status',
  PRICE = 'price',
  QUANTITY = 'quantity'
}

export enum InputType {
  TEXT_INPUT = 'textInput',
  DROPDOWN = 'dropDown',
  IMAGES_SELECTION = 'imagesSelection'
}

export const ADD_PART_FORM = {
  [AddPartFieldKeys.NAME]: {
    title: 'What piece are you selling ?',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'product_name',
    key: AddPartFieldKeys.NAME
  },
  [AddPartFieldKeys.DESCRIPTION]: {
    title: 'Description',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    minLines: 4,
    apiKey: 'product_details',
    key: AddPartFieldKeys.DESCRIPTION,
    multiline: true
  },
  [AddPartFieldKeys.CATEGORY]: {
    title: 'Category',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedItem: {},
    selectedValue: '',
    key: AddPartFieldKeys.CATEGORY,
    apiKey: 'product_subcategory'
  },
  [AddPartFieldKeys.IMAGES]: {
    title: 'Photos',
    required: true,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'product_slides',
    key: AddPartFieldKeys.IMAGES
  },
  [AddPartFieldKeys.VEHICLES]: {
    title: 'For what car ?',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: AddPartFieldKeys.VEHICLES,
    apiKey: 'product_vehicles'
  },
  [AddPartFieldKeys.STATUS]: {
    title: 'Status',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: AddPartFieldKeys.STATUS,
    apiKey: 'product_type'
  },
  [AddPartFieldKeys.PRICE]: {
    title: 'Price',
    required: true,
    type: InputType.TEXT_INPUT,
    keyboardType: 'number-pad' as KeyboardType,
    inputValue: '',
    apiKey: 'product_price',
    key: AddPartFieldKeys.PRICE
  },
  [AddPartFieldKeys.QUANTITY]: {
    title: 'Quantity',
    required: true,
    type: InputType.TEXT_INPUT,
    keyboardType: 'number-pad' as KeyboardType,
    inputValue: '',
    apiKey: 'product_qty',
    key: AddPartFieldKeys.QUANTITY
  }
}


export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window')

export const SELL_DROPDOWN_DATA = {
  subcategory: [],
  models: [],
  productType: []
}


export const PICTURE_OPTIONS_KEY =  {
  CAMERA: 'camera',
  GALLERY: 'gallery'
}

export const PICTURE_OPTIONS = [
  {
    label: 'Pick Image',
    icon: icons.GALLERY_ICON,
    key: PICTURE_OPTIONS_KEY.GALLERY
  },
  {
    label: 'Capture',
    icon: icons.CAMERA_ICON,
    key: PICTURE_OPTIONS_KEY.CAMERA
  }
]

export const PROFILE_OPTIONS = [
  {
    label: 'Profile Details',
    icon: icons.PROFILE_ICON,
    screenToNavigate: ScreenNames.PROFILE_DETAILS,
    key: 'profile_details'
  },
  {
    label: 'Order Received',
    icon: icons.ORDER_RECIEVED,
    screenToNavigate: '',
    key: 'order_received'
  },
  {
    label: 'Order Placed',
    icon: icons.ORDER_PLACED,
    screenToNavigate: '',
    key: 'order_placed'
  },
  {
    label: 'Notifications',
    icon: icons.NOTIFICATION,
    screenToNavigate: '',
    key: 'notifications'
  },
  {
    label: 'Wishlist',
    icon: icons.WISHLIST_ICON,
    screenToNavigate: '',
    key: 'wishlist'
  },
  {
    label: 'My Part',
    icon: icons.MY_PART,
    screenToNavigate: '',
    key: 'my_part'
  },
  {
    label: 'My Part Request',
    icon: icons.MY_PART_REQUEST,
    screenToNavigate: '',
    key: 'my_part_request'
  },
  {
    label: 'My Bid Request',
    icon: icons.MY_BID_REQUEST,
    screenToNavigate: '',
    key: 'my_bid_request'
  },
  {
    label: 'Winning Bids',
    icon: icons.WINNING_BIDS,
    screenToNavigate: '',
    key: 'winning_bids'
  },
  {
    label: 'Subscription',
    icon: icons.SUBSCRIPTION,
    screenToNavigate: ScreenNames.SUBSCRIPTION_SCREEN,
    key: 'subscription'
  },
  {
    label: 'Ratings',
    icon: icons.RATINGS,
    screenToNavigate: '',
    key: 'rating'
  },
  {
    label: 'Part Offer',
    icon: icons.PART_OFFER,
    screenToNavigate: '',
    key: 'part_offer'
  },
  {
    label: 'Logout',
    icon: icons.LOGOUT,
    screenToNavigate: '',
    key: 'logout'
  }
]

export enum PartRequestFieldKeys {
  TITILE = 'title',
  DESCRIPTION = 'description',
  IMAGES = 'productSlides',
  VEHICLES = 'vehicles',
  MANUFACTURING_YEAR = 'maufacturingYear',
  ENGINE = 'engine',
  CHASIS = 'chassis',
  DELIVERY_CITY = 'deliveryCity',
  DELIVERY_LOCATION = 'deliveryLocation',
  PRODUCT_TYPE = 'productType',
  PRODUCT_VARIANT = 'productVariant'
}


export const ASK_OFFER_FORM = {
  [PartRequestFieldKeys.TITILE]: {
    title: 'What car part are you looking for?',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_title[0]',
    key: PartRequestFieldKeys.TITILE
  },
  [PartRequestFieldKeys.DESCRIPTION]: {
    title: 'Part code or other details',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_desc[0]',
    key: PartRequestFieldKeys.DESCRIPTION
  },
  [PartRequestFieldKeys.IMAGES]: {
    title: 'Photos',
    required: true,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'partrequest_slides',
    key: AddPartFieldKeys.IMAGES
  },
  [PartRequestFieldKeys.VEHICLES]: {
    title: 'For what car?',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedItem: {},
    selectedValue: '',
    key: PartRequestFieldKeys.VEHICLES,
    apiKey: 'partrequest_vehicle'
  },

  [PartRequestFieldKeys.MANUFACTURING_YEAR]: {
    title: 'Manufacturing year',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.MANUFACTURING_YEAR,
    apiKey: 'partrequest_year'
  },
  [PartRequestFieldKeys.PRODUCT_VARIANT]: {
    title: 'Alternative',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_varient',
    key: PartRequestFieldKeys.PRODUCT_VARIANT
  },
  [PartRequestFieldKeys.ENGINE]: {
    title: 'Engines',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_engines',
    key: PartRequestFieldKeys.ENGINE
  },
  [PartRequestFieldKeys.CHASIS]: {
    title: 'Chassic series',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_chassis',
    key: PartRequestFieldKeys.CHASIS
  },
  [PartRequestFieldKeys.PRODUCT_TYPE]: {
    title: 'Status',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.PRODUCT_TYPE,
    apiKey: 'partrequest_product_type'
  },
  [PartRequestFieldKeys.DELIVERY_CITY]: {
    title: 'Delivery Country/City',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.DELIVERY_CITY,
    apiKey: 'partrequest_delivery_city'
  },
  [PartRequestFieldKeys.DELIVERY_LOCATION]: {
    title: 'Delivery Area/Location',
    required: true,
    type: InputType.TEXT_INPUT,
    inputValue: '',
    apiKey: 'partrequest_delivery_location',
    key: PartRequestFieldKeys.DELIVERY_LOCATION
  }
}

export const RATINGS_TOP_BAR = [{
  key: RatingTypes.PENDING,
  label: 'Pending'
}, {
  key: RatingTypes.GIVEN,
  label: 'Given'
},  {
  key: RatingTypes.RECIEVED,
  label: 'Received'
} ]

export const RATING_API_RESPONSE_MAPPER: Map<RatingTypes, string> = new Map([
  [RatingTypes.PENDING, 'rating_pending'],
  [RatingTypes.GIVEN, 'rating_given'],
  [RatingTypes.RECIEVED, 'ratingReceived']
])
