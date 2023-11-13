import { Platform, ToastAndroid } from 'react-native'
import Toast from 'react-native-simple-toast'

export const showAndroidToastMessage = (msg, duration = ToastAndroid.SHORT) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, duration)
  } else {
    Toast.show(msg, duration)
    // showSnackbar(msg)
  }
}