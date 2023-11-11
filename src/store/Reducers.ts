import { combineReducers } from '@reduxjs/toolkit'

import addPartReducer from '../redux/add-part/AddPartSlice'
import askPartSliceReducer from '../redux/ask-part/AskPartSlice'
import cartReducer from '../redux/cart/CartSlice'
import { checkUserExistanceReducer } from '../redux/CheckUserExistance/UserExistanceSlice'
import homeReducer from '../redux/home/HomeSlice'
import productDetailReducer from '../redux/home/ProductDetailSlice'
import { loaderReducer } from '../redux/LoaderDataStore/LoaderSlice'
import loginReducer from '../redux/login/LoginSlice'
import myBidRequestReducer from '../redux/my-bid-request/MyBidRequestSlice'
import myPartRequestListReducer from '../redux/my-part-request/MyPartRequestListSlice'
import notificationReducer from '../redux/notification/NotificationSlice'
import orderPlacedDetailReducer from '../redux/order-placed/OrderPlacedDetailSlice'
import orderPlacedReducer from '../redux/order-placed/OrderPlacedSlice'
import OrderReceivedDetailReducer from '../redux/order-recieved/OrderReceivedDetailSlice'
import OrderRecievedReducer from '../redux/order-recieved/OrderRecievedSlice'
import otpVerificationReducer from '../redux/OtpVerification/OtpVerificationSlice'
import partRequestReducer from '../redux/part-request/PartRequestSlice'
import partRequestDetailReducer from '../redux/part-request-detail/PartRequestDetailSlice'
import profileReducer from '../redux/profile/ProfileSlice'
import ratingsReducer from '../redux/ratings/RatingsSlice'
import signupReducer from '../redux/Signup/SignupSlice'
import subscriptionReducer from '../redux/subscription/SubscriptionSlice'
import winningBidReducer from '../redux/winning-bid/WinningBidSlice'
import wishListReducer from '../redux/wishlist/WishlistSlice'


export const reducers = combineReducers({
  checkUserExistanceReducer,
  loaderReducer: loaderReducer,
  signupReducer,
  otpVerificationReducer,
  loginReducer,
  addPartReducer,
  homeReducer,
  productDetailReducer,
  cartReducer,
  askPartSliceReducer,
  ratingsReducer,
  subscriptionReducer,
  profileReducer,
  winningBidReducer,
  myBidRequestReducer,
  partRequestReducer,
  partRequestDetailReducer,
  OrderRecievedReducer,
  orderPlacedReducer,
  wishListReducer,
  myPartRequestListReducer,
  OrderReceivedDetailReducer,
  orderPlacedDetailReducer,
  notificationReducer
})


