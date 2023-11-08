import { createSlice } from '@reduxjs/toolkit'
import { find, get, map } from 'lodash'

import { log } from '../../common/config/log'
import { OrderReceivedTypeList, OrderType, ReducerName } from '../../common/Constant'
import { IOrderReceivedCardComponent } from '../../common/Interfaces'
import { getFormattedDateInDetailFormat } from '../../utils/app-utils'

interface IOrderRecievedState {
  selectedOrderType: OrderType
  orderRecievedList?: IOrderReceivedCardComponent[]
}

const initialState: IOrderRecievedState = {
  selectedOrderType: 2,
  orderRecievedList: []
}

const onOrderRecievedApiSuccess = (state: IOrderRecievedState, { payload }) => {
  log('onOrderRecievedApiSuccessonOrderRecievedApiSuccess', payload)
  const responseData = get(payload, 'responseData.data', [])
  const formattedOrderRecieved: IOrderReceivedCardComponent[] = map(responseData, (orderRecieveItem) => {
    return {
      orderNo: `Order No. ${orderRecieveItem?.order_no}`,
      orderId: orderRecieveItem?.order_id,
      displayStatus: find(OrderReceivedTypeList, (orderStatusType) => orderStatusType.key === orderRecieveItem?.order_status)?.label || '',
      statusId: orderRecieveItem?.order_status,
      productName: orderRecieveItem?.product_name,
      productId: orderRecieveItem?.product_id,
      orderDate: getFormattedDateInDetailFormat(orderRecieveItem?.order_created_at),
      orderPrice: orderRecieveItem?.order_amount,
      delieveryCost: orderRecieveItem?.order_delivery_amount
    }
  })
  state.orderRecievedList = formattedOrderRecieved

}

const onChangeSelectedOrderType = (state: IOrderRecievedState, { payload }) => {
  state.selectedOrderType = payload?.orderType

}

export const orderRecievedSlice = createSlice({
  name: ReducerName.ORDER_RECIEVED,
  initialState,
  reducers: {
    onOrderRecievedApiSuccessReducer: onOrderRecievedApiSuccess,
    onChangeSelectedOrderTypeReducer: onChangeSelectedOrderType
  }
})

export const { onOrderRecievedApiSuccessReducer,  onChangeSelectedOrderTypeReducer} = orderRecievedSlice.actions

export default orderRecievedSlice.reducer