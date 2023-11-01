import React, { memo, useCallback } from 'react'

import { Pressable, StyleSheet } from 'react-native'

import { CustomText } from './CustomText'
import { IconWrapper } from './IconWrapper'
import { scale } from '../../../utils/scaling'
import { log } from '../../config/log'
import { IOptionIconWithLabelComponent } from '../../Interfaces'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    paddingLeft: 15
  }
})

export const OptionIconWithLabelComponent = memo((props: IOptionIconWithLabelComponent) => {
  const { icon, label, itemKey, onPressItem, containerStyle = {}, tintColor = undefined, textStyleContainer = {} } = props
  const onPress = () => {
    if(onPressItem) {
      onPressItem({
        icon, label, key: itemKey
      })
    }
  }

  const getContainerStyle = useCallback(() => {
    return [styles.rowContainer, containerStyle]
  }, [containerStyle])

  const getTextStyle = useCallback(() => {
    return {
      ...styles.textStyle,
      ...(textStyleContainer as Object || {})
    }
  }, [textStyleContainer])

  return (
    <Pressable
      style={getContainerStyle()}
      onPress={onPress}
      key = {itemKey}
    >
      <IconWrapper
        iconHeight={scale(26)}
        iconWidth={scale(26)}
        iconSource={icon}
        tintColor={tintColor}
      />

      <CustomText
        text={label}
        fontSize={20}
        textStyle={getTextStyle()}
        numberOfLines={1}
      />
    </Pressable>
  )

})