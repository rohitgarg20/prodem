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