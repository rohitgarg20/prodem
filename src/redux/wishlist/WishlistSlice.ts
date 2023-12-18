import { createSlice } from '@reduxjs/toolkit'
import { find, get, isEmpty, reduce } from 'lodash'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { ICartItemComponent } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { currencyCoverter, getProductIdFromPayload, tString } from '../../utils/app-utils'
import { ToastAndroid } from 'react-native'


interface IWishlistState {
  wishList?: Record<string, ICartItemComponent>
}

const initialState: IWishlistState  = {
  wishList: {}
}

const wishlistItemMapper = (cartItem) => {
  return {
    productId: cartItem?.product_id,
    productName: cartItem?.product_name,
    displayPrice: currencyCoverter(cartItem?.product_offer_price),
    productImage: cartItem?.product_image || icons.DEFAULT_IMAGE,
    quantity: 'N/A',
    cartId: cartItem?.user_wishlist_id,
    qtyNonEditable: true
  }
}

const onFetchedWishListSuccess = (state: IWishlistState, { payload }) => {
  const { responseData } = payload
  const wishList = get(responseData, 'data.items', [])
  log('cartListcartList', wishList)
  const cartListData = reduce(wishList, (accumulator: any, wishListItem: any) => {
    const productId = wishListItem?.product_id
    log('productIdproductId', productId)
    if(isEmpty(accumulator?.[productId])) {
      accumulator = {
        ...accumulator,
        [productId]: wishlistItemMapper(wishListItem)
      }
    }
    return accumulator
  }, {})

  log('cartListDatacartListData', cartListData)

  state.wishList = cartListData
}


const onAddNewProductInWishList = (state: IWishlistState, { payload }) => {
  const { responseData, requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  const updatedCartList = get(responseData, 'data.cartDetails.items', [])
  log('onAddNewProductInCart', updatedCartList)
  const wishlistData = find(updatedCartList, (wishListItem) => wishListItem?.product_id === productId)
  log('onAddNewProductInCart', wishlistData)

  const cartDataMapper = wishlistItemMapper(wishlistData)
  log('onAddNewProductInCart', cartDataMapper)

  state.wishList = {
    ...state.wishList,
    [productId]: cartDataMapper
  }
  genericDrawerController.closeGenericDrawerModal()
}

const onRemoveProductFromWishList = (state: IWishlistState, { payload }) => {
  const { responseData, requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  if(state.wishList?.[productId]) {
    delete state.wishList?.[productId]
  }
}

const onRemoveProductFailureFromWishlist = (state: IWishlistState, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)

  log('payloadpayload', payload)
}


const wishListSlice = createSlice({
  name: ReducerName.WISHLIST,
  initialState,
  reducers: {
    onFetchedWishListSuccessReducer: onFetchedWishListSuccess,
    onAddNewProductInWishListReducer: onAddNewProductInWishList,
    onRemoveProductFromWishListReducer: onRemoveProductFromWishList,
    onRemoveProductFailureFromWishListReducer: onRemoveProductFailureFromWishlist
  }

})

export const { onFetchedWishListSuccessReducer, onAddNewProductInWishListReducer, onRemoveProductFromWishListReducer,
  onRemoveProductFailureFromWishListReducer } = wishListSlice.actions

export default wishListSlice.reducer