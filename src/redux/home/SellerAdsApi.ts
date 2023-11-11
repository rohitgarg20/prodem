import { onProductApiSuccessResponseReducer, updateFetchingStatusFailureReducer, onDeleteProductItemSuccessReducer,
  onDeleteProductItemFailureReducer } from './SellerAds'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'


export const fetchSellerProductList = ({
  signal = undefined, showLoaderOnScreen = true
}) => {
  apiDispatch({
    method: 'POST',
    endPoint: API_END_POINT.GET_SELLER_PRODUCT_LIST,
    showLoaderOnScreen,
    onSuccess: onProductApiSuccessResponseReducer.type,
    onFailure: updateFetchingStatusFailureReducer.type,
    signal
  })
}

export const deleteProduct = (productId) => {
  const formData = new FormData()
  formData.append('product_id', productId)
  apiDispatch({
    method: 'POST',
    endPoint: API_END_POINT.DELETE_PRODUCT,
    showLoaderOnScreen: true,
    onSuccess: onDeleteProductItemSuccessReducer.type,
    onFailure: onDeleteProductItemFailureReducer.type,
    body: formData,
    extraParams: {
      productId: productId.toString()
    }
  })
}
