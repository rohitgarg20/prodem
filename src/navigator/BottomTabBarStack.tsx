import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { BottomTabBarComponent } from '../common/components/screens/bottom-tab/TabBarComponent'
import { ScreenNames } from '../common/Screens'
import { AccountScreen } from '../screens/account'
import { AddPartScreen } from '../screens/add-part'
import { AskOfferScreen } from '../screens/ask-offer'
import { CartScreen } from '../screens/cart'
import { HomeScreen } from '../screens/Home'

const TabBar = createBottomTabNavigator()

const { HOME_SCREEN, CART_SCREEN, ASK_OFFER, ADD_PART_SCREEN, ACCOUNT_SCREEN } = ScreenNames


const renderBottomTabBar = (props) => {
  return (
    <BottomTabBarComponent {...props} />
  )
}

export const BottomTabBarNavigator = () => {
  return (
    <TabBar.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true
    }}
    tabBar={renderBottomTabBar}
    >
      <TabBar.Screen name = {HOME_SCREEN}
        component = {HomeScreen} />
      <TabBar.Screen name = {ADD_PART_SCREEN}
        component = {AddPartScreen} />
      <TabBar.Screen name = {CART_SCREEN}
        component = {CartScreen} />
      <TabBar.Screen name = {ASK_OFFER}
        component = {AskOfferScreen} />
      <TabBar.Screen name = {ACCOUNT_SCREEN}
        component = {AccountScreen} />
    </TabBar.Navigator>
  )
}