import { createSlice } from '@reduxjs/toolkit'
import { filter, get, map } from 'lodash'

import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { IPartRequestCardComponent, ITopTabBarItem } from '../../common/Interfaces'
import { getFormattedDateInDetailFormat } from '../../utils/app-utils'


interface IPartRequestState {
  partRequestData?: {
    [x in string]: {
      currentPage?: number
      totalPage?: number
      partRequestList?: IPartRequestCardComponent[]
    }
  }
  partRequestTypeList: ITopTabBarItem[]
  selectedPartRequestType: string
}

const initialState: IPartRequestState = {
  partRequestData: {},
  partRequestTypeList: [],
  selectedPartRequestType: 'not-offered'
}

const resetData = (state: IPartRequestState) => {
  state.partRequestData = initialState.partRequestData
  state.selectedPartRequestType = initialState.selectedPartRequestType
}

const setPartRequestTypeList = (state: IPartRequestState, { payload }) => {
  const responseData = get(payload, 'data.list_type', {})
  const partTypeListData: ITopTabBarItem[] =  map(Object.keys(responseData), (key: string) => {
    return {
      label: responseData[key],
      key
    }
  })
  state.partRequestTypeList = partTypeListData
  state.selectedPartRequestType = partTypeListData[0].key
}

export const updateSelectedPartRequestType = (state: IPartRequestState, { payload }) => {
  state.partRequestData = {
    [state.selectedPartRequestType]: {}
  }
  state.selectedPartRequestType = payload?.selectedPartRequestType
}

export const setPartRequestListData = (state: IPartRequestState, { payload }) => {
  log('setPartRequestListDatasetPartRequestListData inside   djdjdjjdjdj', payload)
  const responseData = get(payload, 'data.products', {})
  log('setPartRequestListDatasetPartRequestListData inside   djdjdjjdjdj', responseData)

  const totalPage = get(responseData, 'last_page')
  const currentPage =  get(responseData, 'current_page')
  log('setPartRequestListDatasetPartRequestListData inside   djdjdjjdjdj', totalPage, currentPage, get(responseData, 'data', []))

  const partRequestList = map(get(responseData, 'data', []), (productItem) => {
    return {
      title: productItem?.partrequest_title,
      description: productItem?.partrequest_desc,
      uploadedDate: getFormattedDateInDetailFormat(productItem?.partrequest_created_at),
      partRequestId: productItem?.partrequest_id
    }
  })
  log('setPartRequestListDatasetPartRequestListData', partRequestList)
  state.partRequestData = {
    ...state.partRequestData,
    [state.selectedPartRequestType]: {
      currentPage,
      totalPage,
      partRequestList: [
        ...state.partRequestData?.[state.selectedPartRequestType]?.partRequestList || [],
        ...partRequestList
      ]
    }
  }

}

export const setPartRequestListApiSuccess = (state: IPartRequestState, { payload }) => {
  setPartRequestListData(state, { payload: get(payload, 'responseData', {}) })
}

export const removePartRequestOnLaterOrWishlist = (state: IPartRequestState, { payload }) => {
  log('state.selectedPartRequestTypestate.selectedPartRequestType', state.selectedPartRequestType, payload)
  if((state.selectedPartRequestType !== 'not-offered') && (state.selectedPartRequestType !== 'alrady-bid')) {
    const partRequestId = get(payload, 'extraParams.partRequestId')
    const selectedPartRequestData = state.partRequestData?.[state.selectedPartRequestType]
    const { currentPage = 0, partRequestList, totalPage } = selectedPartRequestData || {}
    const filteredList = filter(partRequestList, (partItem) => partItem.partRequestId !== partRequestId)
    const pageDecCount = Math.floor(((partRequestList?.length || 0 ) - filteredList?.length) / 16)

    state.partRequestData = {
      [state.selectedPartRequestType]: {
        partRequestList: filteredList,
        totalPage,
        currentPage: (currentPage - pageDecCount) > 0 ? (currentPage - pageDecCount) : currentPage
      }
    }
  }
}


export const partRequestSlice = createSlice({
  name: ReducerName.PART_REQUEST,
  initialState,
  reducers: {
    setPartRequestTypeListReducer: setPartRequestTypeList,
    setPartRequestListDataReducer: setPartRequestListData,
    setPartRequestListApiSuccessReducer: setPartRequestListApiSuccess,
    updateSelectedPartRequestTypeReducer: updateSelectedPartRequestType,
    removePartRequestOnLaterOrWishlistReducer: removePartRequestOnLaterOrWishlist,
    resetDataReducer: resetData
  }
})

export const {
  setPartRequestTypeListReducer, setPartRequestListDataReducer, setPartRequestListApiSuccessReducer,
  updateSelectedPartRequestTypeReducer, removePartRequestOnLaterOrWishlistReducer, resetDataReducer
} = partRequestSlice.actions

export default partRequestSlice.reducer