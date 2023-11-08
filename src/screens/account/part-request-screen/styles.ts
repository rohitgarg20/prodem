import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'
import { scale } from '../../../utils/scaling'

export const partRequestStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aquaHaze
  },
  mainContainer: {
    paddingHorizontal: scale(10),
    backgroundColor: colors.aquaHaze,
    flex: 1
  },
  partRequestCardSeperator: {
    paddingBottom: 15
  },
  partRequestListContainer: {
    paddingBottom: 20
  }
})

