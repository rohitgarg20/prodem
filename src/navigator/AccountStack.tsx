import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { RatingsScreen } from '../screens/account/ratings/RatingsScreen'
import { SubscriptionScreen } from '../screens/account/subscription/SubscriptionScreen'

const Stack = createStackNavigator()

export const AccountStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.RATINGS_SCREEN}
        component={RatingsScreen} />
      <Stack.Screen name={ScreenNames.SUBSCRIPTION_SCREEN}
        component={SubscriptionScreen} />
    </Stack.Navigator>
  )
}