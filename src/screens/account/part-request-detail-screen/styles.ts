import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'

export const partRequestDetailScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightestGrey
  },
  iconContainer: {
    borderRadius: 10
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    rowGap: 20
  },
  biddingItemSeperator: {
    rowGap: 20
  }
})
