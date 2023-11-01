import React, { memo, useCallback } from 'react'

import { map } from 'lodash'
import { ScrollView, StyleSheet } from 'react-native'

import { scale } from '../../../../utils/scaling'
import { colors } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { ITopTabBarItem, RatingTypes } from '../../../Interfaces'
import { ButtonComponent } from '../../generic'

interface IProps {
  tabBarList: ITopTabBarItem[]
  selectedTabKey: RatingTypes
  onPressTab: (tabKey: RatingTypes) => void
}

interface ITabBarItemProps {
  tabBarItem: ITopTabBarItem
  isTabSelected: Boolean
  onPressTab: (tabKey: RatingTypes) => void
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
  const { tabBarItem, isTabSelected, onPressTab } = props
  const  { label, key } = tabBarItem

  const onPressTabItem = useCallback(() => {
    if(onPressTab) {
      onPressTab(key)
    }
  }, [onPressTab, key])

  const getBtnContainerStyle = useCallback(() => {
    if(isTabSelected) {
      return styles.btnContainer
    } else {
      return {
        ...styles.btnContainer,
        ...styles.unSelectedTabBtnContainer
      }
    }
  }, [isTabSelected])

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
  const { tabBarList,  selectedTabKey, onPressTab } = props

  const renderTabBarItem = (item) => {
    const { key } = item
    return (
      <TopTabBarItemComponent
        tabBarItem={item}
        isTabSelected={selectedTabKey === key}
        onPressTab={onPressTab}
        key={key}
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