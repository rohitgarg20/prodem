import { createSlice } from '@reduxjs/toolkit'

import {  ReducerName } from '../../common/Constant'

const initialState: IBidRequestStore = {}

const onBidRequestDataApiInitiateReducer = (state: IBidRequestStore, { payload }) => {
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
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
  return state

}

const onBidRequestDataApiSuccessReducer = (state: IBidRequestStore, { payload }) => {
  const { responseData : { data: responseData = {} } = {} } = payload
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
  const listData = responseData?.bids?.map(item => {

    return {
      bidId: item?.partoffer_bid_id,
      parentBidId: item?.partoffer_bid_parent_id,
      userId: item?.partoffer_bid_user_id,
      title: item?.partoffer_bid_title_text,
      price: item?.partoffer_bid_price,
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

  if(type) {
    state[type].list = [...listData]
    state[type].isFetchingData = false
    state[type].hasApiError = false
  }

  return state
}

const onBidRequestDataApiFailureReducer = (state: IBidRequestStore, { payload }) => {
  const { requestData : { body = {} } = {} } = payload || {}
  const { type  = ''} = body
  if(type) {
    state[type].isFetchingData = false
    state[type].hasApiError = true
  }
  return state

}

const resetData = (state: IBidRequestStore) => {
  state = {}
  return state
}


export const bidRequestSlice = createSlice({
  name: ReducerName.BID_REQUEST,
  initialState,
  reducers: {
    onBidRequestDataApiInitiate: onBidRequestDataApiInitiateReducer,
    onBidRequestDataApiSuccess: onBidRequestDataApiSuccessReducer,
    onBidRequestDataApiFailure: onBidRequestDataApiFailureReducer,
    resetMyBidRequestDataReducer: resetData
  }
})

export const { onBidRequestDataApiInitiate, onBidRequestDataApiSuccess, onBidRequestDataApiFailure, resetMyBidRequestDataReducer } = bidRequestSlice.actions

export default bidRequestSlice.reducer