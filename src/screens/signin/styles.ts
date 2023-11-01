import { StyleSheet } from 'react-native'

import { colors } from '../../common/Colors'
import { scale } from '../../utils/scaling'

export const loginStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lightBlack,
    paddingBottom: scale(20),
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: scale(20),
    paddingTop: scale(24)
    // paddingBottom: scale(70)
  },
  formTopSeperator: {
    paddingTop: scale(50)
  },
  formContainer: {
    rowGap: 20
  },
  alreadyAccount: {
    paddingRight: 4
  },
  loginContainer:  {
    paddingTop: scale(15),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formBottomSeperator: {
    paddingTop: scale(60)
  }
})