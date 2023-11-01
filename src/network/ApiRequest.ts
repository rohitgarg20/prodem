import { MiddlewareAPI } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { get } from 'lodash'

import { apiCallFailure, apiCallSuccess } from './ApiActions'
import { axiosRequest } from './Axios'
import { IAPIRequest, IActions } from './NetworkUtil'
import { API_STATUS_CODE } from '../common/ApiConstant'
import { log } from '../common/config/log'
import { hideLoader, showLoader } from '../redux/LoaderDataStore/LoaderSlice'

export const makeApiRequest = async (store: MiddlewareAPI, dispatch: any, action: IActions) => {

  const payload: IAPIRequest = action?.payload
  const { onStart, onFailure, onSuccess, showLoaderOnScreen = false } = payload || {}
  dispatch(action)

  if(showLoaderOnScreen) {
    dispatch({ type: showLoader.type })
  }

  if(onStart) {
    dispatch({ type: onStart })
  }

  try {
    const resp: AxiosResponse = await axiosRequest.apiRequest(payload)

    log('respresprespresp', resp)
    const respData = get(resp, 'data', {})
    const statusCode = get(resp, 'data.code')
    log('respresprespresp', statusCode)
    if (statusCode === API_STATUS_CODE.SUCCESS) {
      if(onSuccess) {
        dispatch({ type: onSuccess, payload: { responseData: respData || {}, requestData: payload || {} } })
      }
      dispatch({ type: apiCallSuccess, payload: { responseData: respData || {}, requestData: payload || {} } })
    } else {
      log('inside else is called', statusCode)

      throw respData
    }
    log('inside after else is called', statusCode)

    return respData


  } catch(err) {
    log('respresprespresp', err)

    if(onFailure) {
      dispatch({ type: onFailure, payload: { error: err,  requestData: payload || {} } })
    }
    dispatch({ type: apiCallFailure, payload: { error: err,  requestData: payload || {} } })

    if(showLoaderOnScreen) {
      dispatch({ type: hideLoader.type })
    }
    throw err
  } finally {
    if(showLoaderOnScreen) {
      dispatch({ type: hideLoader.type })
    }
  }


}