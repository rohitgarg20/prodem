import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store/DataStore'


export const partRequestDetailSelector = (state: RootState) => {
  const partRequestDetail = state.partRequestDetailReducer.activePartRequestId
  if(partRequestDetail) {
    return state.partRequestDetailReducer.partRequestDetail[partRequestDetail]
  }
  return {}
}

export const getBasicDetail = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.basicDetail
)

export const getCompanyDetail = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.companyDetail
)

export const getBiddingList = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.biddingList
)

export const isAddedInWishlist = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.isAddedInWishlistByUser
)

export const isPartRequestIgnored = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.isIgnoredByUser
)

export const isWishlistStatusChanged = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.initialAddedInWishlist !== partRequestDetail?.isAddedInWishlistByUser
)

export const isRequestIgnoredStatusChanged = createSelector(
  partRequestDetailSelector,
  (partRequestDetail) => partRequestDetail?.initialIgnoreValue !== partRequestDetail?.isIgnoredByUser
)