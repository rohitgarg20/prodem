import React from 'react'

import { icons } from '../../Icons'
import { IPasswordVisibleComponent } from '../../Interfaces'
import { IconButtonWrapperComponent } from '../generic'


export const PasswordVisibiltyComponent = (props: IPasswordVisibleComponent) => {
  const {
    isPasswordVisible, onPressIcon, iconWidth = 24, iconHeight = 24, iconSource, ...restProps
  } = props

  let uiIconSource = iconSource ? iconSource : ( isPasswordVisible ?  icons.PASSWORD_VISIBLE : icons.PASSWORD_INVISIBLE )


  return (
    <IconButtonWrapperComponent
      iconSource={uiIconSource}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      onPressIcon={onPressIcon}
      { ...restProps}
    />
  )
}