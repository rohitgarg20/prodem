import React, { useCallback, useEffect, useState } from 'react'

import { get, map } from 'lodash'
import { View, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import  Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { setParentStackName } from '../../../../utils/navigation-utils'
import { scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { BOTTOM_TAB_CONFIG, StackNames } from '../../../Screens'
import { CustomText, IconWrapper } from '../../generic'


const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.fuscosGrey,
    borderTopWidth: 1,
    alignItems: 'center',
    elevation: 5
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  tabBarItemContainer: {
    width: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tabBarName: {
    paddingTop: scale(10),
    fontWeight: 'bold'
  },
  selectedIconContainer: {
    position: 'absolute',
    top: -25,
    height: 50,
    width: 50
  },
  selectedIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    paddingTop: 10,
    backgroundColor: colors.fuscosGrey,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export const BottomTabBarComponent = ({ state, navigation }) => {


  const [isTabBarVisible, updateTabBarVisibleStatus] = useState(true)

  const onPressTabItem = (childStackName, tabName) => {
    setParentStackName(childStackName)
    navigation.navigate(tabName)
  }


  const keyboardDidHide = useCallback(() => {
    updateTabBarVisibleStatus(true)
  }, [])

  const keyboardDidShow = useCallback(() => {
    log('keyboardDidShowkeyboardDidShow')
    updateTabBarVisibleStatus(false)
  }, [])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [keyboardDidHide, keyboardDidShow])


  useEffect(() => {
    setParentStackName(StackNames.HOME_STACK)
  }, [])

  useEffect(() => {
    const { index, routeNames = [] } = state || {}
    const activeTabName = get(routeNames, `${index}`, 0)
    const { childStackName } = BOTTOM_TAB_CONFIG[activeTabName]
    setParentStackName(childStackName)
  }, [state])


  const getActiveTabIndex = useCallback(() => {
    return state.index
  }, [state.index])


  const renderTabItem = (routeName, index) => {

    const { childStackName, displayName, icon } = BOTTOM_TAB_CONFIG[routeName]
    const isTabActive = getActiveTabIndex() === index

    return (
      <TouchableOpacity onPress={() => onPressTabItem(childStackName, routeName)}
        style = {styles.tabBarItemContainer}>
        { isTabActive ?
          (<View style={styles.selectedIconContainer}>
            <View style={styles.selectedIcon}>
              <IconWrapper
                iconSource={icon}
                iconHeight={30}
                iconWidth={30}
                tintColor={colors.primary}
              />
            </View>
          </View>) :
          <IconWrapper
            iconSource={icon}
            iconHeight={23}
            iconWidth={23}
            tintColor={colors.primary}
          />
        }
        <CustomText
          fontSize={14}
          lineHeight={16}
          color={textColor.white}
          textStyle={styles.tabBarName}
        >
          {displayName}
        </CustomText>
      </TouchableOpacity>
    )
  }

  const renderBottomTabBar = () => {
    const routeNames = get(state, 'routes', [])
    return <View style={styles.tabBarContainer}>
      {map(routeNames, (routeItem, index) => {
        const { name } = routeItem
        return renderTabItem(name, index)
      })}
    </View>

  }


  if(!isTabBarVisible) return null

  return (
    <View style={styles.mainContainer}>
      {renderBottomTabBar()}
    </View>
  )
}
