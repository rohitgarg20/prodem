import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { CheckUserExistanceScreen } from '../screens/CheckUserExistance'
import { EmailVerifyForgetPassword } from '../screens/ForgetPassword/EmailVerifyForgetPassword'
import { SetPasswordScreen } from '../screens/ForgetPassword/SetPasswordScreen'
import { OtpVerificationScreen } from '../screens/otp-verification'
import { LoginScreen } from '../screens/signin/LoginScreen'
import { SignUpScreen } from '../screens/signup'
import { TermsOfConditionScreen } from '../screens/terms-of-condition/TermsOfConditionScreen'


const Stack = createStackNavigator()

const { LOGIN_SCREEN, SIGNUP_SCREEN, SET_PASSWORD, FORGET_PASSWORD, EMAIL_VERIFICATION, CHECK_USER_EXISTANCE, TERMS_OF_CONDITION_SCREEN } = ScreenNames

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={CHECK_USER_EXISTANCE}
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name = {CHECK_USER_EXISTANCE}
        component={CheckUserExistanceScreen} />
      <Stack.Screen name = {LOGIN_SCREEN}
        component={LoginScreen} />
      <Stack.Screen name = {SIGNUP_SCREEN}
        component={SignUpScreen} />
      <Stack.Screen name = {EMAIL_VERIFICATION}
        component={OtpVerificationScreen} />
      <Stack.Screen name = {SET_PASSWORD}
        component={SetPasswordScreen} />
      <Stack.Screen name = {FORGET_PASSWORD}
        component={EmailVerifyForgetPassword} />
      <Stack.Screen name = {TERMS_OF_CONDITION_SCREEN}
        component={TermsOfConditionScreen} />
    </Stack.Navigator>
  )
}

export default LoginStack