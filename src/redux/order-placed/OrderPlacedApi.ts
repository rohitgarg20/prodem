import { onFetchedOrderDetailSuccessReducer } from './OrderPlacedDetailSlice'
import { onOrderPlacedApiSuccessReducer } from './OrderPlacedSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'


export const fetchOrderPlacedList = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_ORDER_PLACED_LIST,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onOrderPlacedApiSuccessReducer.type
  })
}

export const fetchOrderPlacedDetail = (orderId) => {
  const formData = new FormData()
  formData.append('order_id', orderId)
  apiDispatch({
    endPoint: API_END_POINT.GET_ORDER_PLACED_DETAIL,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onFetchedOrderDetailSuccessReducer.type,
    body: formData
  })
}