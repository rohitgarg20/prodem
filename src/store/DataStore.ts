import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

import { reducers } from './Reducers'
import { reactotron } from '../common/config/ReactotronConfig'
import { apiMiddleware } from '../network/ApiMiddleware'


const middleware = [
  apiMiddleware
]

export const store = configureStore({
  reducer: reducers,
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