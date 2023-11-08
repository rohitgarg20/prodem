import { apiCallBegin } from './ApiActions'
import { IAPIRequest } from './NetworkUtil'
import { store } from '../store/DataStore'


export const apiDispatch = (payload: IAPIRequest) => {
  return store.dispatch({ type: apiCallBegin.type, payload })
}