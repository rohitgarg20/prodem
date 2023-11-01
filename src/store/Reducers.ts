import { combineReducers } from '@reduxjs/toolkit'

import addPartReducer from '../redux/add-part/AddPartSlice'
import askPartSliceReducer from '../redux/ask-part/AskPartSlice'
import cartReducer from '../redux/cart/CartSlice'
import { checkUserExistanceReducer } from '../redux/CheckUserExistance/UserExistanceSlice'
import homeReducer from '../redux/home/HomeSlice'
import productDetailReducer from '../redux/home/ProductDetailSlice'
import { loaderReducer } from '../redux/LoaderDataStore/LoaderSlice'
import loginReducer from '../redux/login/LoginSlice'
import otpVerificationReducer from '../redux/OtpVerification/OtpVerificationSlice'
import ratingsReducer from '../redux/ratings/RatingsSlice'
import signupReducer from '../redux/Signup/SignupSlice'


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
  ratingsReducer
})


