import { StyleSheet } from 'react-native'

import { colors } from '../../common/Colors'
import { scale, verticalScale } from '../../utils/scaling'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  formContainer: {
    backgroundColor: colors.aquaHaze,
    paddingHorizontal: scale(14),
    paddingTop: verticalScale(14),
    paddingBottom: 30
  },
  textInputField: {
    paddingVertical: scale(8)
  },
  fieldSeperator: {
    paddingBottom: scale(10)
  },
  titleSeperator: {
    paddingBottom: scale(5)
  },
  textInputMultine: {
    height: verticalScale(70)
  },
  singleLineStyle: {

  },
  choosePhotoBtnContainer: {
    borderRadius: 6,
    borderColor: colors.ashGrey,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: 200,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  imageItemParentContainer: {
    width: 100,
    height: 100
  },
  imageItemContainer: {
    width: 95,
    height: 100,
    borderRadius: 10,
    borderColor: colors.ashGrey,
    // overflow: 'hidden',
    borderWidth: 1,
    zIndex: 999
  },
  crossIconContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    zIndex: 999999
  },
  imageStyle: {
    borderRadius: 10
  },
  addMoreImages: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: colors.white,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  addMoreImagesBtn: {
    justifyContent: 'center',
    marginRight: 20
  },
  selectedImagesListContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  imagesSeperator: {
    paddingRight: 20
  },
  buttonSeperator: {
    paddingTop: 30
  }
})

export {
  styles as addPartStyle
}