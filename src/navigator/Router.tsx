import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

export const Router = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      {/* {
        false ? (
          <Stack.Screen name = 'ddd'
            component={LoginScreen} />
        ) : (
          <Stack.Screen name = 'loginStack'
            component={require('../navigator/LoginStack').default} />
        )} */}
      {/* <Stack.Screen name = 'loginStack'
        component={require('../navigator/LoginStack').default} /> */}
      <Stack.Screen name = 'loginStack'
        component={require('../navigator/MainStack').default} />
    </Stack.Navigator>
  )

}