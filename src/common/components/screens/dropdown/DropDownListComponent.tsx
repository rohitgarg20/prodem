import React, { useCallback } from 'react'

import { StyleSheet, View, FlatList, ViewProps, StyleProp, ViewStyle  } from 'react-native'

import { DropDownItemComponent } from './DropDownItemComponent'
import { scale } from '../../../../utils/scaling'
import { colors } from '../../../Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../Constant'
import { IDropDownItem } from '../../../Interfaces'


const styles = StyleSheet.create({
  itemSeperatorContainer: {
    height: scale(10),
    borderTopWidth: 1,
    width: '100%',
    borderColor: colors.mediumGrey
  },
  dropDownContainer: {
    paddingVertical: 0.1 * SCREEN_HEIGHT
  },
  flatlistContainer: {
    backgroundColor: colors.softPeach,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: scale(10),
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 20,
    border: 1
  },
  dropdownFooter: {
    borderTopWidth: 1,
    width: '100%',
    borderColor: colors.mediumGrey
  }
})

export const DropDownListComponent = (
  {
    dropdownList,
    onPressDropDownItem,
    fieldKey,
    dropDownContainer,
    flatlistContainer
  }: {
    dropdownList: IDropDownItem[]
    onPressDropDownItem: (dropDownItem: IDropDownItem, fieldKey: string) => void
    fieldKey: string
    dropDownContainer?: StyleProp<ViewStyle>
    flatlistContainer?: StyleProp<ViewStyle>
  }
) => {

  const onPressItem = useCallback((dropDownItem: IDropDownItem) => {
    onPressDropDownItem(dropDownItem, fieldKey)
  }, [fieldKey, onPressDropDownItem])

  const renderDropDownItemComponent = ({ item }) => {
    return (
      <DropDownItemComponent
        dropDownItem={item}
        onPressDropDownItem={onPressItem}
      />
    )
  }

  const getKeyExtractor = (item: IDropDownItem, index: number) => {
    return item?.id?.toString() || item?.value?.toString() || index.toString()
  }

  const itemSeperatorCompoent = () => {
    return (
      <View style={styles.itemSeperatorContainer}/>
    )
  }

  const footerComponent = () => {
    return (
      <View style={styles.itemSeperatorContainer}/>
    )
  }

  const getDropdownContainerStyle = useCallback(() => {
    return [
      styles.dropDownContainer,
      dropDownContainer
    ]
  }, [dropDownContainer])

  const getFlatlistContainerStyle = useCallback(() => {
    return [
      styles.flatlistContainer,
      flatlistContainer
    ]
  }, [flatlistContainer])

  return (
    <View style={getDropdownContainerStyle()}>
      <FlatList
        data={dropdownList}
        contentContainerStyle={getFlatlistContainerStyle()}
        renderItem={renderDropDownItemComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={itemSeperatorCompoent}
        ListFooterComponent={footerComponent}
      />
    </View>
  )
}