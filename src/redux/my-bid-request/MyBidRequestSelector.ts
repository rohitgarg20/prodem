import { createSelector } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { RootState } from '../../store/DataStore'


export const getMyBidRequestDataFetchingStatusSelector = (type: string) => createSelector(
  (state: RootState) => state.myBidRequestReducer?.[type],
  (bidRequestStore: IBidRequestStore['id']) => !isEmpty(bidRequestStore) ? bidRequestStore.isFetchingData : false
)

export const getMyBidRequestDataApiStatusSelector  = (type: string) => createSelector(
  (state: RootState) => state.myBidRequestReducer?.[type],
  (bidRequestStore: IBidRequestStore['id']) => !isEmpty(bidRequestStore) ? bidRequestStore.hasApiError : false
)

export const getMyBidRequestDataListSelector  = (type: string) => createSelector(
  (state: RootState) => state.myBidRequestReducer?.[type],
  (bidRequestStore: IBidRequestStore['id']) =>  bidRequestStore?.list || []
)

export const getMyBidRequestDataCountSelector  = (type: string) => createSelector(
  (state: RootState) => state.myBidRequestReducer?.[type],
  (bidRequestStore: IBidRequestStore['id']) =>  bidRequestStore?.list?.length || 0
)


