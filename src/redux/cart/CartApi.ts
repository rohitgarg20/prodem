import {
  onFetchedCartListSuccessReducer, onAddNewProductInCartReducer, onRemoveProductFromCartReducer,
  onRemoveProductFailureFromCartReducer
} from './CartSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'
import { CancelToken } from 'axios'


export const getCartDetails = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_CART_DETAILS,
    method: 'PUT',
    showLoaderOnScreen: true,
    onSuccess: onFetchedCartListSuccessReducer.type
  })
}

export const addProductToCart = ({
  productId,
  qty = 1,
  cancelToken = undefined
}: {
  productId: number
  qty?: number
  cancelToken?: any
}) => {
  const formData = new FormData()
  formData.append('product_id', productId)
  formData.append('qty', qty)
  apiDispatch({
    endPoint: API_END_POINT.ADD_PRODUCT_TO_CART,
    method: 'POST',
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: onAddNewProductInCartReducer.type,
    cancelToken
  })
}

export const removeProductFromCart = ({ productId, cancelToken = undefined }: {
  productId: number
  cancelToken?: any
}) => {
  const formData = new FormData()
  formData.append('product_id', productId)
  apiDispatch({
    endPoint: API_END_POINT.REMOVE_PRODUCT_FROM_CART,
    method: 'POST',
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: onRemoveProductFromCartReducer.type,
    onFailure: onRemoveProductFailureFromCartReducer.type,
    cancelToken
  })
}