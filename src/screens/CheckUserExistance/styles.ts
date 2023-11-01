import { StyleSheet } from 'react-native'

import { colors } from '../../common/Colors'
import { scale } from '../../utils/scaling'

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lightBlack,
    paddingHorizontal: scale(20),
    paddingTop: scale(24),
    justifyContent: 'space-between',
    paddingBottom: scale(20),
    flex: 1
  },
  titleSpacing: {
    paddingTop: scale(30)
  },
  formSpacing: {
    paddingTop: scale(14)
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(14)
  },
  logoContainer: {
  },
  subDetailContainer: {
  },
  headingSubHeading: {
    paddingBottom: scale(2)
  },
  buttonRowContainer: {
    flexDirection: 'row',
    paddingTop: scale(20)
  },
  registerContainer: {
    paddingTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonSeperator: {
    paddingRight: scale(30)
  },
  simpleBtnBorder: {
    borderBottomWidth: 2,
    borderColor: colors.primary
  },
  registerLabel: {
    paddingRight: 4
  }
})