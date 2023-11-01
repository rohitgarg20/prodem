import { StyleSheet } from 'react-native'

import { colors, textColor } from '../../common/Colors'
import { scale, verticalScale } from '../../utils/scaling'

export const homeStyles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.blueishCyan,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: scale(18),
    paddingTop: scale(15),
    top: -10,
    flex: 1
  },
  titleSeperator: {
    paddingTop: verticalScale(10),
    fontWeight: 'bold'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.blueishCyan
  },
  categorySeperator: {
    paddingBottom: scale(10)
  },
  flatListContentContainer: {
    paddingBottom: scale(10),
    // flexGrow: 1
  },
  categoryList: {
    paddingTop: scale(10)
  }
})

export const productListStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.blueishCyan
  },
  headerContainer: {
    height: verticalScale(50)
  },
  contentContainer: {
    backgroundColor: colors.blueishCyan,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: scale(15),
    paddingTop: scale(15),
    top: -10,
    flex: 1
  },
  leftArrow: {
    transform: [{
      rotate: '90deg'
    }],
    marginRight: 10
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30
  },
  productList: {
    // marginTop: scale(10)
  },
  productSeperator: {
    paddingBottom: scale(10)
  },
  flatListContentContainer: {
    paddingBottom: scale(10)
  },
  seperator: {
    height: 20
  }
})

export const productDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightestGrey
  },
  productDetailContainer: {
    padding: 20
  },
  wishlistBtnContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 20,
    columnGap: 20
  },
  addToCartBtnContainer: {
    width: '70%'
  },
  callBtnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    columnGap: 20,
    maxWidth: '80%',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  textStyle: {
    color: textColor.white,
    textDecorationLine: 'underline',
    textDecorationColor: textColor.white
  }
})