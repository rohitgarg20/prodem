import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { AskOfferScreen } from '../screens/ask-offer'

const Stack = createStackNavigator()

export const AskOfferStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.ASK_OFFER}
        component={AskOfferScreen} />
    </Stack.Navigator>
  )
}