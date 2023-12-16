import { createSlice } from '@reduxjs/toolkit'

import { ReducerName } from '../../common/Constant'


const initialState = {
  isTabBarVisible: true
}

const updateTabBarState = (state, { payload }) => {
  const { isTabBarVisible } = payload
  state.isTabBarVisible = isTabBarVisible
}

const bottomTabBarSlice = createSlice({
  name: ReducerName.BOTTOM_TAB_BAR,
  initialState,
  reducers: {
    updateTabBarStateReducer: updateTabBarState
  }
})

export const { updateTabBarStateReducer } = bottomTabBarSlice.actions

export default bottomTabBarSlice.reducer