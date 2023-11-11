import { createSlice } from '@reduxjs/toolkit'
import { filter, find, get, isEmpty, map } from 'lodash'

import { log } from '../../common/config/log'
import { RATING_API_RESPONSE_MAPPER, ReducerName } from '../../common/Constant'
import { IRatingCard, RatingTypes } from '../../common/Interfaces'
import { getDateInMDDYYYYFormat } from '../../utils/app-utils'
import { onRatingApiSuccessReducer } from '../order-recieved/OrderReceivedDetailSlice'

export type RatingTypesAllowed = RatingTypes.GIVEN | RatingTypes.PENDING | RatingTypes.RECIEVED


interface IRatingState {
  selectedRatingType: RatingTypes
  ratingData: Record<RatingTypesAllowed, IRatingCard[]>
}

const initialState: IRatingState = {
  selectedRatingType: RatingTypes.PENDING,
  ratingData: {
    [RatingTypes.GIVEN]: [],
    [RatingTypes.PENDING]: [],
    [RatingTypes.RECIEVED]: []
  }
}

const onChangeRatingType = (state: IRatingState, action) => {
  log('payloadpayloadpayload', action, action.payload)
  const { updatedRatingType }: { updatedRatingType: RatingTypes } = action.payload || {}
  log('updatedRatingTypeupdatedRatingType', updatedRatingType)
  state.selectedRatingType = updatedRatingType
}

const getFilteredOrdersList = (selectedRatingType, ratingsList) => {
  if(selectedRatingType === RatingTypes.PENDING) {
    return filter(ratingsList, (item) => item.for_the === 'toSeller')
  } else if(selectedRatingType === RatingTypes.GIVEN) {
    return filter(ratingsList, (item) => item.rating_type === 'tobuyer')
  } else {
    return filter(ratingsList, (item) => item.rating_type === 'tobuyer')
  }
}

const onRatingApiSuccessResponse = (state: IRatingState, { payload }) => {
  log('payloadpayloadpayload', payload, RATING_API_RESPONSE_MAPPER.get(state.selectedRatingType))
  const respData = get(payload, `responseData.data.${RATING_API_RESPONSE_MAPPER.get(state.selectedRatingType)}`, [])
  const isPendingTabSelected = state.selectedRatingType === RatingTypes.PENDING
  const formattedData: IRatingCard[] = map(getFilteredOrdersList(state.selectedRatingType, respData), (respItem) => {
    return {
      orderNo: respItem?.order_no,
      orderDate: getDateInMDDYYYYFormat(respItem?.date),
      ratingDesc: respItem?.rating_desc || '',
      ratingStar: respItem?.rating_star || 0,
      isRatingPending: isPendingTabSelected ,
      userName: respItem?.user_name,
      ratingType: respItem?.rating_type || respItem?.for_the,
      orderId: respItem.order_id?.toString()
    }
  })
  log('formattedDataformattedData', formattedData, state.selectedRatingType)
  state.ratingData[state.selectedRatingType] = formattedData
}

const resetData = (state: IRatingState) => {
  state.ratingData = initialState.ratingData
  state.selectedRatingType = initialState.selectedRatingType
}


export const ratingSlice = createSlice({
  name: ReducerName.RATING,
  initialState,
  reducers: {
    onChangeRatingTypeReducer: onChangeRatingType,
    onRatingApiSuccessResponseReducer: onRatingApiSuccessResponse,
    resetDataReducer: resetData
  },
  extraReducers: (builder) => {
    builder.addCase(onRatingApiSuccessReducer.type, (state, action) => {
      log('onRatingApiSuccessReducer', state, action)
      const extraParams: any = get(action, 'payload.extraParams', {})
      const orderId = extraParams?.orderId?.toString()
      const ratingPendingData = state.ratingData['rating-pending']
      const ratingGivenData = state.ratingData['rating-given']
      const updatedRatingPendingData = filter(ratingPendingData, (ratingItem) => ratingItem.orderId !== orderId)
      if(!isEmpty(ratingGivenData)) {
        const orderData = find(ratingPendingData, (ratingItem) => ratingItem.orderId === orderId)
        if(!isEmpty(orderData)) {
          orderData.ratingDesc = extraParams?.desc
          orderData.ratingStar = extraParams?.ratingGiven
          orderData.isRatingPending = false
          state.ratingData['rating-given'] = [
            ...state.ratingData['rating-given'],
            orderData
          ]
        }
      }
      state.ratingData['rating-pending'] = updatedRatingPendingData
    })
  }
})

export const { onChangeRatingTypeReducer, onRatingApiSuccessResponseReducer, resetDataReducer } = ratingSlice.actions

export default ratingSlice.reducer