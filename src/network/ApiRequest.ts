import { MiddlewareAPI } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { get } from 'lodash'

import { apiCallFailure, apiCallSuccess } from './ApiActions'
import { axiosRequest } from './Axios'
import { IAPIRequest, IActions } from './NetworkUtil'
import { API_STATUS_CODE } from '../common/ApiConstant'
import { log } from '../common/config/log'
import { hideLoader, showLoader } from '../redux/LoaderDataStore/LoaderSlice'
import { LOGOUT_SUCCESS } from '../common/ErrorMessages'
import { LOGOUT_ACTION } from '../store/DataStore'
import { showAndroidToastMessage } from '../common/Toast'

export const makeApiRequest = async (store?: MiddlewareAPI, dispatch?: any, action?: IActions) => {

  const payload: IAPIRequest = action?.payload
  const { onStart, onFailure, onSuccess, showLoaderOnScreen = false, extraParams = {} } = payload || {}
  if(action) {
    dispatch(action)
  }

  if(showLoaderOnScreen) {
    dispatch({ type: showLoader.type })
  }

  if(onStart) {
    dispatch({ type: onStart, payload : { requestData: payload || {} } })
  }

  try {
    const resp: AxiosResponse = await axiosRequest.apiRequest(payload) as AxiosResponse
    log('inside else is called 41', resp)
    const respData = get(resp, 'data', {})
    const statusCode = get(resp, 'data.code')
    const authStatus = get(respData, 'authStatus')
    if(typeof authStatus === 'boolean' && authStatus === false) {
      dispatch({ type: LOGOUT_ACTION })
      return respData
    }
    if (statusCode === API_STATUS_CODE.SUCCESS) {
      if(onSuccess) {
        dispatch({ type: onSuccess, payload: { responseData: respData || {}, requestData: payload || {}, extraParams  } })
      }
      dispatch({ type: apiCallSuccess, payload: { responseData: respData || {}, requestData: payload || {}, extraParams } })
    } else {
      log('inside else is called 41', statusCode)

      throw respData
    }
    log('inside after else is called 45', statusCode)

    return respData


  } catch(err) {
    const authStatus = get(err, 'authStatus')
    if(typeof authStatus === 'boolean' && authStatus === false) {
      dispatch({ type: LOGOUT_ACTION })
      throw err
    }

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