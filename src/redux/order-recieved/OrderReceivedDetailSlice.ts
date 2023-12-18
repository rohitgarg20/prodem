import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { ToastAndroid } from 'react-native'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IDropDownItem, IOrderReceivedDetail } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { currencyCoverter, getOrderStatusLabel, tString } from '../../utils/app-utils'

interface IOrderReceivedDetailState {
  orderDetails?: IOrderReceivedDetail
  selectedStatusItem?: IDropDownItem
  isFetching: Boolean
}

const initialState: IOrderReceivedDetailState = {
  orderDetails: undefined,
  selectedStatusItem: {},
  isFetching: true
}

// order_remark
// order_vendor_remark


const onFetchedOrderDetailSuccess = (state: IOrderReceivedDetailState, { payload }) => {
  const orderDetail = get(payload, 'responseData.data.orderDetails', {})
  const orderStatusLabel = getOrderStatusLabel(orderDetail?.order_status)
  const ratingsData = get(orderDetail, 'ratings', [])
  const totalLength = ratingsData?.length
  let lastRatingDetail: any = {}
  if(totalLength > 0) {
    lastRatingDetail = ratingsData[totalLength - 1]
  }
  state.orderDetails = {
    orderNo: orderDetail?.order_no,
    orderId: orderDetail?.order_id,
    displayStatus: orderStatusLabel,
    statusId: orderDetail?.order_status,
    productName: orderDetail?.product_name,
    productId: orderDetail?.product_id,
    orderDate: orderDetail?.product_created_at,
    orderPrice: currencyCoverter(orderDetail?.order_final_amount),
    deliveryCost: currencyCoverter(orderDetail?.order_delivery_amount),
    quantity: orderDetail?.order_qty,
    itemPrice: currencyCoverter(orderDetail?.order_price),
    buyerName: orderDetail?.order_name,
    buyerEmail: orderDetail?.order_phone,
    buyerMobile: orderDetail?.order_email,
    address: orderDetail?.order_address,
    ratingGiven: lastRatingDetail?.rating_star || -1,
    ratingDescription: lastRatingDetail?.rating_desc || '',
    productImage: orderDetail?.product_image || icons.DEFAULT_IMAGE,
    vendorRemarks: orderDetail?.order_vendor_remark || ''
  }
  state.selectedStatusItem = {
    id: orderDetail?.order_status,
    value: orderStatusLabel
  }
  state.isFetching = false
  log('', state)
}

const onSelectDropDowItem = (state: IOrderReceivedDetailState, { payload }) => {
  const { selectedDropdownItem } = payload
  state.selectedStatusItem = selectedDropdownItem
}

const resetFetchedOrderDetail = (state: IOrderReceivedDetailState) => {
  state.orderDetails = undefined
  state.selectedStatusItem = {}
  state.isFetching = true
}

const onRatingApiSuccess = (state: IOrderReceivedDetailState, { payload }) => {
  genericDrawerController.closeGenericDrawerModal()
  showAndroidToastMessage('MultiLanguageString.RATING_SUBMITTED')
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}


const onRemarksApiSuccess = (state: IOrderReceivedDetailState, { payload }) => {
  showAndroidToastMessage('MultiLanguageString.REMARKS_SUBMITTED')
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}

const onSuccessOrderStatusApi = (state: IOrderReceivedDetailState, { payload }) => {
  genericDrawerController.closeGenericDrawerModal()
  const orderId = get(payload, 'extraParams.orderId', '')
  const status = get(payload, 'extraParams.status', '')
  let orderDetails = state.orderDetails as IOrderReceivedDetail
  if(state.orderDetails?.orderId === orderId) {
    orderDetails.statusId = status
    orderDetails.displayStatus = getOrderStatusLabel(status)
    state.selectedStatusItem = {
      id: status,
      value: getOrderStatusLabel(status)
    }
    state.orderDetails = orderDetails
    showAndroidToastMessage('MultiLanguageString.STATUS_UPDATED')
  }
}


const onFailureApiResponse = (state: IOrderReceivedDetailState, { payload }) => {
  genericDrawerController.closeGenericDrawerModal()
  const { error } = payload
  state.isFetching = false
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)

  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}


const orderReceivedDetailSlice = createSlice({
  name: ReducerName.ORDER_RECEIVED_DETAIL,
  initialState,
  reducers: {
    onFetchedOrderDetailSuccessReducer: onFetchedOrderDetailSuccess,
    onFetchedOrderDetailFailureReducer: onFailureApiResponse,
    onSelectDropDowItemReducer: onSelectDropDowItem,
    resetFetchedOrderDetailReducer: resetFetchedOrderDetail,
    onRatingApiSuccessReducer: onRatingApiSuccess,
    onRemarksApiSuccessReducer: onRemarksApiSuccess,
    onFailureApiResponseReducer: onFailureApiResponse,
    onSuccessOrderStatusApiReducer: onSuccessOrderStatusApi
  }
})

export const {
  onFetchedOrderDetailSuccessReducer, onSelectDropDowItemReducer, resetFetchedOrderDetailReducer,
  onRatingApiSuccessReducer, onRemarksApiSuccessReducer,
  onFailureApiResponseReducer, onSuccessOrderStatusApiReducer, onFetchedOrderDetailFailureReducer
} = orderReceivedDetailSlice.actions

export default orderReceivedDetailSlice.reducer