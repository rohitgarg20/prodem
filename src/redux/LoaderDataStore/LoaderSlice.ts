import { createSlice } from '@reduxjs/toolkit'

import { ReducerName } from '../../common/Constant'
// import { log } from '../../common/config/log'
// import { onStart } from '../CheckUserExistance/UserExistanceSlice'

export interface ILoader {
  isLoading: boolean
}

const initialState = {
  isLoading: false
}


export const loaderSlice = createSlice({
  name: ReducerName.LOADER,
  initialState,
  reducers: {
    showLoader: () => {
      return {
        isLoading: true
      }
    },
    hideLoader: () => {
      return {
        isLoading: false
      }
    }
  }
})

export const { showLoader,  hideLoader } = loaderSlice.actions

const loaderReducer = loaderSlice.reducer

export {
	 loaderReducer
}