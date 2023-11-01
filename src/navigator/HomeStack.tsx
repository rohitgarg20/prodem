import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { ProductListScreen } from '../screens/Home'
import { ProductDetailScreen } from '../screens/Home/ProductDetailScreen'

const Stack = createStackNavigator()

export const HomeStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.PRODUCT_LIST_SCREEN}
        component={ProductListScreen} />
      <Stack.Screen name={ScreenNames.PRODUCT_DETAIL_SCREEN}
        component={ProductDetailScreen} />
    </Stack.Navigator>
  )
}