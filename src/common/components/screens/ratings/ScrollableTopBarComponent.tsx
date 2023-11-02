import React, { memo, useCallback } from 'react'

import { map } from 'lodash'
import { ScrollView, StyleSheet } from 'react-native'

import { scale } from '../../../../utils/scaling'
import { colors } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { ITopTabBarItem } from '../../../Interfaces'
import { ButtonComponent } from '../../generic'

interface IProps {
  tabBarList: ITopTabBarItem[]
  selectedTabKey: any
  onPressTab: (tabKey: any) => void
  buttonWidth?: number
}

interface ITabBarItemProps {
  tabBarItem: ITopTabBarItem
  isTabSelected: Boolean
  onPressTab: (tabKey: any) => void
  buttonWidth?: number
}

const styles = StyleSheet.create({
  btnContainer: {
    width: scale(115)
  },
  unSelectedTabBtnContainer: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2
  },
  listContent: {
    columnGap: 10,
    paddingVertical: scale(20),
    paddingHorizontal: scale(10),
    paddingRight: 20
  }
})


export const TopTabBarItemComponent = memo((props: ITabBarItemProps) => {
  const { tabBarItem, isTabSelected, onPressTab, buttonWidth = 0 } = props
  const  { label, key } = tabBarItem

  const onPressTabItem = useCallback(() => {
    if(onPressTab) {
      onPressTab(key)
    }
  }, [onPressTab, key])

  const getBtnContainerStyle = useCallback(() => {
    let btnStyle = {}
    if(isTabSelected) {
      btnStyle = styles.btnContainer
    } else {
      btnStyle = {
        ...styles.btnContainer,
        ...styles.unSelectedTabBtnContainer
      }
    }
    if(buttonWidth > 0) {
      btnStyle = {
        ...btnStyle,
        width: buttonWidth
      }
    }
    return btnStyle
  }, [isTabSelected, buttonWidth])

  return (
    <ButtonComponent
      buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      text={label}
      onPress={onPressTabItem}
      buttonContainerStyle={getBtnContainerStyle()}
      color={ isTabSelected ? colors.white : colors.lightBlack }
    />
  )
})

export const ScrollableTopBarComponent = (props: IProps) => {
  const { tabBarList,  selectedTabKey, onPressTab, buttonWidth } = props

  const renderTabBarItem = (item) => {
    const { key } = item
    return (
      <TopTabBarItemComponent
        tabBarItem={item}
        isTabSelected={selectedTabKey === key}
        onPressTab={onPressTab}
        key={key}
        buttonWidth={buttonWidth}
      />
    )
  }

  return (
    <ScrollView horizontal
      contentContainerStyle={styles.listContent} >
      {
        map(tabBarList, renderTabBarItem)
      }
    </ScrollView>
  )
}