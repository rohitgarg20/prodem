import { Platform, ToastAndroid } from 'react-native'

export const showAndroidToastMessage = (msg, duration = ToastAndroid.SHORT) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, duration)
  } else {
    // showSnackbar(msg)
  }
}