import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store/DataStore'


export const getNotificationData = (state: RootState) => {
  return state.notificationReducer
}

export const getNotificationIds = createSelector(
  getNotificationData,
  (notificationReducer) => Object.keys(notificationReducer.notificationData || {})
)

export const getTotalNotificationCount = createSelector(
  getNotificationData,
  (notificationReducer) => notificationReducer.totalNotificationCount
)

export const getFetchingStatus = createSelector(
  getNotificationData,
  (notificationReducer) => notificationReducer.isFetching
)