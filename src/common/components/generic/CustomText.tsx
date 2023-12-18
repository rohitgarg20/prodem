import React, { memo } from 'react'

import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import { scale } from '../../../utils/scaling'
import { textColor } from '../../Colors'
import { isIos } from '../../Constant'
import { fonts } from '../../fontUtils'
import { ICustomText } from '../../Interfaces'

export const CustomText = memo((props: ICustomText) => {

  const {
    text, textStyle, fontSize = 14, lineHeight, color = textColor.black, children,
    isAnimated = false, fontWeight = isIos ? undefined : '500', ...restProps
  } = props
  const { t } = useTranslation()

  const TextComponent: typeof React.Component = isAnimated ? Animated.Text : Text

  const getFontFamily = () => {
    if(!fontWeight) {
      return isIos ? fonts.POPPINS_REGULAR : fonts.ROBOTO_REGULAR
    }
    if(fontWeight && fontWeight >= '500' && isIos) {
      return fonts.POPPINGS_BOLD
    }

  }


  const getTextStyle = () => {
    return {
      fontSize: scale(fontSize),
      lineHeight: scale(lineHeight || fontSize * 1.5),
      color,
      fontWeight: fontWeight,
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
        {t(text)}
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

