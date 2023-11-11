import { onFetchedNotificatonListSuccessReducer, onNotificationListApiFailureReducer, onMarkReadNotificationActionApiFailureReducer } from './NotificationSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'
import { store } from '../../store/DataStore'


export const getNotificationList = () => {
  const isInitialDataPresent = store.getState().notificationReducer.totalNotificationCount
  apiDispatch({
    endPoint: API_END_POINT.GET_NOTIFICATION_LIST,
    method: 'GET',
    showLoaderOnScreen: !isInitialDataPresent,
    onSuccess: onFetchedNotificatonListSuccessReducer.type,
    onFailure: onNotificationListApiFailureReducer.type
  })
}

export const markNotificationRead = (notificationId) => {
  const formData = new FormData()
  formData.append('notification_id', notificationId)
  apiDispatch({
    endPoint: API_END_POINT.READ_NOTIFICATION,
    method: 'POST',
    showLoaderOnScreen: false,
    onFailure: onMarkReadNotificationActionApiFailureReducer.type,
    body: formData
  })
}