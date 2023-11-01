import { StyleSheet } from 'react-native'

import { colors } from '../../common/Colors'
import { scale } from '../../utils/scaling'

export const forgetPswdStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lightBlack,
    paddingHorizontal: scale(20),
    paddingTop: scale(44),
    justifyContent: 'space-between',
    paddingBottom: scale(40),
    flex: 1
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: scale(44)
  },
  subHeading: {
    textAlign: 'center',
    paddingBottom: scale(40),
    fontSize: 16
  },
  absoluteContainer: {
    position: 'absolute'
  },
  textInputSeperator: {
    paddingTop: scale(40)
  }

})

