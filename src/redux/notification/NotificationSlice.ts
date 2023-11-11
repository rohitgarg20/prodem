import { createSlice } from '@reduxjs/toolkit'
import { get, isEmpty, reduce } from 'lodash'

import { ReducerName } from '../../common/Constant'
import { INotificationDetail } from '../../common/Interfaces'
import { handleApiFailure } from '../../utils/app-utils'
import { log } from '../../common/config/log'

interface INotificationState {
  notificationData?: {
    [notificationId in number]: INotificationDetail
  }
  isFetching: boolean
  totalNotificationCount: number
}

const initialState: INotificationState = {
  notificationData: undefined,
  isFetching: true,
  totalNotificationCount: 0
}

const onFetchedNotificatonListSuccess = (state: INotificationState, { payload }) => {
  const notificationList = get(payload, 'responseData.data', [])
  const formattedList = reduce(notificationList, (acc: any, notification: any) => {
    const notificationId = notification?.notification_id
    acc[notificationId] = {
      notificationId,
      userId: notification?.notification_user_id,
      bookingId: notification?.notification_booking_id,
      title: notification?.notification_title,
      description: notification?.notification_msg,
      notificationDate: notification?.notification_created_at,
      isRead: (notification?.notification_read_status || '').toLowerCase() === 'yes',
      notificationType: notification?.notification_fcm_type
    }
    return acc
  }, {})
  state.notificationData = formattedList
  log('formattedListformattedList', formattedList)
  if(state.isFetching) {
    state.isFetching = false
  }
  state.totalNotificationCount = notificationList?.length

}

const onNotificationListApiFailure = (state: INotificationState, { payload }) => {
  handleApiFailure(payload)
  state.isFetching = false
}

const resetNotificationData = (state: INotificationState) => {
  return initialState
}

const onMarkReadNotificationAction = (state: INotificationState, { payload }) => {
  const { notificationId } = payload
  const notificationIdData  = get(state, `notificationData.${[notificationId]}`)
  log('onMarkReadNotificationAction', payload, notificationId, notificationIdData)
  if(!isEmpty(notificationIdData)) {
    state.notificationData = {
      ...state.notificationData,
      [notificationId]: {
        ...(notificationIdData as unknown as INotificationDetail),
        isRead: true
      }
    }
  }
}


const onMarkReadNotificationActionApiFailure = (state: INotificationState, { payload }) => {
  const { notificationId } = payload
  const notificationIdData  = get(state, `notificationData.${[notificationId]}`)
  if(!isEmpty(notificationIdData)) {
    state.notificationData = {
      ...state.notificationData,
      [notificationId]: {
        ...(notificationIdData as unknown as INotificationDetail),
        isRead: false
      }
    }
  }
}

export const notificationSlice = createSlice({
  name: ReducerName.NOTIFICATION_LIST,
  initialState,
  reducers: {
    onFetchedNotificatonListSuccessReducer: onFetchedNotificatonListSuccess,
    onMarkReadNotificationActionReducer: onMarkReadNotificationAction,
    onMarkReadNotificationActionApiFailureReducer: onMarkReadNotificationActionApiFailure,
    onNotificationListApiFailureReducer: onNotificationListApiFailure
  }
})

export const {
  onFetchedNotificatonListSuccessReducer, onMarkReadNotificationActionReducer, onNotificationListApiFailureReducer,
  onMarkReadNotificationActionApiFailureReducer
} = notificationSlice.actions

export default notificationSlice.reducer