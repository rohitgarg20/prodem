import { createSlice } from '@reduxjs/toolkit'
import { find, get } from 'lodash'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { log } from '../../common/config/log'
import { OrderReceivedTypeList, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { icons } from '../../common/Icons'
import { IDropDownItem, IOrderReceivedDetail } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { getOrderStatusLabel } from '../../utils/app-utils'

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
  state.orderDetails = {
    orderNo: orderDetail?.order_no,
    orderId: orderDetail?.order_id,
    displayStatus: orderStatusLabel,
    statusId: orderDetail?.order_status,
    productName: orderDetail?.product_name,
    productId: orderDetail?.product_id,
    orderDate: orderDetail?.product_created_at,
    orderPrice: orderDetail?.order_final_amount,
    deliveryCost: orderDetail?.order_delivery_amount,
    quantity: orderDetail?.product_qty,
    itemPrice: orderDetail?.order_price,
    buyerName: orderDetail?.order_name,
    buyerEmail: orderDetail?.order_phone,
    buyerMobile: orderDetail?.order_email,
    address: orderDetail?.order_address,
    // ratingGiven: orderDetail?,
    // sellerNotes: orderDetail?,
    productImage: orderDetail?.product_image || icons.DEFAULT_IMAGE,
    vendorRemarks: orderDetail?.order_vendor_remark || ''
  }
  state.selectedStatusItem = {
    id: orderDetail?.order_status,
    value: orderStatusLabel
  }
  state.isFetching = false
  log('statestatestatestatestate', state)
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
  log('onRatingApiSuccessonRatingApiSuccess', payload)
  genericDrawerController.closeGenericDrawerModal()
  showAndroidToastMessage('Ratings submitted successfully')
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}


const onRemarksApiSuccess = (state: IOrderReceivedDetailState, { payload }) => {
  log('onRemarksApiSuccessonRemarksApiSuccess', payload)
  showAndroidToastMessage('Remarks Submitted')
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}

const onSuccessOrderStatusApi = (state: IOrderReceivedDetailState, { payload }) => {
  genericDrawerController.closeGenericDrawerModal()
  log('onRemarksApiSuccessonRemarksApiSuccess', payload)
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
    showAndroidToastMessage('Status of order updated successfully')
  }
}


const onFailureApiResponse = (state: IOrderReceivedDetailState, { payload }) => {
  log('onRemaksApiFailureonRemaksApiFailure', payload)
  genericDrawerController.closeGenericDrawerModal()
  const { error } = payload
  state.isFetching = false
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
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