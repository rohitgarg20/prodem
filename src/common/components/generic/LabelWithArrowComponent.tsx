import React, { memo, useMemo } from 'react'

import { get } from 'lodash'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

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
  dropDownKey: string
  propsTextColor?: string
  dropDownContainerStyle?: StyleProp<ViewStyle>
  fontSize?: number
  lineHeight?: number
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
  }
})

export const LabelWithArrowComponent = memo((props: ITextDropDownComponent) => {

  const {
    onPress, dropdownData, defaultValue, selectedDropDownItem, dropDownKey, propsTextColor,
    dropDownContainerStyle = {}, fontSize, lineHeight
  } = props


  const renderTextComponent = () => {
    const selectedItemValue = get(selectedDropDownItem, 'value')


    return (
      <CustomText
        text={selectedItemValue || defaultValue}
        color={propsTextColor || (selectedItemValue ? textColor.black : textColor.stormGrey)}
        fontSize={fontSize || 16}
        lineHeight={lineHeight || 22}
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