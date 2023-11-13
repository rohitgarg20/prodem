import { createSlice } from '@reduxjs/toolkit'
import { find, findIndex, get, isEmpty } from 'lodash'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IProductDetailScreen } from '../../common/Interfaces'
import { CART_MESSAGES, WISHLIT_MESSAGES } from '../../common/strings'
import { showAndroidToastMessage } from '../../common/Toast'
import { getFormattedDate, getProductIdFromPayload, getProductType } from '../../utils/app-utils'
import { onAddNewProductInCartReducer, onRemoveProductFromCartReducer } from '../cart/CartSlice'
import { onAddNewProductInWishListReducer, onRemoveProductFromWishListReducer } from '../wishlist/WishlistSlice'


interface IProductDetail {
  productDetail?: IProductDetailScreen
  isProductInCart?: boolean
  isProductInWishlist?: boolean
}


const initialState: IProductDetail = {
  productDetail: undefined,
  isProductInCart: false,
  isProductInWishlist: false
}

const onProductDetailApiSuccessResponse = (state: IProductDetail, { payload }) => {
  log('onProductDetailApiSuccessResponse', payload)
  const { responseData } = payload
  const productDetails = get(responseData, 'data.product', {})
  const cartDetails: any = get(responseData, 'data.cartDetails.items', [])
  const loggedInUserId = get(payload, 'extraParams.loggedInUserId', '')
  const imageGallery = productDetails?.product_slides?.split(',') || [icons.DEFAULT_IMAGE]
  const productId = productDetails?.product_id
  const formattedProductDetail = {
    productId,
    productImage: imageGallery?.[0] || icons.DEFAULT_IMAGE,
    productName: productDetails?.product_name,
    displayPrice: productDetails?.product_offer_price,
    actualPrice: productDetails?.product_price,
    productViews: (productDetails?.product_views || 0).toString(),
    imageGallery: imageGallery,
    color: productDetails?.color_name || 'N/A',
    type: getProductType(productDetails?.product_type),
    brand: productDetails?.company_name,
    createdAt: getFormattedDate(productDetails?.product_created_at),
    userMobile: productDetails?.p_user_mobile,
    description: productDetails?.product_details || '',
    isProductByLoogedInUser: loggedInUserId === productDetails?.product_user_id
  }
  state.productDetail = formattedProductDetail
  state.isProductInWishlist = productDetails?.user_wishlist_product_id === productId
  const isProductInCart = findIndex(cartDetails, (item: any) => item?.product_id === productId)
  state.isProductInCart = isProductInCart !== -1
}

const resetProductDetail = (state: IProductDetail) => {
  state.isProductInCart = false
  state.isProductInWishlist = false
  state.productDetail = undefined
}


export const productDetailSlice = createSlice({
  name: ReducerName.PRODUCT_DETAIL,
  initialState,
  reducers: {
    onProductDetailApiSuccessResponseReducer: onProductDetailApiSuccessResponse,
    resetProductDetailReducer: resetProductDetail
  },
  extraReducers: (builder) => {
    builder.addCase(onAddNewProductInCartReducer, (state, action: any) => {
      const { responseData } = action?.payload || {}
      log('extraReducersextraReducers from onAddNewProductInCartReducer', state, action, state?.productDetail?.productId, state?.productDetail)
      if(state?.productDetail?.productId) {
        log('extraReducersextraReducers from onAddNewProductInCartReducer if', state, action)
        const addedProductDetail = find(get(responseData, 'data.cartDetails.items', []), (cartItem) => cartItem.product_id === state?.productDetail?.productId)
        log('addedProductDetailaddedProductDetail', addedProductDetail)
        if(!isEmpty(addedProductDetail)) {
          state.isProductInCart = true
          showAndroidToastMessage(CART_MESSAGES.ITEM_SUCCESS)
        } else {
          showAndroidToastMessage(CART_MESSAGES.FAILURE)
        }
      }
    })
    builder.addCase(onRemoveProductFromCartReducer, (state, action: any) => {
      log('extraReducersextraReducers from onRemoveProductFromCartReducer', state, action)
      const { requestData, responseData } = action?.payload || {}
      const productRemovedFromCart = find(get(responseData, 'data.cartDetails.items', []), (cartItem) => cartItem.product_id === state?.productDetail?.productId) || {}
      log('extraReducersextraReducers from onRemoveProductFromCartReducer', productRemovedFromCart, get(responseData, 'data.cartDetails.items', []))
      if(state?.productDetail?.productId) {
        log('extraReducersextraReducers from onRemoveProductFromCartReducer', productRemovedFromCart, isEmpty(productRemovedFromCart), typeof productRemovedFromCart)

        if(isEmpty(productRemovedFromCart)) {
          log('extraReducersextraReducers from onRemoveProductFromCartReducer', productRemovedFromCart)
          state.isProductInCart = false
          showAndroidToastMessage(CART_MESSAGES.REMOVE_SUCCESS)
        } else {
          log('extraReducersextraReducers from onRemoveProductFromCartReducer', productRemovedFromCart)
          showAndroidToastMessage(CART_MESSAGES.FAILURE_REMOVE)
        }
      }
    })
    builder.addCase(onAddNewProductInWishListReducer, (state, action: any) => {
      const { responseData } = action?.payload || {}
      log('extraReducersextraReducers onAddNewProductInWishListReducer', state, action)
      const isAddedInWishlist = get(responseData, 'data.wishlistDetails.user_wishlist_product_id', '').toString() === (state?.productDetail?.productId || '')?.toString()
      if(isAddedInWishlist) {
        state.isProductInWishlist = true
        showAndroidToastMessage(WISHLIT_MESSAGES.ITEM_SUCCESS)
      } else {
        showAndroidToastMessage(WISHLIT_MESSAGES.FAILURE)
      }
    })
    builder.addCase(onRemoveProductFromWishListReducer, (state, action: any) => {
      const { responseData } = action?.payload || {}
      state.isProductInWishlist = false
      showAndroidToastMessage(WISHLIT_MESSAGES.REMOVE_SUCCESS)
      // const isRemovedFromWishlist = get(responseData, 'data.wishlistDetails.user_wishlist_product_id', '').toString() === (state?.productDetail?.productId || '')?.toString()
      // if(isRemovedFromWishlist) {
      //   state.isProductInWishlist = false
      //   showAndroidToastMessage(WISHLIT_MESSAGES.REMOVE_SUCCESS)
      // } else {
      //   showAndroidToastMessage(WISHLIT_MESSAGES.FAILURE_REMOVE)
      // }
    })
  }
})

export const {
  onProductDetailApiSuccessResponseReducer, resetProductDetailReducer
} = productDetailSlice.actions

export default productDetailSlice.reducer