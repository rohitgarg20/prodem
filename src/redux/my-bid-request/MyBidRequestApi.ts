import { API_END_POINT } from "../../common/ApiConstant"
import { apiDispatch } from "../../network/DispatchApiCall"
import {  onBidRequestDataApiInitiate, onBidRequestDataApiSuccess, onBidRequestDataApiFailure, } from './MyBidRequestSlice'

export const fetchMyBidRequestApiData = (type) => {
  
    apiDispatch({
      endPoint: API_END_POINT.BID_REQUEST + '/' + type,
      method: 'POST',
      body: {type: type},
      onStart: onBidRequestDataApiInitiate.type,
      onSuccess: onBidRequestDataApiSuccess.type,
      onFailure: onBidRequestDataApiFailure.type,
      showLoaderOnScreen: true
    })
  
  }