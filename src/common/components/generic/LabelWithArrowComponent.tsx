import React, { memo, useMemo } from 'react'

import { get, map } from 'lodash'
import { Pressable, ScrollView, StyleProp, StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native'

import { CustomText } from './CustomText'
import { IconWrapper } from './IconWrapper'
import { scale } from '../../../utils/scaling'
import { colors, textColor } from '../../Colors'
import { log } from '../../config/log'
import { icons } from '../../Icons'
import { IDropDownItem } from '../../Interfaces'

interface ITextDropDownComponent {
  onPress: (fieldKey: string, dropdownData?: IDropDownItem[] | []) => void
  dropdownData?: IDropDownItem[] | []
  defaultValue?: string
  selectedDropDownItem?: IDropDownItem
  multiSelectDropDownItem?: string[]
  dropDownKey: string
  propsTextColor?: string
  dropDownContainerStyle?: StyleProp<ViewStyle>
  fontSize?: number
  lineHeight?: number
  fontWeight?: string
  showMultiSelectList?: boolean
}


const styles = StyleSheet.create({
  roundedTextInputBox: {
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.ashGrey,
    flexDirection: 'row',
    paddingLeft: scale(8),
    paddingVertical: scale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: scale(16)
  },
  roundedItemContaier: {
    borderRadius: 5,
    borderColor: colors.primary,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 10
  }
})

export const LabelWithArrowComponent = memo((props: ITextDropDownComponent) => {

  const {
    onPress, dropdownData, defaultValue, selectedDropDownItem, dropDownKey, propsTextColor,
    dropDownContainerStyle = {}, fontSize, lineHeight, fontWeight, showMultiSelectList = false,
    multiSelectDropDownItem = []
  } = props


  const renderTextComponent = () => {
    const selectedItemValue = get(selectedDropDownItem, 'value')
    log('multiSelectDropDownItem', multiSelectDropDownItem)
    if(showMultiSelectList && multiSelectDropDownItem?.length > 0) {
      return (
        <View>
          {
            map(multiSelectDropDownItem, (singleItem) => {
              return (
                <View style={styles.roundedItemContaier}>
                  <CustomText
                    text={singleItem}
                    color={propsTextColor || (selectedItemValue ? textColor.black : textColor.stormGrey)}
                    fontSize={fontSize || 16}
                    lineHeight={lineHeight || 22}
                    fontWeight={fontWeight}
                  />
                </View>
              )
            })
          }
        </View>

      )
    }

    return (
      <CustomText
        text={selectedItemValue || defaultValue}
        color={propsTextColor || (selectedItemValue ? textColor.black : textColor.stormGrey)}
        fontSize={fontSize || 16}
        lineHeight={lineHeight || 22}
        fontWeight={fontWeight}
      />
    )
  }

  const renderArrowComponent = () => {
    return (
      <IconWrapper
        iconSource={icons.DOWN_ARROW}
        iconHeight={12}
        iconWidth={12}
      />
    )
  }

  const onPressDropDown = () => {
    onPress(dropDownKey, dropdownData)
  }

  const getContainerStyle = useMemo(() => {
    return [
      styles.roundedTextInputBox,
      dropDownContainerStyle
    ]
  }, [dropDownContainerStyle])

  return (
    <Pressable style = {getContainerStyle}
      onPress={onPressDropDown}>
      {renderTextComponent()}
      {renderArrowComponent()}
    </Pressable>
  )


})