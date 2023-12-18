import { createSlice } from '@reduxjs/toolkit'

import { log } from '../../common/config/log'
import {  ReducerName } from '../../common/Constant'
import { currencyCoverter } from '../../utils/app-utils'

const initialState: IWinningBidStore = {}

const onWinningBidDataApiInitiateReducer = (state: IWinningBidStore, { payload }) => {
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
  log('onWinningBidDataApiInitiateReducer: ', body, type, state)
  if(type) {
    state = {
      ...state,
      [type] : {
        isFetchingData: true,
        hasApiError: false,
        list: []
      }
    }
  }
  log('state: ', state)
  return state

}

const onWinningBidDataApiSuccessReducer = (state: IWinningBidStore, { payload }) => {
  const { responseData : { data: responseData = {} } = {} } = payload
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
  log('onWinningBidDataApiSuccessReducer 1 : ', responseData)
  const listData = responseData?.bids?.map(item => {

    return {
      bidId: item?.partoffer_bid_id,
      parentBidId: item?.partoffer_bid_parent_id,
      userId: item?.partoffer_bid_user_id,
      title: item?.partoffer_bid_title_text,
      price: currencyCoverter(item?.partoffer_bid_price),
      privateRemark: item?.partoffer_bid_private_remark,
      createdAt: item?.partoffer_bid_created_at,
      updatedAt: item?.partoffer_bid_updated_at,
      requestTitle: item?.partrequest_title,
      requestVehicle: item?.partrequest_vehicle,
      requestYear: item?.partrequest_year,
      requestVarient : item?.partrequest_varient,
      requestEngine: item?.partrequest_engines,
      requestDeliveryLocation: item?.partrequest_delivery_location,
      requestCreatedAt: item?.partrequest_created_at,
      companyName: item?.company_name,
      companyTrade: item?.company_trade
    }
  })

  log('onWinningBidDataApiSuccessReducer 2 : ', listData)
  log('state 3: ', state, type)
  if(type) {
    state[type].list = [...listData]
    state[type].isFetchingData = false
    state[type].hasApiError = false
  }

  return state
}

const onWinningBidDataApiFailureReducer = (state: IWinningBidStore, { payload }) => {
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
  if(type) {
    state[type].isFetchingData = false
    state[type].hasApiError = true
  }
  return state

}

const resetData = (state: IWinningBidStore) => {
  state = {}
  return state
}


export const ratingSlice = createSlice({
  name: ReducerName.WINNING_BID,
  initialState,
  reducers: {
    onWinningBidDataApiInitiate: onWinningBidDataApiInitiateReducer,
    onWinningBidDataApiSuccess: onWinningBidDataApiSuccessReducer,
    onWinningBidDataApiFailure: onWinningBidDataApiFailureReducer,
    resetWinningBidDataReducer: resetData
  }
})

export const { onWinningBidDataApiInitiate, onWinningBidDataApiSuccess, onWinningBidDataApiFailure, resetWinningBidDataReducer } = ratingSlice.actions

export default ratingSlice.reducer