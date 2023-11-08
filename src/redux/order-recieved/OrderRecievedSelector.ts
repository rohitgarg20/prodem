import { createSelector } from '@reduxjs/toolkit'
import { filter } from 'lodash'

import { OrderType } from '../../common/Constant'
import { IOrderReceivedCardComponent } from '../../common/Interfaces'
import { RootState } from '../../store/DataStore'

const getOrderRecievedList = (state: RootState) => {
  return state.OrderRecievedReducer.orderRecievedList
}

export const getOrderRecievedListByStatus = (selectedOrderStatus: OrderType) => createSelector(
  getOrderRecievedList,
  (orderRecievedList?: IOrderReceivedCardComponent[]) => {
    if(selectedOrderStatus === 0) return orderRecievedList
    return filter(orderRecievedList, (orderRecieveItem) => orderRecieveItem.statusId === selectedOrderStatus)
  }
)