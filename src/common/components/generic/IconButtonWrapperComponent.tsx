import React, { memo } from 'react'

import { Pressable } from 'react-native'

import { IconWrapper } from './IconWrapper'
import { IIconButtonWrapper } from '../../Interfaces'

export const IconButtonWrapperComponent = memo((props: IIconButtonWrapper) => {

  const { onPressIcon, buttonContainerStyle = {}, isDisabled = false,  ...restProps } = props

  return (
    <Pressable onPress={onPressIcon}
      style={buttonContainerStyle}
      disabled={isDisabled}
    >
      <IconWrapper {...restProps}/>
    </Pressable>
  )
})