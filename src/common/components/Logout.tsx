import { Alert } from 'react-native'

import { logoutUser } from '../../redux/profile/ProfileApi'
import { tString } from '../../utils/app-utils'

export const logoutAlert = () => {
  Alert.alert(tString('MultiLanguageString.LOGOUT'), tString('MultiLanguageString.ARE_YOU_SURE'), [
    {
      text: tString('MultiLanguageString.CANCEL')

    },
    {
      text: tString('MultiLanguageString.LOGOUT'),
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

