import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { AddPartScreen } from '../screens/add-part'

const Stack = createStackNavigator()

export const AddPartStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.ADD_PART_SCREEN}
        component={AddPartScreen} />
    </Stack.Navigator>
  )
}