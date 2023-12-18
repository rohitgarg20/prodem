import { createSlice } from '@reduxjs/toolkit'
import { find, get, isEmpty, reduce } from 'lodash'

import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { ICartItemComponent } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { currencyCoverter, getProductIdFromPayload, tString } from '../../utils/app-utils'


interface ICartState {
  cartList?: Record<string, ICartItemComponent>
  isFetching: boolean
}

const initialState: ICartState  = {
  cartList: {},
  isFetching: true
}

const cartItemMapper = (cartItem) => {
  return {
    productId: cartItem?.product_id,
    productName: cartItem?.product_name,
    displayPrice: currencyCoverter(cartItem?.product_offer_price),
    productImage: cartItem?.product_image || icons.DEFAULT_IMAGE,
    quantity: cartItem?.user_cart_qty,
    cartId: cartItem?.user_cart_id,
    qtyNonEditable: true
  }
}

const onFetchedCartListSuccess = (state: ICartState, { payload }) => {
  const { responseData } = payload
  const cartList = get(responseData, 'data.items', [])
  const cartListData = reduce(cartList, (accumulator: any, cartItem: any) => {
    const productId = cartItem?.product_id
    if(isEmpty(accumulator?.[productId])) {
      accumulator = {
        ...accumulator,
        [productId]: cartItemMapper(cartItem)
      }
    }
    return accumulator
  }, {})

  state.cartList = cartListData
  state.isFetching = false
}


const onAddNewProductInCart = (state: ICartState, { payload }) => {
  const { responseData, requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  const updatedCartList = get(responseData, 'data.cartDetails.items', [])
  const cartData = find(updatedCartList, (cartItem) => cartItem?.product_id === productId)
  if(!isEmpty(cartData)) {
    const cartDataMapper = cartItemMapper(cartData)
    state.cartList = {
      ...state.cartList,
      [productId]: cartDataMapper
    }
  }
  genericDrawerController.closeGenericDrawerModal()
}

const onRemoveProductFromCart = (state: ICartState, { payload }) => {
  const { requestData } = payload
  const productId = getProductIdFromPayload(requestData)
  if(state.cartList?.[productId]) {
    delete state.cartList?.[productId]
    showAndroidToastMessage('MultiLanguageString.PRODUCT_REMOVED')
  }
}

const onRemoveProductFailureFromCart = (state: ICartState, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)
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