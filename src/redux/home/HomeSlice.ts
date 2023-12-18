import { createSlice } from '@reduxjs/toolkit'
import { get, map } from 'lodash'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { ICategoryCardComponent, IProductCardComponent } from '../../common/Interfaces'
import { currencyCoverter } from '../../utils/app-utils'

interface IHomeData {
  categories: ICategoryCardComponent[]
  productList: IProductCardComponent[]
  productListPageNumber: number
  productListTotalPage: number
  isFetching: boolean
}

const initialState: IHomeData = {
  categories: [],
  productList: [],
  productListPageNumber: 1,
  productListTotalPage: 0,
  isFetching: false
}

const onHomeApiSuccessResponse = (state: IHomeData, { payload }) => {
  const { responseData } = payload
  log('onHomeApiSuccessResponse', responseData)
  const categoriesData = get(responseData, 'data.categories', [])
  state.categories = map(categoriesData, (category) => {
    return {
      categoryId: category?.category_id,
      categoryName: category?.category_name,
      categoryImage: category?.category_image || icons.DEFAULT_IMAGE
    }
  })


}

const onHomeApiFailureResponse = (state: IHomeData, { payload }) => {
  const { error } = payload
}

const onProductApiSuccessResponse = (state: IHomeData, { payload }) => {
  const { responseData } = payload
  const productData = get(responseData, 'data.products', [])
  const imagesList: any  = []
  const productList = map(get(productData, 'data', []), (productItem) => {
    imagesList.push(productItem?.product_image)
    return {
      productId: productItem?.product_id,
      productName: productItem?.product_name,
      productSubCategory: productItem?.product_subcategory,
      displayPrice: currencyCoverter(productItem?.product_offer_price),
      quantity: productItem?.product_qty,
      productImage: productItem?.product_image,
      productViews: productItem?.product_views || 0,
      companyLogo: icons.MY_COMPANY_LOGO,
      companyName: productItem?.company_name,
      categoryId: productItem?.category_id,
      categoryName: productItem?.category_name
    }
  })
  state.productList = [...state.productList, ...productList]
  state.productListPageNumber = state.productListPageNumber + 1
  state.productListTotalPage = productData.last_page
  state.isFetching = false
}

const resetProductListData = (state: IHomeData) => {
  state.productList = []
  state.productListPageNumber = 1
  state.productListTotalPage = 0
}

const updateFetchingStatus = (state: IHomeData) => {
  state.isFetching = true
}

const updateFetchingStatusFailure = (state: IHomeData) => {
  state.isFetching = false
}

export const homeSlice = createSlice({
  name: ReducerName.HOME,
  initialState,
  reducers: {
    onHomeApiSuccessReducer: onHomeApiSuccessResponse,
    onHomeApiFailureResponseReducer: onHomeApiFailureResponse,
    onProductApiSuccessResponseReducer: onProductApiSuccessResponse,
    resetProductListReducer: resetProductListData,
    updateFetchingStatusReducer: updateFetchingStatus,
    updateFetchingStatusFailureReducer: updateFetchingStatusFailure
  }
})

export const {
  onHomeApiSuccessReducer,  onHomeApiFailureResponseReducer, onProductApiSuccessResponseReducer,
  resetProductListReducer, updateFetchingStatusReducer, updateFetchingStatusFailureReducer
} = homeSlice.actions

export default homeSlice.reducer