import { isEmpty } from 'lodash'

import {
  addRemoveProductToIgnoreListReducer, addRemoveProductToWishlistListReducer, partRequestDetailApiSuccessReducer,
  sendMsgBySellerSuccessReducer, sendMsgByBuyerSuccessReducer, selectBidAsWinningApiSuccessReducer,
  proposeNewOfferApiSuccessReducer, proposeNewOfferApiFailureReducer
} from './PartRequestDetailSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { InputType, ProposeOfferFieldKeys } from '../../common/Constant'
import { IFormField } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { apiDispatch } from '../../network/DispatchApiCall'
import { store } from '../../store/DataStore'
import { tString } from '../../utils/app-utils'
import { ToastAndroid } from 'react-native'

export const fetchPartRequestDetail = ({
  productId
}) => {
  const formData = new FormData()
  const loggedInUserId = store.getState().profileReducer.userDetails?.p_user_id
  formData.append('product_id', productId)
  apiDispatch({
    method: 'POST',
    endPoint: API_END_POINT.PART_REQUEST_DETAIL,
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: partRequestDetailApiSuccessReducer.type,
    extraParams: {
      loggedInUserId
    }
  })
}

export const ignorePartRequestApi = (partRequestId) => {
  const formData = new FormData()
  formData.append('partofferignore_offer_id', partRequestId)
  apiDispatch({
    endPoint: API_END_POINT.IGNORE_PART_REQUEST,
    method: 'POST',
    body: formData,
    showLoaderOnScreen: true,
    onSuccess: addRemoveProductToIgnoreListReducer.type,
    extraParams: {
      partRequestId
    }
  })
}

export const addPartRequestToWishlistApi = (partRequestId) => {
  const formData = new FormData()
  formData.append('partofferignore_offer_id', partRequestId)
  apiDispatch({
    endPoint: API_END_POINT.ADD_PART_REQUEST_TO_WISHLIST,
    method: 'POST',
    body: formData,
    showLoaderOnScreen: true,
    onSuccess: addRemoveProductToWishlistListReducer.type,
    extraParams: {
      partRequestId
    }
  })
}

export const sendMsgByBuyer = ({ bidId, msg, partRequestId }) => {
  if(!msg.length) {
    showAndroidToastMessage('MultiLanguageString.MESSAGE_EMPTY')
    return
  }
  const formData = new FormData()
  formData.append('bid_id', bidId)
  formData.append('msg', msg)
  return new Promise((resolve, reject) => {
    const apiRespData = apiDispatch({
      endPoint: API_END_POINT.SAVE_BID_MSG_BY_BUYER,
      method: 'POST',
      body: formData,
      showLoaderOnScreen: true,
      onSuccess: sendMsgByBuyerSuccessReducer.type
    })
    try {
      fetchPartRequestDetail({ productId: partRequestId })
      resolve(apiRespData)
    } catch(err) {
      reject(err)
    }
  })
}

export const sendMsgBySeller = ({ bidId, msg, partRequestId }) => {
  if(!msg.length) {
    showAndroidToastMessage('MultiLanguageString.MESSAGE_EMPTY')
    return
  }
  const formData = new FormData()
  formData.append('bid_id', bidId)
  formData.append('msg', msg)
  return new Promise((resolve, reject) => {
    const apiRespData = apiDispatch({
      endPoint: API_END_POINT.SAVE_BID_MSG_BY_SELLER,
      method: 'POST',
      body: formData,
      showLoaderOnScreen: true,
      onSuccess: sendMsgBySellerSuccessReducer.type
    })
    try {
      fetchPartRequestDetail({ productId: partRequestId })
      resolve(apiRespData)
    } catch(err) {
      reject(err)
    }
  })
}

export const selectWinningBid = ({ bidId, partRequestId }) => {
  const formData = new FormData()
  formData.append('partoffer_bid_id', bidId)
  return new Promise((resolve, reject) => {
    const apiRespData = apiDispatch({
      endPoint: API_END_POINT.SELECT_WINNING_BID,
      method: 'POST',
      body: formData,
      showLoaderOnScreen: true,
      onSuccess: selectBidAsWinningApiSuccessReducer.type
    })
    try {
      fetchPartRequestDetail({ productId: partRequestId })
      resolve(apiRespData)
    } catch(err) {
      reject(err)
    }
  })
}

export const isProposeNewFormValid = (formData: Record<ProposeOfferFieldKeys, IFormField>) => {
  let emptyField = ''
  Object.keys(formData).forEach((formKey) => {
    const formKeyData = formData?.[formKey]
    log('isProposeNewFormValid', formKey)
    const { inputValue, type, selectedItem, required } = formKeyData
    if(emptyField.length || !required) {
      return
    }

    if(type === InputType.TEXT_INPUT) {
      if(!inputValue) {
        emptyField = formKey
      }
    }

    if(type === InputType.DROPDOWN) {
      if(isEmpty(selectedItem)) {
        emptyField = formKey
      }
    }
  })
  return emptyField
}

export const proposeNewOfferApiRequest = (addPartForm: Record<ProposeOfferFieldKeys, IFormField>, partRequestId: number) => {
  const formData = new FormData()
  const emptyFieldName = isProposeNewFormValid(addPartForm)
  if(!emptyFieldName) {
    Object.keys(addPartForm).forEach((formKey) => {
      const formKeyData = addPartForm?.[formKey]
      const { inputValue, type, selectedItem, apiKey, selectedImages } = formKeyData
      if(type === InputType.TEXT_INPUT) {
        formData.append(apiKey, inputValue)
      }
      if(type === InputType.DROPDOWN) {
        formData.append(apiKey, selectedItem.id)
      }
      if(type === InputType.IMAGES_SELECTION) {
        selectedImages.forEach((image, index) => {
          const base64Img = image?.base64
          const parsedBase64Img = base64Img.split(',')[1]
          formData.append(`${apiKey}[${index}]`, parsedBase64Img)
        })
      }
    })
    formData.append('product_id', partRequestId)
    return new Promise(async (resolve, reject) => {
      const apiRespData = await apiDispatch({
        endPoint: API_END_POINT.PROPOSE_NEW_OFFER,
        onSuccess: proposeNewOfferApiSuccessReducer.type,
        showLoaderOnScreen: true,
        method: 'POST',
        body: formData,
        onFailure: proposeNewOfferApiFailureReducer.type
      })
      try {
        showAndroidToastMessage('MultiLanguageString.NEW_OFFER')
        fetchPartRequestDetail({ productId: partRequestId })
        resolve(apiRespData)
      } catch(err) {
        reject(err)
      }
    })

  } else {
    showAndroidToastMessage(`${tString(emptyFieldName)} ${tString('MultiLanguageString.CANNOT_BE_EMPTY')}`, ToastAndroid.SHORT, false)
  }

}