import { createSlice } from '@reduxjs/toolkit'
import { find, get } from 'lodash'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { log } from '../../common/config/log'
import { OrderReceivedTypeList, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { icons } from '../../common/Icons'
import { IDropDownItem, IOrderReceivedDetail } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'

interface IOrderReceivedDetailState {
  orderDetails?: IOrderReceivedDetail
  selectedStatusItem?: IDropDownItem
}

const initialState: IOrderReceivedDetailState = {
  orderDetails: undefined,
  selectedStatusItem: {}
}

// order_remark
// order_vendor_remark

const getOrderStatusLabel = (orderStatus) => {
  return find(OrderReceivedTypeList, (orderStatusType) => orderStatusType.key === orderStatus)?.label || ''
}

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
    orderPrice: orderDetail?.order_price,
    delieveryCost: orderDetail?.order_delivery_amount,
    quantity: orderDetail?.product_qty,
    itemPrice: orderDetail?.product_price,
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
  log('statestatestatestatestate', state)
}

const onSelectDropDowItem = (state: IOrderReceivedDetailState, { payload }) => {
  const { selectedDropdownItem } = payload
  state.selectedStatusItem = selectedDropdownItem
}

const resetFetchedOrderDetail = (state: IOrderReceivedDetailState) => {
  state.orderDetails = undefined
  state.selectedStatusItem = {}
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
  log('onRemarksApiSuccessonRemarksApiSuccess', payload)
  genericDrawerController.closeGenericDrawerModal()
  showAndroidToastMessage('Ratings submitted successfully')
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}


const onFailureApiResponse = (state: IOrderReceivedDetailState, { payload }) => {
  log('onRemaksApiFailureonRemaksApiFailure', payload)
  genericDrawerController.closeGenericDrawerModal()
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
  // state.orderDetails = undefined
  // state.selectedStatusItem = {}
}


const orderReceivedDetailSlice = createSlice({
  name: ReducerName.ORDER_RECEIVED_DETAIL,
  initialState,
  reducers: {
    onFetchedOrderDetailSuccessReducer: onFetchedOrderDetailSuccess,
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
  onFailureApiResponseReducer, onSuccessOrderStatusApiReducer
} = orderReceivedDetailSlice.actions

export default orderReceivedDetailSlice.reducer