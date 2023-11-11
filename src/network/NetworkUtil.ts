import { CancelTokenSource, GenericAbortSignal, Method } from 'axios'

export interface IAPIRequest {
  baseUrl?: string
  method: Method
  headers?: any
  endPoint: string
  reqParams?: string
  body?: any
  authToken?: string
  onStart?: string
  onSuccess?: string
  onFailure?: string
  showLoaderOnScreen?: boolean
  cancelToken?: CancelTokenSource
  extraParams?: {
    [x in string]: any
  }
  signal?: GenericAbortSignal
}

export interface IActions {
  type: string
  payload?: any
}

export interface IAPIResponse {
  responseData: any
  requestPayload: any
}

export interface IAPIError {
  error: any
  requestPayload: any
}