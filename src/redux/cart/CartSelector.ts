import { createSelector } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

export const getCartData = (state) => {
  return state.cartReducer.cartList
}

export const getCartListSelector = createSelector(
  getCartData,
  (cartData) => !isEmpty(cartData) ? Object.keys(cartData) : []
)