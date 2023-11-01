import { StyleSheet } from 'react-native'

import { scale } from '../../../../utils/scaling'

export const cartStyles = StyleSheet.create({
  cartItemSeperator: {
    paddingBottom: scale(15)
  },
  cartListContainer: {
    paddingVertical: scale(20),
    paddingHorizontal: scale(10)
  },
  mainContainer: {
    flex: 1
  }
})