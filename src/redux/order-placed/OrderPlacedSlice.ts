import { createSlice } from '@reduxjs/toolkit'
import { find, get, map } from 'lodash'

import { log } from '../../common/config/log'
import { OrderReceivedTypeList, OrderType, ReducerName } from '../../common/Constant'
import { IOrderReceivedCardComponent } from '../../common/Interfaces'
import { currencyCoverter, getFormattedDateInDetailFormat, tString } from '../../utils/app-utils'

interface IOrderRecievedState {
  orderPlacedList?: IOrderReceivedCardComponent[]
}

const initialState: IOrderRecievedState = {
  orderPlacedList: []
}

const onOrderPlacedApiSuccess = (state: IOrderRecievedState, { payload }) => {
  const responseData = get(payload, 'responseData.data', [])
  const formattedOrderRecieved: IOrderReceivedCardComponent[] = map(responseData, (orderRecieveItem) => {
    return {
      orderNo: `${tString('ORDER_NO')}. ${orderRecieveItem?.order_no}`,
      orderId: orderRecieveItem?.order_id,
      displayStatus: find(OrderReceivedTypeList, (orderStatusType) => orderStatusType.key === orderRecieveItem?.order_status)?.label || '',
      statusId: orderRecieveItem?.order_status,
      productName: orderRecieveItem?.product_name,
      productId: orderRecieveItem?.product_id,
      orderDate: getFormattedDateInDetailFormat(orderRecieveItem?.order_created_at),
      orderPrice: currencyCoverter(orderRecieveItem?.order_amount),
      deliveryCost: currencyCoverter(orderRecieveItem?.order_delivery_amount)
    }
  })
  state.orderPlacedList = formattedOrderRecieved

}


export const orderPlacedSlice = createSlice({
  name: ReducerName.ORDER_PLACED,
  initialState,
  reducers: {
    onOrderPlacedApiSuccessReducer: onOrderPlacedApiSuccess
  }
})

export const { onOrderPlacedApiSuccessReducer} = orderPlacedSlice.actions

export default orderPlacedSlice.reducer