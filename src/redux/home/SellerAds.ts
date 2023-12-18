import { createSlice } from '@reduxjs/toolkit'
import { filter, get, isEmpty, map, reduce, split } from 'lodash'

import { ReducerName } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IProductCardComponent } from '../../common/Interfaces'
import { currencyCoverter, getSellerProductImagesUrl, handleApiFailure } from '../../utils/app-utils'
import { log } from '../../common/config/log'

interface ISellerAds {
  productList: IProductCardComponent[]
  isFetching: boolean
}

const initialState: ISellerAds = {
  productList: [],
  isFetching: true
}

const onProductApiSuccessResponse = (state: ISellerAds, { payload }) => {
  const { responseData } = payload
  const productListData = get(responseData, 'data.records', [])
  const productList = map(productListData, (productItem) => {
    const imagesList: any  = productItem?.product_image?.split(',').map((item) => getSellerProductImagesUrl(item)) || []
    const vehiclesList = productItem?.vehicles || []
    return {
      productId: productItem?.product_id,
      productName: productItem?.product_name,
      productSubCategory: productItem?.product_subcategory,
      displayPrice: currencyCoverter(productItem?.product_offer_price),
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
      multiSelectedDropDownItemNames: map(vehiclesList, (vehicle) => vehicle?.vehicle_name || ''),
      multiSelectedDropDownItem: map(vehiclesList, (vehicle) => vehicle?.vehicle_id || '')
    }
  })

  state.productList = productList
  state.isFetching = false
}

const resetProductListData = (state: ISellerAds) => {
  state.productList = []
  state.isFetching = true
}

const updateFetchingStatusFailure = (state: ISellerAds) => {
  state.isFetching = false
}

const onDeleteProductItemSuccess = (state: ISellerAds, { payload }) => {
  const productId = get(payload, 'extraParams.productId', '')
  state.productList = filter(state.productList, (productItem) => productItem.productId !== productId)
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
    onDeleteProductItemFailureReducer: onDeleteProductItemFailure
  }
})

export const {
  onProductApiSuccessResponseReducer, resetProductListDataReducer, updateFetchingStatusFailureReducer,
  onDeleteProductItemSuccessReducer, onDeleteProductItemFailureReducer
} = sellerAdsSlice.actions

export default sellerAdsSlice.reducer