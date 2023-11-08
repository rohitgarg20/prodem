import React from 'react'

import { Alert } from 'react-native'
import { logoutUser } from '../../redux/profile/ProfileApi'

export const logoutAlert = () => {
  Alert.alert('Logout', 'Are you sure you want to logout', [
    {
      text: 'Cancel'

    },
    {
      text: 'Logout',
      onPress: () => {
        logoutUser()
      }
    }
  ],
  {
    cancelable: true
  }
  )
}