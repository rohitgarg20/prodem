import { createSlice } from '@reduxjs/toolkit'
import { filter, get, map } from 'lodash'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IProductCardComponent } from '../../common/Interfaces'
import { getSellerProductImagesUrl, handleApiFailure } from '../../utils/app-utils'

interface ISellerAds {
  productList: IProductCardComponent[]
  isFetching: boolean
  totalProducts: number
  currentPageNumber: number
}

const initialState: ISellerAds = {
  productList: [],
  isFetching: true,
  totalProducts: 0,
  currentPageNumber: 1
}

const onProductApiSuccessResponse = (state: ISellerAds, { payload }) => {
  const { responseData } = payload
  const productResponseData = get(responseData, 'data.records', {})
  const productListData = get(productResponseData, 'data', [])
  const totalProducts = get(productResponseData, 'total', 0)
  const productList = map(productListData, (productItem) => {
    const imagesList: any  = productItem?.product_image?.split(',').map((item) => getSellerProductImagesUrl(item)) || []
    return {
      productId: productItem?.product_id,
      productName: productItem?.product_name,
      productSubCategory: productItem?.product_subcategory,
      displayPrice: productItem?.product_offer_price,
      quantity: (productItem?.product_qty || 0),
      productImage: imagesList?.[0],
      productViews: productItem?.product_views || 0,
      companyLogo: icons.MY_COMPANY_LOGO,
      companyName: productItem?.company_name,
      categoryId: productItem?.category_id,
      categoryName: productItem?.category_name,
      productQty: productItem?.product_qty,
      productDescription: productItem?.product_details,
      subcategoryName: productItem?.subcategory_name,
      subCategoryId: productItem?.subcategory_id,
      productType: productItem?.product_type,
      productSlides: imagesList,
      vehicles: get(productItem, `vehicles[${0}]`, {})
    }
  })

  log('productListproductListproductList', productList)


  state.productList = [...state.productList, ...productList]
  state.isFetching = false
  state.totalProducts = totalProducts
  state.currentPageNumber = get(productResponseData, 'current_page', 0)
}

const onProductDetailApiSuccessResponse = (state: ISellerAds, { payload }) => {
  const { responseData } = payload
  const productItem: any = get(responseData, 'data.product', {})
  const imagesList: any  = productItem?.product_image?.split(',').map((item) => getSellerProductImagesUrl(item)) || []
  const productDetail = {
    productId: productItem?.product_id,
    productName: productItem?.product_name,
    productSubCategory: productItem?.product_subcategory,
    displayPrice: productItem?.product_offer_price,
    quantity: (productItem?.product_qty || 0),
    productImage: imagesList?.[0],
    productViews: productItem?.product_views || 0,
    companyLogo: icons.MY_COMPANY_LOGO,
    companyName: productItem?.company_name,
    categoryId: productItem?.category_id,
    categoryName: productItem?.category_name,
    productQty: productItem?.product_qty,
    productDescription: productItem?.product_details,
    subcategoryName: productItem?.subcategory_name,
    subCategoryId: productItem?.subcategory_id,
    productType: productItem?.product_type,
    productSlides: imagesList,
    vehicles: get(responseData, `data.vehicles[${0}]`, {})
  }
  state.productList = map(state.productList, (productData) => {
    if(productData.productId === productDetail.productId) {
      return productDetail
    }
    return productData
  })
}

const resetProductListData = (state: ISellerAds) => {
  state.productList = []
  state.isFetching = true
  state.totalProducts = 0
  state.currentPageNumber = 1
}

const updateFetchingStatusFailure = (state: ISellerAds) => {
  state.isFetching = false
}

const onDeleteProductItemSuccess = (state: ISellerAds, { payload }) => {
  const productId = get(payload, 'extraParams.productId', '')
  state.productList = filter(state.productList, (productItem) => productItem.productId !== productId)
  state.totalProducts = state.totalProducts  >= 1 ?  state.totalProducts - 1 : state.totalProducts
}

const onDeleteProductItemFailure= (state: ISellerAds, { payload }) => {
  handleApiFailure(payload)
}


export const sellerAdsSlice = createSlice({
  name: ReducerName.SELLER_ADS_REDUCER,
  initialState,
  reducers: {
    onProductApiSuccessResponseReducer: onProductApiSuccessResponse,
    resetProductListDataReducer: resetProductListData,
    updateFetchingStatusFailureReducer: updateFetchingStatusFailure,
    onDeleteProductItemSuccessReducer: onDeleteProductItemSuccess,
    onDeleteProductItemFailureReducer: onDeleteProductItemFailure,
    onProductDetailApiSuccessResponseReducer: onProductDetailApiSuccessResponse
  }
})

export const {
  onProductApiSuccessResponseReducer, resetProductListDataReducer, updateFetchingStatusFailureReducer,
  onDeleteProductItemSuccessReducer, onDeleteProductItemFailureReducer, onProductDetailApiSuccessResponseReducer
} = sellerAdsSlice.actions

export default sellerAdsSlice.reducer