import { API_END_POINT } from "../../common/ApiConstant"
import { apiDispatch } from "../../network/DispatchApiCall"
import {  onWinningBidDataApiInitiate, onWinningBidDataApiSuccess, onWinningBidDataApiFailure, } from './WinningBidSlice'

export const fetchWinningBidApiData = (type) => {
  
    apiDispatch({
      endPoint: API_END_POINT.WINNING_BID + '/' + type,
      method: 'POST',
      body: {type: type},
      onStart: onWinningBidDataApiInitiate.type,
      onSuccess: onWinningBidDataApiSuccess.type,
      onFailure: onWinningBidDataApiFailure.type,
      showLoaderOnScreen: true
    })
  
  }