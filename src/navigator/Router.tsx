import React, { } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames, StackNames } from '../common/Screens'
import { SplashScreen } from '../screens/splash-screen/SplashScreen'


const Stack = createStackNavigator()

export const Router = () => {

  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name = {ScreenNames.SPLASH_SCREEN}
        component={SplashScreen} />
      <Stack.Screen name = {StackNames.LOGIN_STACK}
        component={require('../navigator/LoginStack').default} />
      <Stack.Screen name = {StackNames.PARENT_STACK}
        component={require('../navigator/MainStack').default} />
    </Stack.Navigator>
  )

}