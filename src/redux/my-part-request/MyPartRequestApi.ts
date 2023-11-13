import { onFetchedPartRequestApiSuccessReducer, onCancelPartRequestSuccessReducer } from './MyPartRequestListSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'
import { onFetchedBidOptionsSuccessReducer } from '../part-request-detail/PartRequestDetailSlice'


export const fetchMyPartRequestList = (status = 'requests') => {
  apiDispatch({
    endPoint: API_END_POINT.MY_PART_REQUEST_LIST + status,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onFetchedPartRequestApiSuccessReducer.type
  })
}

export const fetchBiddingOptions = async () => {
  apiDispatch({
    endPoint: API_END_POINT.FETCH_BIDDING_OPTIONS,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onFetchedBidOptionsSuccessReducer.type
  })
}

export const cancelMyPartRequest = (partRequestId: number) => {
  const formData = new FormData()
  formData.append('partrequest_id', partRequestId)
  apiDispatch({
    endPoint: API_END_POINT.CANCEL_MY_PART_REQUEST,
    method: 'POST',
    showLoaderOnScreen: true,
    onSuccess: onCancelPartRequestSuccessReducer.type,
    body: formData,
    extraParams: {
      partRequestId
    }
  })
}