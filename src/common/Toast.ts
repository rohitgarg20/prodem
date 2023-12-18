import { Platform, ToastAndroid } from 'react-native'
import Toast from 'react-native-simple-toast'

import { tString } from '../utils/app-utils'


export const showAndroidToastMessage = (msg, duration = ToastAndroid.SHORT, useTSring = true) => {
  const message = useTSring ? tString(msg) : msg
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, duration)
  } else {
    Toast.show(message, duration)
    // showSnackbar(msg)
  }
}