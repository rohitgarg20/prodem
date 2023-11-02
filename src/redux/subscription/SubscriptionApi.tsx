import { subscriptionApiSuccessResponseReducer } from './SubscriptionSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'

export const getSubscriptionPlans = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_SUBSCRIPTION_PLANS,
    method: 'GET',
    showLoaderOnScreen: true,
    onSuccess: subscriptionApiSuccessResponseReducer.type
  })
}