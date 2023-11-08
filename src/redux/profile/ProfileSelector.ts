import { createSelector } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { RootState } from '../../store/DataStore'


export const getUserProfileApiSelector = createSelector(
  (state: RootState) => state.profileReducer,
  (profileStore: IUserProfileDetail) => !isEmpty(profileStore) ? profileStore.isFetchingData : false
)

export const getUserProfileApiErrorSelector = createSelector(
  (state: RootState) => state.profileReducer,
  (profileStore: IUserProfileDetail) => !isEmpty(profileStore) ? profileStore.hasApiError : false
)

export const getUserDetailsSelector = createSelector(
  (state: RootState) => state.profileReducer,
  (profileStore: IUserProfileDetail) =>  profileStore?.userDetails || {}
)


export const getUserNameSelector = createSelector(
  (state: RootState) => state.profileReducer.userDetails,
  (profileStore: IUserDetails) => profileStore?.p_user_name || ''
)

export const getUserId = createSelector(
  (state: RootState) => state.profileReducer.userDetails,
  (profileStore: IUserDetails) => profileStore?.p_user_id
)


