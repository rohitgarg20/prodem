import React, { useEffect } from 'react'

import { StyleSheet, View } from 'react-native'

import { colors } from '../../common/Colors'
import { IconWrapper } from '../../common/components'
import { icons } from '../../common/Icons'
import { StackNames } from '../../common/Screens'
import { fetchUserProfileData } from '../../redux/profile/ProfileApi'
import { getAuthToken } from '../../utils/auth-utils'
import { replaceNavigation } from '../../utils/navigation-utils'
import { scale, verticalScale } from '../../utils/scaling'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20)
  }
})

export const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const authToken = getAuthToken()
    if(authToken?.length) {
      replaceNavigation({
        navigator: navigation,
        screenToNavigate: StackNames.PARENT_STACK
      })
      fetchUserProfileData()
    } else {
      replaceNavigation({
        navigator: navigation,
        screenToNavigate: StackNames.LOGIN_STACK
      })
    }
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <IconWrapper
        iconSource={icons.PODEM_LOGO}
        iconWidth={'100%'}
        iconHeight={verticalScale(50)}
      />
    </View>
  )
}