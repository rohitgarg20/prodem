import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store/DataStore'

export const getPartRequestReducerData = (store: RootState) => {
  return store.partRequestReducer
}

export const getPartRequestTypeListSelector = createSelector(
  getPartRequestReducerData,
  (state) => state.partRequestTypeList
)

export const getSelectedPartRequestType = createSelector(
  getPartRequestReducerData,
  (state) => state.selectedPartRequestType
)

export const getPartRequestDataSelector = createSelector(
  getPartRequestReducerData,
  getSelectedPartRequestType,
  (state, selectedPartRequestType) => state.partRequestData?.[selectedPartRequestType]
)

export const getPartRequestListDataSelector = createSelector(
  getPartRequestDataSelector,
  (partRequestData) => partRequestData?.partRequestList
)

export const getCurrentPageSelector = createSelector(
  getPartRequestDataSelector,
  (partRequestData) => partRequestData?.currentPage
)


export const getTotalPageSelector = createSelector(
  getPartRequestDataSelector,
  (partRequestData) => partRequestData?.totalPage
)

export const isProductListEmpty = createSelector(
  getPartRequestReducerData,
  (partRequestType: string) => partRequestType,
  (partRequestData, partRequestType: string) => partRequestData?.[partRequestType]?.partRequestList?.length === 0
)

