import { colors } from '../../../common/Colors'
import {StyleSheet} from 'react-native';
import { scale } from '../../../utils/scaling';


export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.white
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: scale(10),
  },
  labelText: {
    marginBottom: scale(4)
  },
  textInputContainer: {
    paddingVertical: scale(6),
  },
  textInputMultiLine: {
    height: scale(80)
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: colors.drawerBackGroundGray,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  component: {
    paddingTop: 10,
    paddingHorizontal: 6,
    backgroundColor: colors.white,
    flex: 1,
  },
  backButtonComponent: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginLeft: -5,
  },
  backButtonStyle: {
    alignSelf: 'flex-start',
  },
  headingComponent: {
    marginTop: 36,
  },
  mobileNumberInputTextStyle: {
    marginTop: 36,
  },
  passwordInputTextStyle: {
    marginTop: 24,
  },
  errorResponseComponent: {
    marginTop: 10,
  },
  loginBtnElementWrapper: {
    backgroundColor: colors.lightOrange,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnDisabledElementWrapper: {
    backgroundColor: colors.lightOrange,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    marginVertical: 10,
  },
  loginBtnLoaderStyle: {
    backgroundColor: colors.lightOrange,
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnOuterWrapper: {
    marginHorizontal: 24,
    marginTop: 24,
    height: 48,
    left: 0,
    right: 0,
    bottom: 10,
  },
  scrollViewContainerStyle: {
    paddingBottom: 30,
  },
});