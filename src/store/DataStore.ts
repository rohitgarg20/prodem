import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { reducers } from './Reducers'
import { reactotron } from '../common/config/ReactotronConfig'
import { showAndroidToastMessage } from '../common/Toast'
import { apiMiddleware } from '../network/ApiMiddleware'
import { clearAll } from '../utils/auth-utils'
import { logoutStack, resetStackData } from '../utils/navigation-utils'


const middleware = [
  apiMiddleware
]

export const LOGOUT_ACTION = 'USER_LOGOUT'

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_ACTION) {
    clearAll()
    logoutStack()
    resetStackData()
    showAndroidToastMessage('LOGOUT_SUCCESS')
    return reducers(undefined, action)
  }

  return reducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [reactotron.createEnhancer!()],
  devTools: false,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(middleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export const useAppDispatch: () => Dispatch = useDispatch<Dispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector