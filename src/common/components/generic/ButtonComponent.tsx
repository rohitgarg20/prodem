import React, { memo, useCallback } from 'react'

import { isEmpty } from 'lodash'
import { Pressable, StyleProp, StyleSheet, TextStyle } from 'react-native'

import { CustomText } from './CustomText'
import { textColor } from '../../Colors'
import { ButtonType } from '../../Enumerators'
import { IButtonComponent } from '../../Interfaces'

const { SIMPLE_BTN, ROUNDED_BTN_WITH_UNDERLINE_TEXT } = ButtonType

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f09a4e'
  },
  disabled: {
    opacity: 0.75
  }
})

export const ButtonComponent = memo((props: IButtonComponent) => {

  const {
    text, fontSize = 16, fontWeight = '400',
    color = props.buttonType === SIMPLE_BTN ? textColor.primary : textColor.white,
    lineHeight, textStyle = {}, isAnimated = false, buttonType, buttonContainerStyle = {},  ...restProps
  } = props

  const getButtonContainerStyle = useCallback(() => {
    if(isEmpty(buttonContainerStyle)) {
      return styles.buttonContainer
    } else {
      return [styles.buttonContainer, buttonContainerStyle]
    }
  }, [buttonContainerStyle])

  const getTextContainerStyle = useCallback(() => {
    if(buttonType === ROUNDED_BTN_WITH_UNDERLINE_TEXT) {
      return {
        ...(textStyle as object),
        textDecorationLine: 'underline',
        textDecorationColor: '#ff963a'
      } as StyleProp<TextStyle>
    }
    return {
      ...(textStyle as object)
    } as StyleProp<TextStyle>

  }, [textStyle, buttonType])

  if(buttonType === SIMPLE_BTN) {
    return (
      <Pressable {...restProps}
        style={buttonContainerStyle}
      >
        <CustomText
          text={text}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color = {color}
          lineHeight={lineHeight}
          isAnimated={isAnimated}
          textStyle={textStyle}
        />
      </Pressable>
    )
  }


  return (
    <Pressable {...restProps}
      style={getButtonContainerStyle()}>
      <CustomText
        text={text}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color = {color}
        lineHeight={lineHeight}
        isAnimated={isAnimated}
        textStyle={getTextContainerStyle()}
      />
    </Pressable>
  )
})
