import React, { useCallback } from 'react'

import { StyleSheet, View, FlatList  } from 'react-native'

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
    fieldKey
  }: {
    dropdownList: IDropDownItem[]
    onPressDropDownItem: (dropDownItem: IDropDownItem, fieldKey: string) => void
    fieldKey: string
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

  return (
    <View style={styles.dropDownContainer}>
      <FlatList
        data={dropdownList}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={renderDropDownItemComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={itemSeperatorCompoent}
        ListFooterComponent={footerComponent}
      />
    </View>
  )
}