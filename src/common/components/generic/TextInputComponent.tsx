import React, { memo, useCallback, useState } from 'react'

import { TextInput, View, StyleSheet } from 'react-native'

import { CustomText } from './CustomText'
import { IconButtonWrapperComponent } from './IconButtonWrapperComponent'
import { scale } from '../../../utils/scaling'
import { colors, textColor } from '../../Colors'
import { log } from '../../config/log'
import { RETURN_KEY_LABEL } from '../../Constant'
import { icons } from '../../Icons'
import { ITextInputComponent } from '../../Interfaces'

const styles = StyleSheet.create({
  inputField: {
    padding: 0,
    margin: 0,
    fontSize: scale(18),
    lineHeight: 22,
    color: textColor.white
  },
  roundedCornerTextField: {
    padding: 0,
    margin: 0,
    paddingHorizontal: scale(10),
    fontSize: scale(16),
    lineHeight: 22,
    color: textColor.black
  },
  textInputContainer: {
    borderBottomWidth: 1.5,
    borderColor: textColor.primary,
    paddingBottom: 5,
    paddingTop: 10,
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  eyeContainer: {
    paddingLeft: scale(20),
    paddingBottom: scale(2),
    alignSelf: 'flex-end'
  },
  roundedTextInputBox: {
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.ashGrey
  }
})

export const TextInputComponent = memo((props: ITextInputComponent) => {

  const {
    label = '', labelColor = textColor.primary, labelSize = 18, labelStyle = {}, placeholder , value = '',
    onChangeText, keyboardType, returnKeyLabel = RETURN_KEY_LABEL.Done, returnKeyType = 'done', style,
    textFieldKey = '', onChangeUserInput, textInputRef, secureTextEntry = false, textInputType = 'default', textContainerStyle = {},
    ...restProps
  } = props

  const [isPasswordVisible, updatePasswordVisibleStatus] = useState(secureTextEntry)

  const renderLabel = useCallback(() => {
    return (
      <CustomText
        text={label}
        fontSize={labelSize}
        color={labelColor}
        textStyle = {labelStyle}
        fontWeight='400'
      />
    )
  }, [label, labelSize, labelColor, labelStyle])

  const onChangeInput = (text) => {
    log('onChangeInput', textFieldKey, )
    if(textFieldKey && onChangeUserInput) {
      onChangeUserInput(textFieldKey, text)
    } else {
      onChangeText!(text)
    }
  }

  const setTextInputRef = useCallback((ref: any) => {
    if(textInputRef) {
      textInputRef(ref)
    }
  }, [textInputRef])

  const onChange = (e) => {
    log('onChangeonChangeonChange', e)
  }

  const updatePasswordVisibilty = () => {
    updatePasswordVisibleStatus(!isPasswordVisible)
  }

  const renderEyeIcon = () => {
    return (
      <View style={styles.eyeContainer}>
        <IconButtonWrapperComponent
          iconSource={!isPasswordVisible ? icons.PASSWORD_VISIBLE : icons.PASSWORD_INVISIBLE}
          iconWidth={20}
          iconHeight={20}
          onPressIcon={updatePasswordVisibilty}
        />
      </View>
    )
  }

  const renderTextInput = (textFieldStyle) => {
    return (
      <TextInput
        underlineColorAndroid={colors.transparent}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        value={value}
        onChangeText={onChangeInput}
        // onChange={onChange}
        keyboardType={keyboardType}
        style = {[textFieldStyle, style]}
        ref={setTextInputRef}
        secureTextEntry={isPasswordVisible}
        onKeyPress={onChange}
        {...restProps}
      />
    )
  }


  const renderInputTextBox = () => {
    return (
      <View style = {styles.textInputContainer}>
        {renderTextInput(styles.inputField)}
      </View>
    )
  }

  const renderEyeAndInputTextBoxx = () => {
    return (
      <View style={styles.rowContainer}>
        {renderInputTextBox()}
        {secureTextEntry && renderEyeIcon()}
      </View>
    )
  }

  log('textInputTypetextInputType', textFieldKey)

  if(textInputType === 'default') {
    return (
      <View>
        {renderLabel()}
        {renderEyeAndInputTextBoxx()}
      </View>
    )
  }


  return (
    <View style = {[styles.roundedTextInputBox, textContainerStyle]}>
      {renderTextInput(styles.roundedCornerTextField)}
    </View>
  )

})