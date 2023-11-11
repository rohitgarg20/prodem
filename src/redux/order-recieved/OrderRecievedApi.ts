import { onFetchedOrderDetailSuccessReducer, onRatingApiSuccessReducer,
  onRemarksApiSuccessReducer, onSuccessOrderStatusApiReducer, onFailureApiResponseReducer, onFetchedOrderDetailFailureReducer
} from './OrderReceivedDetailSlice'
import { onOrderRecievedApiSuccessReducer, onOrderRecievedApiFailureReducer } from './OrderRecievedSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { showAndroidToastMessage } from '../../common/Toast'
import { apiDispatch } from '../../network/DispatchApiCall'


export const fetchOrderRecievedList = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_ORDER_RECIEVED_LIST,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onOrderRecievedApiSuccessReducer.type,
    onFailure: onOrderRecievedApiFailureReducer.type,
  })
}

export const fetchOrderDetails = (orderId) => {
  const formData = new FormData()
  formData.append('order_id', orderId)
  apiDispatch({
    endPoint: API_END_POINT.GET_ORDER_DETAILS,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onFetchedOrderDetailSuccessReducer.type,
    onFailure: onFetchedOrderDetailFailureReducer.type,
    body: formData
  })
}

export const submitRating = ({
  ratings,
  orderId,
  desc
}) => {
  const formData = new FormData()
  formData.append('order_id', orderId)
  formData.append('ratings', ratings)
  formData.append('desc', desc)
  apiDispatch({
    endPoint: API_END_POINT.GIVE_RATING,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onRatingApiSuccessReducer.type,
    onFailure: onFailureApiResponseReducer.type,
    body: formData,
    extraParams: {
      orderId,
      ratingGiven: ratings,
      desc
    }
  })
}

export const addRemarks = ({
  remark,
  orderId
}) => {
  const formData = new FormData()
  formData.append('order_id', orderId)
  formData.append('remark', remark)
  if(!remark.length) {
    showAndroidToastMessage('Remarks cannot be empty')
  } else {
    apiDispatch({
      endPoint: API_END_POINT.ADD_REMARKS,
      method: 'POST',
      showLoaderOnScreen: true,
      onSuccess: onRemarksApiSuccessReducer.type,
      onFailure: onFailureApiResponseReducer.type,
      body: formData
    })
  }
}

export const changeOrderStatus = ({
  status,
  orderId
}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('order_id', orderId)
    formData.append('status', status)
    const apiResponse = apiDispatch({
      endPoint: API_END_POINT.UPDATE_ORDER_STATUS,
      method: 'POST',
      showLoaderOnScreen: true,
      onSuccess: onSuccessOrderStatusApiReducer.type,
      onFailure: onFailureApiResponseReducer.type,
      body: formData
    })
    try {
      resolve(apiResponse)
    } catch(err) {
      reject(err)
    }
  })
}