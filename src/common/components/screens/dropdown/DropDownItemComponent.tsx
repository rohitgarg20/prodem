import React, { memo } from 'react'

import { Pressable } from 'react-native'

import { textColor } from '../../../Colors'
import { IDropDownItem } from '../../../Interfaces'
import { CustomText } from '../../generic'


export const DropDownItemComponent = memo(({
  dropDownItem,
  onPressDropDownItem
}: { dropDownItem: IDropDownItem; onPressDropDownItem: (dropDownItem: IDropDownItem) => void}) => {
  const { value } = dropDownItem

  const onPressItem = () => {
    onPressDropDownItem(dropDownItem)
  }

  return (
    <Pressable onPress={onPressItem}>
      <CustomText
        text={value?.toString() || ''}
        lineHeight={24}
        fontSize={16}
        color={textColor.cinder}
      />
    </Pressable>
  )


})