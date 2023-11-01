import { MiddlewareAPI } from '@reduxjs/toolkit'

import { apiCallBegin } from './ApiActions'
import { makeApiRequest } from './ApiRequest'
import { IActions } from './NetworkUtil'

export const apiMiddleware = (store: MiddlewareAPI) => (next: any) => (action: IActions) => {

  return action.type === apiCallBegin.type ? makeApiRequest(store, next, action)  :  next(action)
}