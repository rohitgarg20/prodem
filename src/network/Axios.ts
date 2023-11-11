import axios, {  } from 'axios'
import { forEach, isEmpty } from 'lodash'

import { IAPIRequest } from './NetworkUtil'
import { BASE_URL } from '../common/ApiConstant'
import { log } from '../common/config/log'
import { getToken } from '../utils/auth-utils'


export class AxiosRequest {
  reqHeaders = {
    // Cookie: 'ci_session=vdhfsd69p3cnheirjfdju15lb7u66btg'
  }

  constructor() {
  }

  setUpRequestHeaders = (headers) => {
    return {
      ...this.reqHeaders,
      ...headers
    }
  }

  createUrl = (apiEndPoint: string, reqParams: string) => {
    if(!isEmpty(reqParams)) {
      const parsedParams = JSON.parse(reqParams)
      const regex = /:\w*/g
      let match
      const urlParamKeys: string[] = []
      let index = 0
      while ((match = regex.exec(apiEndPoint)) !== null) {
        urlParamKeys[index++] = (match[0] as string)
      }

      forEach(urlParamKeys, (urlParam) => {
        let key = apiEndPoint.substring(1, urlParam?.length)
        if(parsedParams.hasOwnProperty(key)) {
          apiEndPoint = apiEndPoint.replace(urlParam, parsedParams[key])
        }
      })
      return apiEndPoint
    }
    return apiEndPoint

  }

  getHeaders = () => {
    const token = getToken()
    if(token?.length) {
      return { 'Authorization': 'Bearer ' + token }
    }
    return {}
  }

  apiRequest = (request: IAPIRequest) => {
    const { endPoint, method, body, headers, reqParams = '', baseUrl = BASE_URL, cancelToken = undefined, signal = undefined } = request
    log('apiRequestapiRequest', cancelToken)
    let reqBody = {}
    if(!isEmpty(body)) {
      reqBody = body
    }

    return new Promise((resolve, reject) => {
      const axiosResp = axios({
        method: method,
        data: reqBody,
        baseURL: baseUrl,
        headers: {
          ...this.getHeaders(),
          ...headers
        },
        url: this.createUrl(endPoint, reqParams),
        timeout: 10000,
        cancelToken: cancelToken?.token,
        signal
      })
      try {
        resolve(axiosResp)
      } catch(error) {
        reject(error)
        log('apiRequestapiRequest in error ', error)
        // throw error
      }
    })

  }

}

const axiosRequest = new AxiosRequest()
export {
  axiosRequest
}