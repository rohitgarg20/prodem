import { createSlice } from '@reduxjs/toolkit'
import { findIndex, get } from 'lodash'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IProductDetailScreen } from '../../common/Interfaces'
import { getFormattedDate, getProductIdFromPayload, getProductType } from '../../utils/app-utils'
import { onAddNewProductInCartReducer, onRemoveProductFromCartReducer } from '../cart/CartSlice'
import { showAndroidToastMessage } from '../../common/Toast'
import { CART_MESSAGES } from '../../common/strings'


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
    userMobile: productDetails?.p_user_mobile
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
      const { requestData } = action?.payload || {}
      const productId = getProductIdFromPayload(requestData)
      if(productId === state?.productDetail?.productId) {
        state.isProductInCart = true
        showAndroidToastMessage(CART_MESSAGES.ITEM_SUCCESS)
      }
    })
    builder.addCase(onRemoveProductFromCartReducer, (state, action: any) => {
      const { requestData } = action?.payload || {}
      const productId = getProductIdFromPayload(requestData)
      if(productId === state?.productDetail?.productId) {
        state.isProductInCart = false
        showAndroidToastMessage(CART_MESSAGES.REMOVE_SUCCESS)
      }
    })
  }
})

export const {
  onProductDetailApiSuccessResponseReducer, resetProductDetailReducer
} = productDetailSlice.actions

export default productDetailSlice.reducer