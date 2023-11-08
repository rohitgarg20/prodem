import { StyleSheet } from 'react-native'

import { colors } from '../../common/Colors'
import { verticalScale } from '../../utils/scaling'

export const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 5
  },
  textInputMultine: {
    height: verticalScale(70)
  },
  simpleBtnBorder: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: 180,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10
  },
  iconWithLabelContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    paddingHorizontal: 20,
    // paddingTop: 20,
    // flex: 1
  },
  listContentContainer: {
    paddingVertical: 20,
    // paddingHorizontal: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    columnGap: 10
  },
  rowContainerFlexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10
  },
  orderDateContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  priceSeperator: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: colors.lightestGrey
  },
  titleBoldSeperator: {
    borderTopWidth: 2,
    borderColor: colors.primary,
    marginTop: 10,
    paddingTop: 10
  },
  topPadding: {
    paddingTop: 10
  },
  productName: {
    flex: 1
  },
  sendMsgButton: {
    height: 40,
    paddingHorizontal: 10,
    maxWidth: 150
  },
})