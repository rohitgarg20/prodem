import axios, {  } from 'axios'
import { forEach, isEmpty } from 'lodash'

import { IAPIRequest } from './NetworkUtil'
import { BASE_URL } from '../common/ApiConstant'
import { log } from '../common/config/log'


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

  apiRequest = async(request: IAPIRequest) => {
    const { endPoint, method, body, headers, reqParams = '', baseUrl = BASE_URL, cancelToken = undefined } = request
    log('apiRequestapiRequest', cancelToken)
    let reqBody = {}
    if(!isEmpty(body)) {
      reqBody = body
    }
    try {
      return await axios({
        method: method,
        data: reqBody,
        baseURL: baseUrl,
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Jtcy1tYXJrZXQuaXQiLCJzZWNyYXRlIjoiYkpMbUFYb1I3NDNYVzMwTm5rbEJlIiwiYXVkIjoiaHR0cHM6Ly9ibXMtbWFya2V0Lml0IiwiaWF0IjoxNjk4ODE2MDY5fQ.nnP2tXXLMlKuElK0CSrzyfpLyO-c6Hva0BhR7QmY3Pw'
        },
        url: this.createUrl(endPoint, reqParams),
        timeout: 1000,
        cancelToken: cancelToken?.token
      })
    } catch(error) {
      log('apiRequestapiRequest in error ', error)
      throw error
    }
  }

}

const axiosRequest = new AxiosRequest()
export {
  axiosRequest
}