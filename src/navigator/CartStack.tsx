import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { CartScreen } from '../screens/cart'

const Stack = createStackNavigator()

export const CartStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.CART_SCREEN}
        component={CartScreen} />
    </Stack.Navigator>
  )
}