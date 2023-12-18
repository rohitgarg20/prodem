import { createSlice } from '@reduxjs/toolkit'
import { filter, find, get, map } from 'lodash'

import { BASE_URL } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { InputType, PROPOSE_OFFER_FORM, ProposeOfferFieldKeys, ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IBidDetail, ICompanyDetail, IFormField, IPartRequestBasicDetail, IProposeOfferDropdownData } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { getFormattedDateInDetailFormat, getImagesArray, getPrice, getTitleWithSeperator, tString } from '../../utils/app-utils'
import { ToastAndroid } from 'react-native'


interface IPartRequestDetail {
  partRequestDetail: {
    [x in number]: {
      basicDetail?: IPartRequestBasicDetail
      companyDetail?: ICompanyDetail
      biddingList?: IBidDetail[]
      initialIgnoreValue?: boolean
      isIgnoredByUser?: boolean
      initialAddedInWishlist?: boolean
      isAddedInWishlistByUser?: boolean
    }
  }
  formData: {
    [x in ProposeOfferFieldKeys]: IFormField
  }
  activePartRequestId?: number
}

const initialState: IPartRequestDetail = {
  partRequestDetail: {},
  formData: PROPOSE_OFFER_FORM,
  activePartRequestId: undefined
}

const onChangeUserInput = (state: IPartRequestDetail, { payload }) => {
  const { fieldKey, value } = payload
  state.formData[fieldKey].inputValue = value
}

const onSelectDropDowItem = (state: IPartRequestDetail, { payload }) => {
  const { fieldKey, selectedDropdownItem } = payload
  state.formData[fieldKey].selectedItem = selectedDropdownItem
}

const onFetchedBidOptionsSuccess = (state: IPartRequestDetail, { payload }) => {
  const dropDownData: IProposeOfferDropdownData = get(payload, 'data') || get(payload, 'responseData.data', {})
  const { offerAvailability, offerCurrency, offerUnit, productType  } = dropDownData || {}

  state.formData.currency.dropdownData = offerCurrency
  state.formData.unit.dropdownData = offerUnit
  state.formData.offeredBy.dropdownData = productType
  state.formData.availability.dropdownData = offerAvailability

}

const getFormattedPrice = (state: IPartRequestDetail, price, currencyId, unitId) => {
  const { currency, unit } = state.formData
  let currencyDispay = find(currency?.dropdownData, (item) => item.id === currencyId)
  let unitDisplay = find(unit?.dropdownData, (item) => item.id === unitId)
  let displayPrice = price
  if(price) {
    displayPrice = getPrice(displayPrice) + ' ' + (currencyDispay?.value || '') + ' / ' + (unitDisplay?.value || '')
  }
  return displayPrice
}

const getProductType = (state: IPartRequestDetail, productTypeId) => {
  const { offeredBy } = state.formData
  let productData = find(offeredBy?.dropdownData, (item) => item.id === productTypeId)
  return productData?.value || ''
}

const getProductAvailabilityType = (state: IPartRequestDetail, availabilityId) => {
  const { availability } = state.formData
  let availabilityData = find(availability?.dropdownData, (item) => item.id === availabilityId)
  return (availabilityData?.value || '') + tString('MultiLanguageString.PIECE_STOCK')
}

const partRequestDetailApiSuccess = (state: IPartRequestDetail, { payload }) => {
  const respData = get(payload, 'responseData.data', {})
  const loggedInUserId = get(payload, 'extraParams.loggedInUserId', '')
  const productData = get(respData, 'product', {})
  const biddingList = get(respData, 'bids', [])
  let imagesGallery = map(productData?.partrequest_slides?.split(','), (item) => {
    if(item.length) {
      return `${BASE_URL}uploads/partrequest/${item}`
    } else {
      return icons.DEFAULT_IMAGE
    }
  })

  const partRequestId = get(productData, 'partrequest_id')
  const formattedProductDetail = {
    heading: `${productData?.partrequest_title} for ${getTitleWithSeperator(productData?.brand_name, ',')} ${getTitleWithSeperator((productData?.partrequest_year || '').toString(), ',')} ${productData?.vehicle_name || ''}`,

    // to form heading
    partrequest_title: productData?.partrequest_title,
    brand_name: productData?.brand_name || '',
    partrequest_year: productData?.partrequest_year || '',
    vehicle_name: productData?.vehicle_name || '',

    // address detail
    addressInfo: `${getTitleWithSeperator(productData?.country_name, ' > ')}${getTitleWithSeperator(productData?.city_name, ' , ')}${productData?.partrequest_delivery_location}`,

    // to form address
    country_name: productData?.country_name,
    city_name: productData?.city_name,
    partrequest_delivery_location: productData?.partrequest_delivery_location,

    // product images gallery
    imageGallery: imagesGallery,
    // part description
    description: productData?.partrequest_desc,
    partrequest_desc: productData?.partrequest_desc,

    uploadedDate: getFormattedDateInDetailFormat(productData?.partrequest_created_at),

    partRequestStatus: productData?.partrequest_status,
    isPostByLoggedInUser: loggedInUserId === productData?.partrequest_user_id,
    partRequestId,
    dealsCount: (biddingList?.length || 0)?.toString()
  }
  let companyLogo: string = productData?.company_logo || ''
  if(companyLogo.length) {
    companyLogo = `${BASE_URL}imagecache/thumb/uploads__companylogo/400x400/${companyLogo}`
  } else {
    companyLogo = icons.DEFAULT_IMAGE
  }
  // state.partRequestDetail.companyDetail = {
  //   companyLogo,
  //   companyName: productData?.company_name,
  //   companyFiscal: `CIF: ${productData?.company_fiscal}`,
  //   companyAddressStreet: `Address: ${productData?.company_address_street}`
  // }
  const formattedBiddingList = map(biddingList, (bidItem) => {
    let bidImagesSlides = map(getImagesArray(bidItem?.partoffer_bid_slides), (item) => {
      if(item.length) {
        return `${BASE_URL}uploads/productbid/${item}`
      } else {
        return icons.DEFAULT_IMAGE
      }
    })
    return {
      partRequestId: bidItem?.partoffer_bid_parent_id,
      companyName: bidItem?.company_name || bidItem?.p_user_name,
      bidUserId: bidItem?.partoffer_bid_user_id,
      isWinningBid: bidItem?.partoffer_bid_is_win,
      description: bidItem?.partoffer_bid_title_text,
      displayPrice: getFormattedPrice(state, bidItem?.partoffer_bid_price, bidItem?.partoffer_bid_currency, bidItem?.partoffer_bid_unit),
      price: bidItem?.partoffer_bid_price,
      currency: bidItem?.partoffer_bid_currency,
      bidUnit: bidItem?.partoffer_bid_unit,
      requestStatus: bidItem?.partrequest_status,
      productType:  getProductType(state, bidItem?.partoffer_bid_product_type).toString() || '',
      availability: getProductAvailabilityType(state, bidItem?.partoffer_bid_availavility).toString() || '',
      bidId: bidItem?.partoffer_bid_id,
      bidImagesSlides,
      messages: map(get(bidItem, 'msgRecords'), (msgItem) => {
        return {
          text: msgItem?.pob_msg_text?.replaceAll('\r', '').replaceAll('\n', ''),
          createdAt: getFormattedDateInDetailFormat(msgItem?.pob_msg_created_at),
          userType: msgItem?.pob_msg_user_type === 1 ? `${tString('MultiLanguageString.BUYER')}, ` : `${tString('MultiLanguageString.SELLER')}, `
        }
      })
    }
  })
  state.partRequestDetail = {
    [partRequestId]: {
      basicDetail: formattedProductDetail,
      companyDetail: {
        companyLogo,
        companyName: productData?.company_name,
        companyFiscal: `${tString('MultiLanguageString.CIF')} ${productData?.company_fiscal}`,
        companyAddressStreet: `${tString('MultiLanguageString.ADDRESS')} ${productData?.company_address_street}`
      },
      biddingList: formattedBiddingList,
      initialIgnoreValue: loggedInUserId === productData?.partofferignore_user_id,
      isIgnoredByUser: loggedInUserId === productData?.partofferignore_user_id,
      initialAddedInWishlist: loggedInUserId === productData?.partofferwishlist_user_id,
      isAddedInWishlistByUser: loggedInUserId === productData?.partofferwishlist_user_id
    }
  }
}

const setActivePartRequestId = (state: IPartRequestDetail, { payload }) => {
  state.activePartRequestId = get(payload, 'partRequestId')
}

const addRemoveProductToIgnoreList = (state: IPartRequestDetail, { payload }) => {
  const updatedValue = get(payload, 'responseData.data.mode')
  if(state.activePartRequestId) {
    state.partRequestDetail[state.activePartRequestId].isIgnoredByUser = updatedValue === 'add'
    showAndroidToastMessage('MultiLanguageString.REQUEST_UPDATED')
  }
}

const addRemoveProductToWishlistList = (state: IPartRequestDetail, { payload }) => {
  const updatedValue = get(payload, 'responseData.data.mode')
  if(state.activePartRequestId) {
    state.partRequestDetail[state.activePartRequestId].isAddedInWishlistByUser = updatedValue === 'new'
    showAndroidToastMessage('MultiLanguageString.REQUEST_UPDATED')
  }
}

const sendMsgByBuyerSuccess = (state: IPartRequestDetail, { payload }) => {
  log('sendMsgByBuyerSuccesssendMsgByBuyerSuccesssendMsgByBuyerSuccess', payload)
  // const callBackFn = get(payload, 'extraParams.callBackFn', undefined)
  log('sendMsgByBuyerSuccesssendMsgByBuyerSuccesssendMsgByBuyerSuccess', state.activePartRequestId)

  // if(callBackFn) {
  //   callBackFn()
  // }
  // if(state.activePartRequestId) {
  //   fetchPartRequestDetail({ productId: state.activePartRequestId })
  // }

}

const sendMsgBySellerSuccess = (state: IPartRequestDetail, { payload }) => {
  log('sendMsgByBuyerSuccesssendMsgByBuyerSuccesssendMsgByBuyerSuccess', payload)
  // const callBackFn = get(payload, 'extraParams.callBackFn', undefined)
  log('sendMsgByBuyerSuccesssendMsgByBuyerSuccesssendMsgByBuyerSuccess', state.activePartRequestId)

  // if(callBackFn) {
  //   callBackFn()
  // }
  // if(state.activePartRequestId) {
  //   fetchPartRequestDetail({ productId: state.activePartRequestId })
  // }

}

const selectBidAsWinningApiSuccess = (state: IPartRequestDetail, { payload }) => {
  log('selectBidAsWinningApiSuccessselectBidAsWinningApiSuccess', state, payload)

}

const proposeNewOfferApiSuccess = (state: IPartRequestDetail, { payload }) => {
  log('proposeNewOfferApiSuccessproposeNewOfferApiSuccess', state, payload)
  let parsedFormData = state.formData
  Object.keys(parsedFormData).forEach((formKey) => {
    parsedFormData[formKey].inputValue = ''
    parsedFormData[formKey].selectedItem = undefined
  })
  state.formData = parsedFormData
}

const proposeNewOfferApiFailure = (state: IPartRequestDetail, { payload }) => {
  log('proposeNewOfferApiFailureproposeNewOfferApiFailure', state, payload)
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)

}

const resetData = (state: IPartRequestDetail) => {
  const proposeOfferFrom = state.formData
  Object.keys(proposeOfferFrom).forEach((formKey) => {
    const formKeyData = proposeOfferFrom?.[formKey]
    const { type } = formKeyData
    if(type === InputType.TEXT_INPUT) {
      proposeOfferFrom[formKey].inputValue = ''
    }
    if(type === InputType.DROPDOWN) {
      proposeOfferFrom[formKey].selectedItem = {}
    }

    if(type === InputType.IMAGES_SELECTION) {
      proposeOfferFrom[formKey].selectedImages = []
    }
  })
  state.partRequestDetail = initialState.partRequestDetail
  state.activePartRequestId = initialState.activePartRequestId
  state.formData = proposeOfferFrom
}

const onSelectImage = (state: IPartRequestDetail, { payload }) => {
  const { selectedImages } = payload
  const updatedImages = [ ...state.formData.productSlides.selectedImages || [], ...selectedImages]
  state.formData.productSlides.selectedImages = updatedImages
}

const onRemoveImage = (state: IPartRequestDetail, { payload }) => {
  const { selectedImage } = payload
  const oldImages = state.formData.productSlides.selectedImages || []
  // log('oldImagesoldImages', oldImages, imageIndex)
  state.formData.productSlides.selectedImages = filter(oldImages, (image) => image.base64 !== selectedImage.base64)
}

const partRequestDetailSlice = createSlice({
  initialState,
  name: ReducerName.PART_REQUEST_DETAIL,
  reducers: {
    partRequestDetailApiSuccessReducer: partRequestDetailApiSuccess,
    onChangeUserInputReducer: onChangeUserInput,
    onSelectDropDowItemReducer: onSelectDropDowItem,
    onFetchedBidOptionsSuccessReducer: onFetchedBidOptionsSuccess,
    setActivePartRequestIdReducer: setActivePartRequestId,
    addRemoveProductToIgnoreListReducer: addRemoveProductToIgnoreList,
    addRemoveProductToWishlistListReducer: addRemoveProductToWishlistList,
    sendMsgByBuyerSuccessReducer: sendMsgByBuyerSuccess,
    sendMsgBySellerSuccessReducer: sendMsgBySellerSuccess,
    selectBidAsWinningApiSuccessReducer: selectBidAsWinningApiSuccess,
    proposeNewOfferApiSuccessReducer: proposeNewOfferApiSuccess,
    proposeNewOfferApiFailureReducer: proposeNewOfferApiFailure,
    resetReducerData: resetData,
    onSelectImagesReducer: onSelectImage,
    onRemoveImageReducer: onRemoveImage
  }
})

export const {
  partRequestDetailApiSuccessReducer, onChangeUserInputReducer, onSelectDropDowItemReducer, onFetchedBidOptionsSuccessReducer,
  setActivePartRequestIdReducer, addRemoveProductToIgnoreListReducer, addRemoveProductToWishlistListReducer,
  sendMsgByBuyerSuccessReducer, sendMsgBySellerSuccessReducer, selectBidAsWinningApiSuccessReducer, proposeNewOfferApiSuccessReducer,
  proposeNewOfferApiFailureReducer, resetReducerData, onSelectImagesReducer, onRemoveImageReducer
} = partRequestDetailSlice.actions

export default partRequestDetailSlice.reducer