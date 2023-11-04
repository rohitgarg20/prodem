import { KeyboardType, PressableProps, StyleProp, TextInputProps, TextProps, TextStyle, ViewStyle } from 'react-native'
import { FastImageProps } from 'react-native-fast-image'

import { AddPartFieldKeys, InputType, PartRequestFieldKeys } from './Constant'
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
}

export interface IAddPartForm {
  formData: Record<AddPartFieldKeys, IFormField>
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
}

export interface IProfileOptionItem {
  label: string
  icon: number
  screenToNavigate: string
  key: string
}

export interface ITopTabBarItem {
  label: string
  key: RatingTypes
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
}