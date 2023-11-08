import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'
import { scale } from '../../../utils/scaling'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  mainContainer: {
    paddingHorizontal: scale(15),
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 10
  },
  ordersCardSeperator: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.lightestGrey,
    marginBottom: 15

  },
  ordersListContainer: {
    paddingBottom: 20
  }
})