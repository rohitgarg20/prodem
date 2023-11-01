import React, { } from 'react'

import { Pressable, StyleSheet, TextInput } from 'react-native'

import { colors, textColor } from '../../../Colors'
import { icons } from '../../../Icons'
import { IconWrapper } from '../../generic'

interface IProps {
  onPressSearchBar?: () => void
  onChangeText?: (searchText: string) => void
  inputValue?: string
  editable?: boolean
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 0,
    padding: 0,
    color: textColor.stormGrey,
    paddingLeft: 10
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    width: '100%',
    backgroundColor: colors.white,
    elevation: 10
  }
})


export const SearchBarComponent = (props: IProps) => {

  const { onPressSearchBar, onChangeText, inputValue, editable = false } = props


  const renderSearchIcon = () => {
    return (
      <IconWrapper
        iconSource={icons.SEARCH_ICON}
        iconHeight={18}
        iconWidth={18}
        tintColor={textColor.stormGrey}
      />
    )
  }

  const renderTextInputComponent = () => {
    return (
      <TextInput
        underlineColorAndroid={colors.transparent}
        placeholder={'Search by item, part number'}
        value={inputValue}
        onChangeText={onChangeText}
        placeholderTextColor={textColor.stormGrey}
        style={styles.inputContainer}
        editable={editable}
      />
    )
  }

  const onPress = () => {
    if(onPressSearchBar) {
      onPressSearchBar()
    }
  }

  return (
    <Pressable style={styles.searchBarContainer}
      onPress={onPress} >
      {renderSearchIcon()}
      {renderTextInputComponent()}
    </Pressable>
  )
}