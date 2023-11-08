import { batch } from 'react-redux'

import { setPartRequestTypeListReducer, setPartRequestListDataReducer, setPartRequestListApiSuccessReducer, removePartRequestOnLaterOrWishlistReducer } from './PartRequestSlice'
import { API_END_POINT, API_STATUS_CODE } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { makeApiRequest } from '../../network/ApiRequest'
import { apiDispatch } from '../../network/DispatchApiCall'
import { callPromisesParallel } from '../../utils/app-utils'
import { hideLoader, showLoader } from '../LoaderDataStore/LoaderSlice'
import { onFetchedBidOptionsSuccessReducer } from '../part-request-detail/PartRequestDetailSlice'

export const getFiltersList = async (dispatch) => {
  return makeApiRequest(undefined, dispatch, {
    payload: {
      method: 'post',
      endPoint: API_END_POINT.FETCH_PART_REQUEST_FILTER_LIST
    },
    type: ''
  })
}

export const fetchPartRequestList = (dispatch) => {
  const formData = new FormData()
  formData.append('list_type', 'not-offered')
  formData.append('page', 1)
  return makeApiRequest(undefined, dispatch, {
    payload: {
      method: 'post',
      endPoint: API_END_POINT.FETCH_PART_REQUEST_LSIT,
      body: formData
    },
    type: ''
  })
}

export const dispatchPartRequestApi = async ({
  listType,
  page,
  showLoaderOnScreen = false
}) => {
  const formData = new FormData()
  formData.append('list_type', listType)
  formData.append('page', page)
  apiDispatch({
    endPoint: API_END_POINT.FETCH_PART_REQUEST_LSIT,
    method: 'POST',
    body: formData,
    showLoaderOnScreen,
    onSuccess: setPartRequestListApiSuccessReducer.type
  })
}


export const fetchBiddingOptions = async (dispatch) => {
  return makeApiRequest(undefined, dispatch, {
    payload: {
      method: 'post',
      endPoint: API_END_POINT.FETCH_BIDDING_OPTIONS
    },
    type: ''
  })
}

export const ignorePartRequestApi = (partRequestId) => {
  const formData = new FormData()
  formData.append('partofferignore_offer_id', partRequestId)
  apiDispatch({
    endPoint: API_END_POINT.IGNORE_PART_REQUEST,
    method: 'POST',
    body: formData,
    showLoaderOnScreen: true,
    onSuccess: removePartRequestOnLaterOrWishlistReducer.type,
    extraParams: {
      partRequestId
    }
  })
}

export const addPartRequestToWishlistApi = (partRequestId) => {
  const formData = new FormData()
  formData.append('partofferignore_offer_id', partRequestId)
  apiDispatch({
    endPoint: API_END_POINT.ADD_PART_REQUEST_TO_WISHLIST,
    method: 'POST',
    body: formData,
    showLoaderOnScreen: true,
    onSuccess: removePartRequestOnLaterOrWishlistReducer.type,
    extraParams: {
      partRequestId
    }
  })
}

export const fetchPartRequestInitialData = (dispatch) => {
  dispatch({
    type: showLoader.type
  })
  const promisesArr = [
    fetchBiddingOptions(dispatch),
    getFiltersList(dispatch),
    fetchPartRequestList(dispatch)
  ]
  callPromisesParallel(promisesArr).then((responseData) => {
    log('responseDataresponseData', responseData)
    let dispatchActions: any = [{
      type: hideLoader.type
    }]
    const biddingApiResp = responseData[0]
    if(biddingApiResp?.code === API_STATUS_CODE.SUCCESS) {
      dispatchActions.push({
        type: onFetchedBidOptionsSuccessReducer.type,
        payload: {
          data: biddingApiResp?.data
        }
      })
    }
    const filtersList = responseData[1]
    if(filtersList?.code === API_STATUS_CODE.SUCCESS) {
      dispatchActions.push({
        type: setPartRequestTypeListReducer.type,
        payload: {
          data: filtersList?.data
        }
      })
    }

    const partRequestList = responseData[2]
    if(partRequestList?.code === API_STATUS_CODE.SUCCESS) {
      dispatchActions.push({
        type: setPartRequestListDataReducer.type,
        payload: {
          data: partRequestList?.data
        }
      })
    }

    log('dispatchActionsdispatchActions', dispatchActions)

    batch(() => {
      dispatchActions.map((action) => {
        dispatch(action)
      })
    })

  }).catch((err) => {
    log('errerrerrerr inside', err)
  })
}