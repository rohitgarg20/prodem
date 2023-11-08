import React, { memo } from 'react'

import { isEmpty } from 'lodash'
import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import { scale } from '../../../utils/scaling'
import { log } from '../../config/log'
import { fonts } from '../../fontUtils'
import { ICustomText } from '../../Interfaces'

export const CustomText = memo((props: ICustomText) => {

  const {
    text, textStyle, fontSize = 14, lineHeight, color, children,
    isAnimated = false, fontWeight = '500', ...restProps
  } = props

  const TextComponent: typeof React.Component = isAnimated ? Animated.Text : Text

  const getFontFamily = () => {
    if(!fontWeight) {
      return fonts.ROBOTO_REGULAR
    }
  }

  // log('CustomTextCustomText', props)

  const getTextStyle = () => {
    return {
      fontSize: scale(fontSize),
      lineHeight: scale(lineHeight || fontSize * 1.5),
      color,
      fontWeight: fontWeight || '500',
      fontFamily: getFontFamily(),
      ...(!isEmpty(textStyle) ? textStyle as object : {})
    }
  }


  if (text) {
    return (
      <TextComponent
        allowFontScaling = {false}
        style = {getTextStyle()}
        {...restProps} >
        {text}
      </TextComponent>
    )
  }

  if (!isEmpty(children)) {
    return (
      <TextComponent
        style = {getTextStyle()}
        allowFontScaling = {false}
        {...restProps} >
        {children}
      </TextComponent>
    )
  }

  return (
    null
  )

})

