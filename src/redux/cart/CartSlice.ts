import { createSlice } from '@reduxjs/toolkit'
import { find, get, isEmpty, reduce } from 'lodash'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { icons } from '../../common/Icons'
import { ICartItemComponent } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { getProductIdFromPayload } from '../../utils/app-utils'


interface ICartState {
  cartList?: Record<string, ICartItemComponent>
}

const initialState: ICartState  = {
  cartList: {}
}

const cartItemMapper = (cartItem) => {
  return {
    productId: cartItem?.product_id,
    productName: cartItem?.product_name,
    displayPrice: cartItem?.product_offer_price,
    productImage: cartItem?.product_image || icons.DEFAULT_IMAGE,
    quantity: cartItem?.user_cart_qty,
    cartId: cartItem?.user_cart_id,
    qtyNonEditable: true
  }
}

const onFetchedCartListSuccess = (state: ICartState, { payload }) => {
  const { responseData } = payload
  const cartList = get(responseData, 'data.items', [])
  log('cartListcartList', cartList)
  const cartListData = reduce(cartList, (accumulator: any, cartItem: any) => {
    const productId = cartItem?.product_id
    log('productIdproductId', productId)
    if(isEmpty(accumulator?.[productId])) {
      accumulator = {
        ...accumulator,
        [productId]: cartItemMapper(cartItem)
      }
    }
    return accumulator
  }, {})

  log('cartListDatacartListData', cartListData)

  state.cartList = cartListData
}


const onAddNewProductInCart = (state: ICartState, { payload }) => {
  const { responseData, requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  const updatedCartList = get(responseData, 'data.cartDetails.items', [])
  log('onAddNewProductInCart', updatedCartList)
  const cartData = find(updatedCartList, (cartItem) => cartItem?.product_id === productId)
  log('onAddNewProductInCart', cartData)

  const cartDataMapper = cartItemMapper(cartData)
  log('onAddNewProductInCart', cartDataMapper)

  state.cartList = {
    ...state.cartList,
    [productId]: cartDataMapper
  }
  genericDrawerController.closeGenericDrawerModal()
}

const onRemoveProductFromCart = (state: ICartState, { payload }) => {
  const { responseData, requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  if(state.cartList?.[productId]) {
    delete state.cartList?.[productId]
  }
}

const onRemoveProductFailureFromCart = (state: ICartState, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
  log('payloadpayload', payload)
}


const cartSlice = createSlice({
  name: ReducerName.CART_DETAIL,
  initialState,
  reducers: {
    onFetchedCartListSuccessReducer: onFetchedCartListSuccess,
    onAddNewProductInCartReducer: onAddNewProductInCart,
    onRemoveProductFromCartReducer: onRemoveProductFromCart,
    onRemoveProductFailureFromCartReducer: onRemoveProductFailureFromCart
  }

})

export const { onFetchedCartListSuccessReducer, onAddNewProductInCartReducer, onRemoveProductFromCartReducer,
  onRemoveProductFailureFromCartReducer } = cartSlice.actions

export default cartSlice.reducer