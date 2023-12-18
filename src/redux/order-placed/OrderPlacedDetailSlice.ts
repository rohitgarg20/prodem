import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'

import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IOrderPlacedDetail } from '../../common/Interfaces'
import { currencyCoverter, getOrderStatusLabel } from '../../utils/app-utils'

interface IOrderPlacedDetailState {
  orderDetails?: IOrderPlacedDetail
}

const initialState: IOrderPlacedDetailState = {
  orderDetails: undefined
}


const onFetchedOrderDetailSuccess = (state: IOrderPlacedDetailState, { payload }) => {

  const orderDetail = get(payload, 'responseData.data.orderDetails', {})
  const sellerDetails = get(payload, 'responseData.data.sellerDetails', {})
  const orderStatusLabel = getOrderStatusLabel(orderDetail?.order_status)
  state.orderDetails = {
    orderNo: orderDetail?.order_no,
    orderId: orderDetail?.order_id,
    displayStatus: orderStatusLabel,
    statusId: orderDetail?.order_status,
    productName: orderDetail?.product_name,
    productId: orderDetail?.product_id,
    orderDate: orderDetail?.order_date,
    orderPrice: currencyCoverter(orderDetail?.order_final_amount),
    deliveryCost: currencyCoverter(orderDetail?.order_delivery_amount),
    quantity: orderDetail?.order_qty,
    itemPrice: currencyCoverter(orderDetail?.product_price),
    buyerName: orderDetail?.p_user_name + ' ' + (orderDetail?.p_user_company_name || ''),
    buyerEmail: orderDetail?.p_user_email,
    buyerMobile: orderDetail?.p_user_mobile,
    address: orderDetail?.order_address,
    productImage: orderDetail?.product_image || icons.DEFAULT_IMAGE,
    customerName: orderDetail?.order_name,
    customerRemarks: orderDetail?.order_remark,
    sellerName: sellerDetails?.p_user_name +  ' ' + (sellerDetails?.p_user_company_name || ''),
    sellerEmail: sellerDetails?.p_user_email,
    sellerPhone: sellerDetails?.p_user_mobile,
    email: orderDetail?.order_email,
    phone: orderDetail?.order_phone
  }

}


const resetFetchedOrderDetail = (state: IOrderPlacedDetailState) => {
  state.orderDetails = undefined
}

const orderPlacedDetailSlice = createSlice({
  name: ReducerName.ORDER_PLACED_DETAIL,
  initialState,
  reducers: {
    onFetchedOrderDetailSuccessReducer: onFetchedOrderDetailSuccess,
    resetFetchedOrderDetailReducer: resetFetchedOrderDetail
  }
})

export const {
  onFetchedOrderDetailSuccessReducer, resetFetchedOrderDetailReducer
} = orderPlacedDetailSlice.actions

export default orderPlacedDetailSlice.reducer