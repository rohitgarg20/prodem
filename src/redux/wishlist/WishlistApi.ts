
import {
  onFetchedWishListSuccessReducer, onAddNewProductInWishListReducer, onRemoveProductFromWishListReducer,
  onRemoveProductFailureFromWishListReducer
} from './WishlistSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'


export const getWishlistDetails = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_WISHLIST_DETAILS,
    method: 'PUT',
    showLoaderOnScreen: true,
    onSuccess: onFetchedWishListSuccessReducer.type
  })
}

export const addProductWishlist = ({
  productId,
  cancelToken = undefined
}: {
  productId: number
  qty?: number
  cancelToken?: any
}) => {
  const formData = new FormData()
  formData.append('product_id', productId)
  apiDispatch({
    endPoint: API_END_POINT.ADD_PRODUCT_TO_WISHLIST,
    method: 'POST',
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: onAddNewProductInWishListReducer.type,
    cancelToken
  })
}

export const removeProductFromWishlist = ({ productId, cancelToken = undefined }: {
  productId: number
  cancelToken?: any
}) => {
  const formData = new FormData()
  formData.append('product_id', productId)
  apiDispatch({
    endPoint: API_END_POINT.REMOVE_PRODUCT_FROM_WISHLIST,
    method: 'POST',
    showLoaderOnScreen: true,
    body: formData,
    onSuccess: onRemoveProductFromWishListReducer.type,
    onFailure: onRemoveProductFailureFromWishListReducer.type,
    cancelToken
  })
}