import { onHomeApiFailureResponseReducer, onHomeApiSuccessReducer, onProductApiSuccessResponseReducer,
  updateFetchingStatusReducer, updateFetchingStatusFailureReducer
} from './HomeSlice'
import { onProductDetailApiSuccessResponseReducer } from './ProductDetailSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'


export const fetchCategoriesAndBrandData = () => {
  apiDispatch({
    method: 'GET',
    endPoint: API_END_POINT.GET_CATEGORIES_BRAND_DATA,
    showLoaderOnScreen: true,
    onFailure: onHomeApiFailureResponseReducer.type ,
    onSuccess: onHomeApiSuccessReducer.type
  })
}

export const fetchProductListData = ({
  categoryId, page, cancelToken, search, signal = undefined, sortBy = ''
}: {
  categoryId: any
  page: number
  cancelToken: any
  search: string
  signal?: any
  sortBy?: string
}) => {

  const formData = new FormData()
  if(!!categoryId) {
    formData.append('category', categoryId)
  }
  formData.append('page', page)
  if(search.length) {
    formData.append('search', search)
  }
  if(sortBy.length) {
    formData.append('sort_by', sortBy)
  }
  // formData.append('subcategory', 1)

  apiDispatch({
    method: 'POST',
    endPoint: API_END_POINT.GET_PRODUCT_LIST,
    showLoaderOnScreen: page === 1,
    body: formData,
    // onFailure: onProductApiSuccessResponse.type ,
    onSuccess: onProductApiSuccessResponseReducer.type,
    onStart: updateFetchingStatusReducer.type,
    onFailure: updateFetchingStatusFailureReducer.type,
    cancelToken,
    signal
  })
}

export const fetchProductDetail = ({
  productId,
  cancelToken
}) => {

  const formData = new FormData()
  formData.append('product_id', productId)

  apiDispatch({
    method: 'POST',
    endPoint: API_END_POINT.GET_PRODUCT_DETAIL,
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: onProductDetailApiSuccessResponseReducer.type,
    cancelToken
  })
}