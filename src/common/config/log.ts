import Reactotron from 'reactotron-react-native'

export function log(...logData) {
  if (__DEV__) {
    Reactotron.log!(logData)
  }
}