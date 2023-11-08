import { createSelector } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { RootState } from '../../store/DataStore'

export const getWishlistData = (state) => {
  return state.wishListReducer.wishList
}

export const getWishListSelector = createSelector(
  getWishlistData,
  (wishlistData) => !isEmpty(wishlistData) ? Object.keys(wishlistData) : []
)