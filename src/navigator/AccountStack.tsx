import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { ScreenNames } from '../common/Screens'
import { RatingsScreen } from '../screens/account/ratings/RatingsScreen'
import ProfileScreen from '../screens/account/profile-screen/ProfileScreen'
import EditProfileScreen from '../screens/account/edit-profile-screen.tsx/EditProfileScreen'
import ProfileNameEditScreen from '../screens/account/profile-name-edit-screen/ProfileNameEditScreen'
import MyBidRequestScreen from '../screens/account/my-bid-request-screen/MyBidRequestScreen'
import WinningBidScreen from '../screens/account/winning-bid-screen/WinningBidScreen'

const Stack = createStackNavigator()

export const AccountStack = () => {
  return (
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ScreenNames.RATINGS_SCREEN} component={RatingsScreen} />
      <Stack.Screen name={ScreenNames.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
      <Stack.Screen name={ScreenNames.EDIT_NAME_PROFILE_SCREEN} component={ProfileNameEditScreen} />
      <Stack.Screen name={ScreenNames.MY_BID_REQUEST_SCREEN} component={MyBidRequestScreen} />
      <Stack.Screen name={ScreenNames.WINNING_BID_SCREEN} component={WinningBidScreen} />
    </Stack.Navigator>
  )
}