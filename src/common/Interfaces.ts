import { KeyboardType, PressableProps, StyleProp, TextInputProps, TextProps, TextStyle, ViewStyle } from 'react-native'
import { FastImageProps } from 'react-native-fast-image'

import { AddPartFieldKeys, InputType, OrderType, PartRequestFieldKeys } from './Constant'
import { ButtonType } from './Enumerators'

export interface ICustomText extends TextProps {
  text?: string
  fontSize?: number
  lineHeight?: number
  textStyle?: StyleProp<TextStyle>
  color?: string
  isAnimated?: boolean
  fontWeight?: string
}

export interface ITextInputComponent extends TextInputProps {
  label?: string
  labelSize?: number
  labelColor?: string
  labelStyle?: StyleProp<TextStyle>
  textFieldKey?: string
  onChangeUserInput?: (fieldKey: string, value: string) => void
  textInputRef?: (inputRef: any) => void
  textInputType?: 'roundedCorners' | 'default'
  textContainerStyle?: StyleProp<ViewStyle>
}

export interface IButtonComponent extends PressableProps {
  text: string
  fontSize?: number
  lineHeight?: number
  textStyle?: StyleProp<TextStyle>
  color?: string
  isAnimated?: boolean
  fontWeight?: string
  buttonType?: ButtonType
  buttonContainerStyle?: StyleProp<ViewStyle>
  rightContainer?: React.JSX.Element
}

export interface IconWrapperComponent extends FastImageProps {
  iconHeight: number | string
  iconWidth: number | string
  iconSource: number | string
}

export interface IIconButtonWrapper extends IconWrapperComponent {
  onPressIcon: () => void
  buttonContainerStyle?: StyleProp<ViewStyle>
  isDisabled?: boolean
  hitSlopTouchable?: number
}

export interface ICrossButtonComponent extends IIconButtonWrapper {

}

export interface IPasswordVisibleComponent extends IIconButtonWrapper {
  isPasswordVisible?: boolean
}


export interface IUserFormItem {
  label: string
  key: string
  inputValue: string
  secureTextEntry?: boolean
  editable?: boolean
  apiKey: string
}

export interface IBackButtonComponent {
  onPressBackBtn?: () => void
  headerLabel?: string
  textStyle?: TextStyle
  backContainerStyle?: StyleProp<ViewStyle>
}

export interface IHeaderComponent {
  backgroundColor?: string
  title?: string
  showRefreshButton?: boolean
  onPressRefreshButton?: () => void
  customHeaderStyle?: StyleProp<ViewStyle>
  showBackBtn?: boolean
  onPress?: () => void
  showInCenter?: boolean
  showEndContainer?: boolean
}

export interface IFormField {
  title: string
  required: boolean
  inputValue?: string
  type: InputType
  apiKey: string
  multiline?: boolean
  key: string
  dropdownData?: IDropDownItem[] | []
  keyboardType?: KeyboardType
  defaultValue?: string
  selectedItem?: IDropDownItem
  selectedImages?: IImageItem[]
  placeholder?: string
  apiValue?: string
}

export interface IAddPartForm {
  formData: Record<AddPartFieldKeys, IFormField>
  editProductId?: number
}

export interface IAskPartForm {
  formData: Record<PartRequestFieldKeys, IFormField>
}
export interface ICategoriesData {
  category_id: number
  category_name: string
  category_image: string
  category_status: string
  category_display_home: string
  category_created_at: string
  category_updated_at: string
  subcatgory: ISubCategories[]
}

export interface ISubCategories {
  id: number
  value: string
}

export interface IBrands {
  brand_id: number
  brand_name: string
  brand_image: string
  brand_status: number
  brand_display_home: string
  brand_created_at: string
  brand_updated_at: string
  vehicle: IVehicles[]
}

export interface IVehicles {
  vehicle_id: number
  vehicle_brand: string
  vehicle_name: string
  vehicle_image: string
  vehicle_status: string
  vehicle_display_home: string
  vehicle_created_at: string
  vehicle_updated_at: string
}

export interface IHomeData {
  categories: ICategoriesData[]
  models: IBrands[]
}

export interface IDropDownItem {
  id?: number | string
  value?: number | string
}

export interface ISellDropDownData {
  subcategory: IDropDownItem[]
  models: IDropDownItem[]
  productType: IDropDownItem[]
}

export interface IVehicleDropDownItem {
  vehicle_id: number
  vehicle_brand: number
  vehicle_name: string
  vehicle_image: string
  vehicle_status: number
}

export interface IPartRequestDropDownData {
  partrequest_vehicle: IVehicleDropDownItem[]
  partrequest_year: IDropDownItem[]
  partrequest_product_type: IDropDownItem[]
  partrequest_delivery_city: IDropDownItem[]
}

export interface IImageItem {
  base64: string
  type?: string
  uri?: string
  index?: any
  imgUrl?: string
}

export interface ICameraComponent {
  onSavePicture: ({ images }: { images: IImageItem[] }) => void
  onDismiss: () => void
  maxAllowedImages?: number
}

export interface IOptionIconWithLabelData {
  icon: string
  label: string
  key: string
}

export interface IOptionIconWithLabelComponent {
  icon: string
  label: string
  itemKey: string
  onPressItem: (optionData: IOptionIconWithLabelData) => void
  containerStyle?: StyleProp<ViewStyle>
  tintColor?: string
  textStyleContainer?: StyleProp<TextStyle>
}

export interface ICartItemComponent {
  productId: number
  productName: string
  displayPrice: string
  productImage: string
  quantity: number
  cartId: number
  onRemoveItemFromCart?: (productId: number) => void
  updateCartQty: (productId: number, qty: number) => void
  qtyNonEditable?: boolean
}

export interface ICartListComponent {
  cartItemsList: ICartItemComponent[]
}

export interface ICategoryCardComponent {
  categoryId: number
  categoryName: string
  categoryImage: string
  onPress?: (categoryId: number) => void
}

export interface IProductCardComponent {
  productId: number
  productName: string
  productSubCategory: number
  displayPrice: string
  quantity: number
  productImage: string
  productViews: number
  companyLogo: string
  companyName: string
  onPressProductCard?: (productId: number) => void
  productDescription?: string
  categoryName?: string
  subcategoryName?: string
  subCategoryId?: number
  productType?: number
  productSlides?: string[]
}

export interface IProductDetailScreen {
  productId: number
  productImage: string
  productName: string
  displayPrice: string
  actualPrice: string
  productViews: string
  imageGallery: string[]
  color: string
  type: string
  brand: string
  createdAt: string
  userMobile: string
  description: string
  isProductByLoogedInUser: boolean
}

export interface IProfileOptionItem {
  label: string
  icon: number
  screenToNavigate: string
  key: string
}

export interface ITopTabBarItem {
  label: string
  key: any
}

export enum RatingTypes {
  PENDING = 'rating-pending',
  GIVEN = 'rating-given',
  RECIEVED = 'rating-received'
}

export interface IRatingCard {
  orderNo: string
  orderDate: string
  ratingDesc: string
  ratingStar: number
  isRatingPending: boolean
  userName: string
  ratingType: string
  orderId: string
  navigateToOrderReceivedScreen?: (orderId) => void
}

export interface ISubscriptionCard {
  subscriptionId: number
  name: string
  price: string
  quantity: string
  validity: string
  multiSubscription: {
    label?: string
    value?: string
    id?: number
  }[]
  btnBackgroundColor: string
}

export interface IPartRequestCardComponent {
  title: string
  description: string
  uploadedDate: string
  partRequestId: number
  navigateToDetailScreen?: (partRequestId: number) => void
  onPressWishlistButton?: (partRequestId: number) => void
  onPressIgnoreButton?: (partRequestId: number) => void
}

export interface IPartRequestBasicDetail {
  heading: string
  // to form heading
  partrequest_title: string
  brand_name: string
  partrequest_year: number
  vehicle_name: string

  // address detail
  addressInfo: string
  country_name: string
  city_name: string
  partrequest_delivery_location: string

  // description
  description: string
  partrequest_desc: string


  // uploaded date
  uploadedDate: string

  // images gallery
  imageGallery: string[]

  partRequestStatus: number
  isPostByLoggedInUser: boolean
  dealsCount?: string
  partRequestId: number

}

export interface ICompanyDetail {
  companyLogo: string
  companyName: string
  companyFiscal: string
  companyAddressStreet: string
}

export interface IBidDetail {
  companyName: string
  bidUserId: number
  isWinningBid: boolean
  description: string
  price: number
  currency: string
  bidUnit: string
  requestStatus: string
  productType: string
  messages: {
    text: string
    createdAt: string
    userType: string
  }[]
  displayPrice: string
  availability: string
  bidId: number
  partRequestId: number
  bidImagesSlides: string[] | number[]
}

export interface IPartRequestDetail {
  requestSlides: string[]
  heading: string
  // to form heading
  partrequest_title: string
  brand_name: string
  partrequest_year: number
  vehicle_name: string

  // addressInfo: string
  country_name: string
  city_name: string
  partrequest_delivery_location: string

  description: string
  partrequest_desc: string

  date: string

  // company info
  companyLogo: string
  company_name: string
  company_fiscal: string
  company_address_street: string
  company_logo: string

  bidding: {
    partoffer_bid_title_text: string
    // isWinningBid: boolean
    partoffer_bid_is_win: number
    // bidUserId: number
    partoffer_bid_user_id: number

    // price: number
    partoffer_bid_price: number

    // currency: string
    partoffer_bid_currency: number

    // bidUnit: string
    partoffer_bid_unit: number

    partrequest_status: number
    // requestStatus: string

    messages: {
      pob_msg_text: string
      // text: string
      // createdAt: string
      pob_msg_created_at: Date
      // userType: string
      pob_msg_user_type: number
    }[]
  }[]

}

export interface IProposeOfferDropdownData {
  offerCurrency: IDropDownItem[]
  productType: IDropDownItem[]
  offerAvailability: IDropDownItem[]
  offerUnit: IDropDownItem[]
}

export interface IOrderReceivedCardComponent {
  orderNo: string
  orderId: number
  displayStatus: string
  statusId: OrderType
  productName: string
  productId: number
  orderDate: string
  orderPrice: string
  deliveryCost: string
}

export interface IOrderReceivedDetail {
  orderNo: string
  orderId: number
  displayStatus: string
  statusId: OrderType
  productName: string
  productId: number
  orderDate: string
  orderPrice: string
  deliveryCost: string
  quantity: number
  itemPrice: string
  buyerName?: string
  buyerEmail?: string
  buyerMobile?: string
  address?: string
  ratingGiven?: number
  sellerNotes?: string
  productImage: number | string
  vendorRemarks: string
}

export interface IOrderPlacedDetail {
  orderNo: string
  customerName: string
  orderDate: string
  email: string
  phone: string
  address: string
  productName: string
  itemPrice: string
  quantity: number
  orderPrice: string
  deliveryCost: string
  customerRemarks: string
  productImage: string | number
  sellerName: string
  sellerPhone: string
  sellerEmail: string
  buyerName: string
  buyerEmail: string
  buyerMobile: string
  orderId: number
  displayStatus: string
  statusId: number
  productId: number
}

export interface INotificationDetail {
  notificationId: number
  userId: number
  bookingId: number
  title: string
  description: string
  notificationDate: string
  isRead: boolean
  notificationType: 'bidStatusUpdated' | 'newBidReceived' | 'bidWinnerSelected' | 'newOrderReceived' | 'buySubscriptionPlan' | 'OrderStatusUpdated'
  data: {
    orderId: number
    productId: number
  }
}