import { Dimensions, KeyboardType, Platform } from 'react-native'

import { textColor } from './Colors'
import { icons } from './Icons'
import { RatingTypes } from './Interfaces'
import { ScreenNames } from './Screens'

export const RETURN_KEY_LABEL = {
  Done: 'MultiLanguageString.Done'
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
    label: 'MultiLanguageString.Username',
    key: FORM_KEYS.USERNAME,
    apiKey: 'p_user_name',
    inputValue: ''
  },
  'email': {
    label: 'MultiLanguageString.Email',
    key: FORM_KEYS.EMAIL,
    apiKey: 'p_user_email',
    inputValue: ''
  },
  'password': {
    label: 'MultiLanguageString.Password',
    key: FORM_KEYS.PASSWORD,
    inputValue: '',
    secureTextEntry: true,
    apiKey: 'p_user_password'
  },
  'device': {
    label: 'MultiLanguageString.Device',
    key: FORM_KEYS.DEVICE,
    inputValue: Platform.OS,
    editable: false,
    apiKey: 'device'
  }
}

export const LOGIN_FORM = {
  'userName': {
    label: 'MultiLanguageString.Username',
    key: 'userName',
    apiKey: 'username',
    inputValue: ''
  },
  'password': {
    label: 'MultiLanguageString.Password',
    key: 'password',
    apiKey: 'password',
    inputValue: '',
    secureTextEntry: true
  },
  'device': {
    label: 'MultiLanguageString.Device',
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
    title: 'MultiLanguageString.EHAT_PIECE',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'product_name',
    key: AddPartFieldKeys.NAME
  },
  [AddPartFieldKeys.DESCRIPTION]: {
    title: 'MultiLanguageString.Description',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    minLines: 4,
    apiKey: 'product_details',
    key: AddPartFieldKeys.DESCRIPTION,
    multiline: true
  },
  [AddPartFieldKeys.CATEGORY]: {
    title: 'MultiLanguageString.Category',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedItem: {},
    selectedValue: '',
    key: AddPartFieldKeys.CATEGORY,
    apiKey: 'product_subcategory'
  },
  [AddPartFieldKeys.IMAGES]: {
    title: 'MultiLanguageString.PHOTOS',
    required: true,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'product_slides',
    key: AddPartFieldKeys.IMAGES
  },
  [AddPartFieldKeys.VEHICLES]: {
    title: 'MultiLanguageString.FOR_WHAT_CAR',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    multiSelectedDropDownItem: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: AddPartFieldKeys.VEHICLES,
    apiKey: 'product_vehicles',
    isListMultiSelect: true,
    multiSelectedDropDownItemNames: []
  },
  [AddPartFieldKeys.STATUS]: {
    title: 'MultiLanguageString.STATUS',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: AddPartFieldKeys.STATUS,
    apiKey: 'product_type'
  },
  [AddPartFieldKeys.PRICE]: {
    title: 'MultiLanguageString.PRICE_W_S',
    required: true,
    type: InputType.TEXT_INPUT,
    keyboardType: 'number-pad' as KeyboardType,
    inputValue: '',
    apiKey: 'product_price',
    key: AddPartFieldKeys.PRICE
  },
  [AddPartFieldKeys.QUANTITY]: {
    title: 'MultiLanguageString.QUANTITY',
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
  CAMERA: 'MultiLanguageString.camera',
  GALLERY: 'MultiLanguageString.gallery'
}

export const PICTURE_OPTIONS = [
  {
    label: 'MultiLanguageString.pick_img',
    icon: icons.GALLERY_ICON,
    key: PICTURE_OPTIONS_KEY.GALLERY
  },
  {
    label: 'MultiLanguageString.Capture',
    icon: icons.CAMERA_ICON,
    key: PICTURE_OPTIONS_KEY.CAMERA
  }
]


export const PROFILE_OPTIONS = [
  {
    label: 'MultiLanguageString.PD',
    icon: icons.PROFILE_ICON,
    screenToNavigate: ScreenNames.PROFILE_SCREEN,
    key: 'profile_details'
  },
  {
    label: 'MultiLanguageString.OR',
    icon: icons.ORDER_RECIEVED,
    screenToNavigate: ScreenNames.ORDER_RECIEVED_LIST_SCREEN,
    key: 'order_received'
  },
  {
    label: 'MultiLanguageString.OP',
    icon: icons.ORDER_PLACED,
    screenToNavigate: ScreenNames.ORDER_PLACED_LIST_SCREEN,
    key: 'order_placed'
  },
  {
    label: 'MultiLanguageString.N',
    icon: icons.NOTIFICATION,
    screenToNavigate: ScreenNames.NOTIFICATION_LIST_SCREEN,
    key: 'notifications'
  },
  {
    label: 'MultiLanguageString.Wishlist',
    icon: icons.WISHLIST_ICON,
    screenToNavigate: ScreenNames.WISHLIST_SCREEN,
    key: 'wishlist'
  },
  {
    label: 'MultiLanguageString.MY_ADS',
    icon: icons.MY_PART,
    screenToNavigate: ScreenNames.SELLER_PRODUCT_LIST_SCREEN,
    key: 'my_ads'
  },
  {
    label: 'MultiLanguageString.MPR',
    icon: icons.MY_PART_REQUEST,
    screenToNavigate: ScreenNames.MY_PART_REQUEST_LIST_SCREEN,
    key: 'my_part_request'
  },
  {
    label: 'MultiLanguageString.MBR',
    icon: icons.MY_BID_REQUEST,
    screenToNavigate: ScreenNames.MY_BID_REQUEST_SCREEN,
    key: 'my_bid_request'
  },
  {
    label: 'MultiLanguageString.WB',
    icon: icons.WINNING_BIDS,
    screenToNavigate: ScreenNames.WINNING_BID_SCREEN,
    key: 'winning_bids'
  },
  {
    label: 'MultiLanguageString.SUBS',
    icon: icons.SUBSCRIPTION,
    screenToNavigate: ScreenNames.SUBSCRIPTION_SCREEN,
    key: 'subscription'
  },
  {
    label: 'MultiLanguageString.Ratings',
    icon: icons.RATINGS,
    screenToNavigate: ScreenNames.RATINGS_SCREEN,
    key: 'rating'
  },
  {
    label: 'MultiLanguageString.PART_REQUEST',
    icon: icons.PART_OFFER,
    screenToNavigate: ScreenNames.PART_REQUEST_SCREEN,
    key: 'part_request'
  },
  {
    label: 'MultiLanguageString.LOGOUT',
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
    title: 'MultiLanguageString.WCLF',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_title[0]',
    key: PartRequestFieldKeys.TITILE
  },
  [PartRequestFieldKeys.DESCRIPTION]: {
    title: 'MultiLanguageString.PCD',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_desc[0]',
    key: PartRequestFieldKeys.DESCRIPTION
  },
  [PartRequestFieldKeys.IMAGES]: {
    title: 'MultiLanguageString.Photos',
    required: true,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'partrequest_slides',
    key: AddPartFieldKeys.IMAGES
  },
  [PartRequestFieldKeys.VEHICLES]: {
    title: 'MultiLanguageString.FWC',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedItem: {},
    selectedValue: '',
    key: PartRequestFieldKeys.VEHICLES,
    apiKey: 'partrequest_vehicle'
  },

  [PartRequestFieldKeys.MANUFACTURING_YEAR]: {
    title: 'MultiLanguageString.MY',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.MANUFACTURING_YEAR,
    apiKey: 'partrequest_year'
  },
  [PartRequestFieldKeys.PRODUCT_VARIANT]: {
    title: 'MultiLanguageString.Alternative',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_varient',
    key: PartRequestFieldKeys.PRODUCT_VARIANT
  },
  [PartRequestFieldKeys.ENGINE]: {
    title: 'MultiLanguageString.Engines',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_engines',
    key: PartRequestFieldKeys.ENGINE
  },
  [PartRequestFieldKeys.CHASIS]: {
    title: 'MultiLanguageString.CS',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'partrequest_chassis',
    key: PartRequestFieldKeys.CHASIS
  },
  [PartRequestFieldKeys.PRODUCT_TYPE]: {
    title: 'MultiLanguageString.Status',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.PRODUCT_TYPE,
    apiKey: 'partrequest_product_type'
  },
  [PartRequestFieldKeys.DELIVERY_CITY]: {
    title: 'MultiLanguageString.DCC',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: PartRequestFieldKeys.DELIVERY_CITY,
    apiKey: 'partrequest_delivery_city'
  },
  [PartRequestFieldKeys.DELIVERY_LOCATION]: {
    title: 'MultiLanguageString.DAL',
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
    title: 'MultiLanguageString.TPO',
    required: true,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'title',
    key: PartRequestFieldKeys.TITILE,
    placeholder: 'MultiLanguageString.TPOP'
  },
  [ProposeOfferFieldKeys.PRICE]: {
    title: 'MultiLanguageString.PWV',
    required: true,
    type: InputType.TEXT_INPUT,
    keyboardType: 'number-pad' as KeyboardType,
    inputValue: '',
    apiKey: 'price',
    key: ProposeOfferFieldKeys.PRICE
  },
  [ProposeOfferFieldKeys.CURRENCY]: {
    title: 'MultiLanguageString.DOLLAR',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.CURRENCY,
    apiKey: 'currency'
  },
  [ProposeOfferFieldKeys.UNIT]: {
    title: 'MultiLanguageString.UM',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.UNIT,
    apiKey: 'unit'
  },
  [ProposeOfferFieldKeys.PRIVATE_REMARKS]: {
    title: 'MultiLanguageString.PR',
    required: false,
    inputValue: '',
    type: InputType.TEXT_INPUT,
    apiKey: 'remark',
    key: ProposeOfferFieldKeys.PRIVATE_REMARKS,
    placeholder: 'MultiLanguageString.PRP'
  },
  [ProposeOfferFieldKeys.OFFERED_BY]: {
    title: 'MultiLanguageString.OB',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.OFFERED_BY,
    apiKey: 'type'
  },
  [ProposeOfferFieldKeys.AVAILABILITY]: {
    title: 'MultiLanguageString.AVAIL',
    required: true,
    type: InputType.DROPDOWN,
    dropdownData: [],
    defaultValue: 'MultiLanguageString.NOT_SELECTED',
    selectedValue: '',
    selectedItem: {},
    key: ProposeOfferFieldKeys.AVAILABILITY,
    apiKey: 'availavility'
  },
  [ProposeOfferFieldKeys.IMAGES]: {
    title: 'MultiLanguageString.Images',
    required: false,
    type: InputType.IMAGES_SELECTION,
    maxPhotos: 5,
    selectedImages: [],
    apiKey: 'product_slides',
    key: ProposeOfferFieldKeys.IMAGES
  }
}

export const RATINGS_TOP_BAR = [{
  key: RatingTypes.PENDING,
  label: 'MultiLanguageString.Pending'
}, {
  key: RatingTypes.GIVEN,
  label: 'MultiLanguageString.Given'
},  {
  key: RatingTypes.RECIEVED,
  label: 'MultiLanguageString.Received'
} ]

export const RATING_API_RESPONSE_MAPPER: Map<RatingTypes, string> = new Map([
  [RatingTypes.PENDING, 'rating_pending'],
  [RatingTypes.GIVEN, 'rating_given'],
  [RatingTypes.RECIEVED, 'ratingReceived']
])

export const WINNING_BIDS_TOP_BAR_KEYS = [{
  key: 'new',
  value: 'MultiLanguageString.New'
},
{
  key: 'confirm',
  value: 'MultiLanguageString.Confirm'
},
{
  key: 'deliverd',
  value: 'MultiLanguageString.Delivered'
},
{
  key: 'completed',
  value: 'MultiLanguageString.Completed'
},
{
  key: 'cancel',
  value: 'MultiLanguageString.Cancelled'
}]

export const MY_BIDS_REQUEST_TOP_BAR_KEYS = [{
  key: 'active',
  value: 'MultiLanguageString.Active'
},
{
  key: 'inactive',
  value: 'MultiLanguageString.InActive'
},
{
  key: 'lost',
  value: 'MultiLanguageString.Lost'
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
  1: 'MultiLanguageString.RESOLVED_REQ',
  2: 'MultiLanguageString.ACTIVE',
  3: 'MultiLanguageString.INACTIVE',
  4: 'MultiLanguageString.CR'
}

export type OrderType = 0 | 1 | 2 | 3 | 4 | 5


export const OrderReceivedTypeList = [
  {
    label: 'MultiLanguageString.New',
    key: 2
  },
  {
    label: 'MultiLanguageString.Suspended',
    key: 3
  },
  {
    label: 'MultiLanguageString.Completed',
    key: 1
  },
  {
    label: 'MultiLanguageString.Rejected',
    key: 4
  },
  {
    label: 'MultiLanguageString.Cancelled',
    key: 5
  },
  {
    label: 'MultiLanguageString.All',
    key: 0
  }
]

export const updateOrderStatusOptions = [
  {
    value: 'MultiLanguageString.Completed',
    id: 1
  },
  {
    value: 'MultiLanguageString.Suspended',
    id: 3
  },
  {
    value: 'MultiLanguageString.Rejected',
    id: 4
  }
]

export const partRequestStatusTypeList = [
  {
    label: 'MultiLanguageString.RequestsC',
    key: 'requests'
  },
  {
    label: 'MultiLanguageString.Cancelled',
    key: 'cancled'
  },
  {
    label: 'MultiLanguageString.Resolved',
    key: 'solved'
  }
]

export const ratingsData = [
  {
    key: 3,
    value: 'MultiLanguageString.POSITIVE',
    icon: icons.HAPPY,
    tintColor: '#00A040'
  },
  {
    key: 2,
    value: 'MultiLanguageString.NEUTRAL',
    icon: icons.NEUTRAL,
    tintColor: '#606060'
  },
  {
    key: 1,
    value: 'MultiLanguageString.NEGATIVE',
    icon: icons.SAD,
    tintColor: '#D00000'
  }
]

export const sortByFilters = [
  {
    id: 'price-asc-asc',
    value: 'MultiLanguageString.PLH'
  },
  {
    id: 'price-desc-desc',
    value: 'MultiLanguageString.PHL'
  }
]

export const isIos = Platform.OS === 'ios'

export enum PartTypesButton {
  PROPOSE_OFFER = 'proposeOffer',
  OFFER_LATER =  'offerLater',
  IGNORE_REQUEST = 'ignoreRequest'
}

export const PART_REQUEST_BUTTONS = {
  [PartTypesButton.PROPOSE_OFFER]: {
    icon: icons.EDIT_ICON,
    label: 'PART_REQUEST_SCREEN.PROPOSE_OFFER_FORM',
    color: textColor.white,
    key: PartTypesButton.PROPOSE_OFFER
  },
  [PartTypesButton.OFFER_LATER]: {
    icon: icons.TIMER_ICON,
    label: 'PART_REQUEST_SCREEN.OFFER_LATER',
    color: textColor.black,
    key: PartTypesButton.OFFER_LATER
  },
  [PartTypesButton.IGNORE_REQUEST]: {
    icon: icons.DELETE_ICON,
    label: 'PART_REQUEST_SCREEN.ITR',
    color: textColor.black,
    key: PartTypesButton.IGNORE_REQUEST
  }

}

export const LanguagesAvailable = [
  {
    name: 'English $',
    value: 'English $',
    id: 'en'
  },
  {
    name: 'Deutsch €',
    value: 'Deutsch €',
    id: 'de'
  },
  {
    name: 'Italiano €',
    value: 'Italiano €',
    id: 'it'
  },
  {
    name: 'Română lei',
    value: 'Română lei',
    id: 'ro'
  }
]

export const RonToCurrency = {
  'en': {
    currency: '$',
    price: 0.21922174
  },
  'de': {
    currency: '€',
    price: 0.20110509
  },
  'it': {
    currency: '€',
    price: 0.20110509
  },
  'ro': {
    currency: 'lei',
    price: 1
  }
}