import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { AccountStack } from './AccountStack'
import { AddPartStack } from './AddPartStack'
import { AskOfferStack } from './AskOfferStack'
import { BottomTabBarNavigator } from './BottomTabBarStack'
import { CartStack } from './CartStack'
import { HomeStack } from './HomeStack'
import { StackNames } from '../common/Screens'

const Stack = createStackNavigator()

const { ACCOUNT_STACK, ASK_OFFER_STACK, ADD_PART_STACK, HOME_STACK, CART_STACK, BOTTOM_TAB_STACK } = StackNames

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={BOTTOM_TAB_STACK}
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name = {BOTTOM_TAB_STACK}
        component={BottomTabBarNavigator} />
      <Stack.Screen name = {HOME_STACK}
        component = {HomeStack} />
      <Stack.Screen name = {ADD_PART_STACK}
        component = {AddPartStack} />
      <Stack.Screen name = {CART_STACK}
        component = {CartStack} />
      <Stack.Screen name = {ASK_OFFER_STACK}
        component = {AskOfferStack} />
      <Stack.Screen name = {ACCOUNT_STACK}
        component = {AccountStack} />
    </Stack.Navigator>

  )
}

export default MainStackNavigator