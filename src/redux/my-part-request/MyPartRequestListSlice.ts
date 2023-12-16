import { createSlice } from '@reduxjs/toolkit'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { IPartRequestBasicDetail } from '../../common/Interfaces'
import { getFormattedDateInDetailFormat, getTitleWithSeperator } from '../../utils/app-utils'
import { filter, get, map } from 'lodash'
import { showAndroidToastMessage } from '../../common/Toast'

interface IMyPartRequestListState {
  partRequestList?: IPartRequestBasicDetail[]
  selectedPartRequestStatus: string
}

const initialState: IMyPartRequestListState = {
  partRequestList: [],
  selectedPartRequestStatus: 'requests'
}

const getFormattedPartRequestItemData = (productData) => {
  return {
    heading: `${productData?.partrequest_title} for ${getTitleWithSeperator(productData?.brand_name, ',')} ${getTitleWithSeperator((productData?.partrequest_year || '').toString(), ',')} ${productData?.vehicle_name || ''}`,

    // to form heading
    partrequest_title: productData?.partrequest_title,
    brand_name: productData?.brand_name || '',
    partrequest_year: productData?.partrequest_year || '',
    vehicle_name: productData?.vehicle_name || '',

    // address detail
    addressInfo: `${getTitleWithSeperator(productData?.country_name, ' > ')}${getTitleWithSeperator(productData?.city_name, ' , ')}${productData?.partrequest_delivery_location}`,

    // to form address
    country_name: productData?.country_name,
    city_name: productData?.city_name,
    partrequest_delivery_location: productData?.partrequest_delivery_location,

    // product images gallery
    imageGallery: [],
    // part description
    description: productData?.partrequest_desc,
    partrequest_desc: productData?.partrequest_desc,

    uploadedDate: getFormattedDateInDetailFormat(productData?.partrequest_created_at),

    partRequestStatus: productData?.partrequest_status,
    isPostByLoggedInUser: true,
    partRequestId: productData?.partrequest_id,
    dealsCount: (productData?.partrequest_total_bids || 0)?.toString()
  }
}

const onFetchedPartRequestApiSuccess = (state: IMyPartRequestListState, { payload }) => {
  log('onFetchedPartRequestApiSuccess', payload)
  const myRequestList = get(payload, 'responseData.data.my_requests', [])
  state.partRequestList = map(myRequestList, getFormattedPartRequestItemData)
  log('onFetchedPartRequestApiSuccess', state.partRequestList)

}

const onChangeSelectedPartRequestType = (state: IMyPartRequestListState, { payload }) => {
  log('onChangeSelectedPartRequestType', payload)
  state.selectedPartRequestStatus = payload?.selectedStatus
  state.partRequestList = []
}

const onCancelPartRequestSuccess = (state: IMyPartRequestListState, { payload }) => {
  const cancelledPartRequestId = get(payload, 'extraParams.partRequestId', [])
  state.partRequestList = filter(state.partRequestList, (item) => item.partRequestId !== cancelledPartRequestId)
  showAndroidToastMessage('Part request is cancelled successfully')
}

const resetData = (state: IMyPartRequestListState) => {
  state.partRequestList = []
  state.selectedPartRequestStatus = 'requests'
}

export const myPartRequestSlice = createSlice({
  name: ReducerName.MY_PART_REQUEST_LIST,
  initialState,
  reducers: {
    onFetchedPartRequestApiSuccessReducer: onFetchedPartRequestApiSuccess,
    onChangeSelectedPartRequestTypeReducer: onChangeSelectedPartRequestType,
    onCancelPartRequestSuccessReducer: onCancelPartRequestSuccess,
    resetReducerData: resetData
  }
})

export const {
  onFetchedPartRequestApiSuccessReducer, onChangeSelectedPartRequestTypeReducer, onCancelPartRequestSuccessReducer,
  resetReducerData
} = myPartRequestSlice.actions

export default myPartRequestSlice.reducer