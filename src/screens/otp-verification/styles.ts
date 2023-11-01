import { StyleSheet } from 'react-native'

import { colors, textColor } from '../../common/Colors'

export const OtpVerificationStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightBlack
  },
  paddingContainer: {
    paddingTop: 20,
    paddingHorizontal: 40
  },
  heading: {
    fontSize: 22,
    letterSpacing: 0,
    textAlign: 'center',
    fontWeight: '700'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeading: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  description: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    fontWeight: '500'
  },
  sendOtp: {
    fontWeight: '600',
    fontSize: 16
  },
  sendOtpBtnContainer: {
    minWidth: 150
  },
  otpMarginContainer: {
    marginTop: 30,
    alignSelf: 'center'
  },
  otpContainer: {
    flex: 1,
    backgroundColor: colors.lightBlack
  },
  otpInputContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 15
  },
  resendText: {
    borderBottomWidth: 2,
    borderColor: textColor.lightGrey,
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  verifyOtpBtnStyle: {
    paddingHorizontal: 20
  },
  backBtnSeperator: {
    paddingTop: 20
  }
})