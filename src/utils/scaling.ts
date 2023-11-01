import { Dimensions } from 'react-native'

const guidelineBaseWidth = 375
const guidelineBaseHeight = 832

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen')

export const scale = (factor: number) => {
  return (
    SCREEN_WIDTH / guidelineBaseWidth
  ) * factor
}

export const verticalScale = (factor: number) => {
  return (
    SCREEN_HEIGHT / guidelineBaseHeight
  ) * factor
}