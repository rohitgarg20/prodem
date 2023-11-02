import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'
import { scale } from '../../../utils/scaling'

export const subscriptionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  mainContainer: {
    paddingHorizontal: scale(10),
    backgroundColor: colors.white,
    flex: 1
  },
  ratingCardSeperator: {
    paddingBottom: 15
  },
  ratingListContainer: {
    paddingBottom: 20
  }
})