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
  SUBSCRIPTION: 'subscription',
  PROFILE: 'profile',
  WINNING_BID: 'winningBid',
  BID_REQUEST: 'bidRequest',
  PART_REQUEST: 'carPartRequests',
  PART_REQUEST_DETAIL: 'part_request_detail',
  ORDER_RECIEVED: 'order_recieved',
  ORDER_PLACED: 'order_placed',
  WISHLIST: 'wishList',
  MY_PART_REQUEST_LIST: 'myPartRequestList',
  ORDER_RECEIVED_DETAIL: 'orderReceivedDetail',
  ORDER_PLACED_DETAIL: 'orderPlacedDetail',
  NOTIFICATION_LIST: 'notificationList',
  SELLER_ADS_REDUCER: 'SellerAdsReducer',
  BOTTOM_TAB_BAR: 'bottom_tab_bar'
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
    label: 'Device',
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
    multiSelectedDropDownItem: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: AddPartFieldKeys.VEHICLES,
    apiKey: 'product_vehicles',
    isListMultiSelect: true
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
    screenToNavigate: ScreenNames.PROFILE_SCREEN,
    key: 'profile_details'
  },
  {
    label: 'Order Received',
    icon: icons.ORDER_RECIEVED,
    screenToNavigate: ScreenNames.ORDER_RECIEVED_LIST_SCREEN,
    key: 'order_received'
  },
  {
    label: 'Order Placed',
    icon: icons.ORDER_PLACED,
    screenToNavigate: ScreenNames.ORDER_PLACED_LIST_SCREEN,
    key: 'order_placed'
  },
  {
    label: 'Notifications',
    icon: icons.NOTIFICATION,
    screenToNavigate: ScreenNames.NOTIFICATION_LIST_SCREEN,
    key: 'notifications'
  },
  {
    label: 'Wishlist',
    icon: icons.WISHLIST_ICON,
    screenToNavigate: ScreenNames.WISHLIST_SCREEN,
    key: 'wishlist'
  },
  {
    label: 'My Ads',
    icon: icons.MY_PART,
    screenToNavigate: ScreenNames.SELLER_PRODUCT_LIST_SCREEN,
    key: 'my_ads'
  },
  {
    label: 'My Part Request',
    icon: icons.MY_PART_REQUEST,
    screenToNavigate: ScreenNames.MY_PART_REQUEST_LIST_SCREEN,
    key: 'my_part_request'
  },
  {
    label: 'My Bid Request',
    icon: icons.MY_BID_REQUEST,
    screenToNavigate: ScreenNames.MY_BID_REQUEST_SCREEN,
    key: 'my_bid_request'
  },
  {
    label: 'Winning Bids',
    icon: icons.WINNING_BIDS,
    screenToNavigate: ScreenNames.WINNING_BID_SCREEN,
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
    screenToNavigate: ScreenNames.RATINGS_SCREEN,
    key: 'rating'
  },
  {
    label: 'Part Request',
    icon: icons.PART_OFFER,
    screenToNavigate: ScreenNames.PART_REQUEST_SCREEN,
    key: 'part_request'
  },
  {
    label: 'Logout',
    icon: icons.LOGOUT,
    screenToNavigate: 'logout',
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

export enum ProposeOfferFieldKeys {
  TITILE = 'title',
  PRICE = 'price',
  CURRENCY = 'currency',
  UNIT = 'unit',
  PRIVATE_REMARKS = 'privateRemarks',
  OFFERED_BY = 'offeredBy',
  AVAILABILITY = 'availability',
  IMAGES = 'productSlides'
}

export const PROPOSE_OFFER_FORM = {
  [ProposeOfferFieldKeys.TITILE]: {
    title: 'The Piece offered',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'title',
    key: PartRequestFieldKeys.TITILE,
    placeholder: 'ex: Dacia Logan red front bar without scratches'
  },
  [ProposeOfferFieldKeys.PRICE]: {
    title: 'Price with VAT',
    required: true,
    type: InputType.TEXT_INPUT,
    keyboardType: 'number-pad' as KeyboardType,
    inputValue: '',
    apiKey: 'price',
    key: ProposeOfferFieldKeys.PRICE
  },
  [ProposeOfferFieldKeys.CURRENCY]: {
    title: '$',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.CURRENCY,
    apiKey: 'currency'
  },
  [ProposeOfferFieldKeys.UNIT]: {
    title: 'U.M.',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.UNIT,
    apiKey: 'unit'
  },
  [ProposeOfferFieldKeys.PRIVATE_REMARKS]: {
    title: 'Private Remarks',
    required: false,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'remark',
    key: ProposeOfferFieldKeys.PRIVATE_REMARKS,
    placeholder: 'Only you see them'
  },
  [ProposeOfferFieldKeys.OFFERED_BY]: {
    title: 'Offered by',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.OFFERED_BY,
    apiKey: 'type'
  },
  [ProposeOfferFieldKeys.AVAILABILITY]: {
    title: 'Availability',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'Not Selected',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.AVAILABILITY,
    apiKey: 'availavility'
  },
  [ProposeOfferFieldKeys.IMAGES]: {
    title: 'Images',
    required: false,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'product_slides',
    key: ProposeOfferFieldKeys.IMAGES
  },
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

export const WINNING_BIDS_TOP_BAR_KEYS = [{
  key: 'new',
  value: 'New'
},
{
  key: 'confirm',
  value: 'Confirm'
},
{
  key: 'deliverd',
  value: 'Delivered'
},
{
  key: 'completed',
  value: 'Completed'
},
{
  key: 'cancel',
  value: 'Cancelled'
}]

export const MY_BIDS_REQUEST_TOP_BAR_KEYS = [{
  key: 'active',
  value: 'Active'
},
{
  key: 'inactive',
  value: 'InActive'
},
{
  key: 'lost',
  value: 'Lost'
}]

export const PART_REQUEST_TYPE = {
  CANCELLED: 'cancelled',
  RESOLVED: 'resolved',
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}

export const PART_REQUEST_STATUS = {
  1: PART_REQUEST_TYPE.RESOLVED,
  2: PART_REQUEST_TYPE.ACTIVE,
  3: PART_REQUEST_TYPE.INACTIVE,
  4: PART_REQUEST_TYPE.CANCELLED
}

export const PART_REQUEST_STR_VALUE = {
  1: 'Resolved requests',
  2: PART_REQUEST_TYPE.ACTIVE,
  3: PART_REQUEST_TYPE.INACTIVE,
  4: 'Cancelled requests'
}

export type OrderType = 0 | 1 | 2 | 3 | 4 | 5


export const OrderReceivedTypeList = [
  {
    label: 'New',
    key: 2
  },
  {
    label: 'Suspended',
    key: 3
  },
  {
    label: 'Completed',
    key: 1
  },
  {
    label: 'Rejected',
    key: 4
  },
  {
    label: 'Cancelled',
    key: 5
  },
  {
    label: 'All',
    key: 0
  }
]

export const updateOrderStatusOptions = [
  {
    value: 'Completed',
    id: 1
  },
  {
    value: 'Suspended',
    id: 3
  },
  {
    value: 'Rejected',
    id: 4
  }
]

export const partRequestStatusTypeList = [
  {
    label: 'Requests',
    key: 'requests'
  },
  {
    label: 'Cancelled',
    key: 'cancled'
  },
  {
    label: 'Resolved',
    key: 'solved'
  }
]

export const ratingsData = [
  {
    key: 3,
    value: 'Positive',
    icon: icons.HAPPY,
    tintColor: '#00A040'
  },
  {
    key: 2,
    value: 'Neutral',
    icon: icons.NEUTRAL,
    tintColor: '#606060'
  },
  {
    key: 1,
    value: 'Negative',
    icon: icons.SAD,
    tintColor: '#D00000'
  },
]

export const sortByFilters = [
  {
    id: 'price-asc-asc',
    value: 'Price (Low to High)'
  },
  {
    id: 'price-desc-desc',
    value: 'Price (High to Low)'
  }
]

export const isIos = Platform.OS === 'ios'
