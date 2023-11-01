import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useRef } from 'react'

import { isEmpty } from 'lodash'
import { Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

import { TextInputComponent } from './TextInputComponent'
import { textColor } from '../../Colors'
import { isNumbers } from '../../validators/validation-utils'


const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 20
  },
  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize:  18,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: textColor.darkOrange,
    marginRight: 0
  },
  otpItemContainer: {
    // borderWidth: 1,
    borderRadius: 7,
    backgroundColor: textColor.white,
    height: 52,
    width: 55,
    padding: 5,
    borderWidth: 1,
    borderColor: textColor.primary,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center'

  }
})

interface IProps {
  otpLength: number
  onChangeOtpValue: (value) => void
  otpInputValue: any[]
  isDisabled?: boolean
}

export const OtpInputComponent = forwardRef((props: IProps, ref) => {
  const { otpLength, onChangeOtpValue, otpInputValue, isDisabled = false} = props
  const otpFields = Array(otpLength).fill(0)
  const otpInputRef: any = useRef([])

  const resetFocusPosition = useCallback(() => {
    // log('resetFocusPosition called')
    // otpInputRef.current[0].focus()
  }, [])


  useImperativeHandle(ref, () => {
    return {
      focusTextInput: () => resetFocusPosition()
    }
  }, [resetFocusPosition])

  useEffect(() => {
    resetFocusPosition()
  }, [resetFocusPosition])

  const onChangeOtpInputValue = (otpVal, index) => {
    const isNumber = isNumbers(otpVal)
    if (isNumber) {
      const updatedOtpValue = [ ...otpInputValue, otpVal]
      onChangeOtpValue(updatedOtpValue)
      if (otpInputRef?.current?.[index + 1]) {
        otpInputRef?.current?.[index + 1]?.focus()
      } else {
        otpInputRef?.current?.[index]?.blur()
      }
    } else if (isEmpty(otpVal)) {
      const tempOtp = [ ...otpInputValue]
      tempOtp.splice(index, 1)
      onChangeOtpValue(tempOtp)
      otpInputRef?.current?.[index]?.focus()
    } else {
      onChangeOtpValue(otpInputValue)
    }
  }

  const keyboardDidHide = useCallback(() => {
    // log('keyboardDidHide is called')
    otpFields.forEach((_ , index) => {
      if (otpInputRef?.current[index]?.isFocused()) {
        otpInputRef.current[index].blur()
      }
    })
  }, [otpFields])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    return () => keyboardDidHideListener.remove()
  }, [keyboardDidHide])

  const onKeyPress = (event, index) => {
    const { key } = event.nativeEvent
    if (key === 'Backspace' && !otpInputValue[index]) {
      let filteredOutput: any = []
      filteredOutput = otpInputValue.filter((value, otpFieldNo) => otpFieldNo < index - 1)
      onChangeOtpValue(filteredOutput)
      otpInputRef.current[index === 0 ? index : index - 1].focus()
    }
  }


  const renderOtpItem = (index) => {
    // log('renderOtpItemrenderOtpItem', index)
    return (
      <TextInputComponent
        textInputRef={(textInputRef) => {
          otpInputRef.current[index] = textInputRef
        }}
        style = {styles.textInput}
        maxLength={1}
        selectionColor = {textColor.primary}
        keyboardType={'number-pad'}
        value={otpInputValue?.[index] || ''}
        onChangeText={(value) => onChangeOtpInputValue(value, index)}
        onKeyPress = {(event) => onKeyPress(event, index) }
        editable = {!isDisabled}
      />
    )
  }

  const renderOtpComponent = () => {
    return (
      <View style = {styles.mainContainer}
        pointerEvents='none'>
        {otpFields.map((_, index) => {
          return (
            <View style = {styles.otpItemContainer}>
              {renderOtpItem(index)}
            </View>
          )
        })}
      </View>
    )
  }

  const updateFocusedIndex = () => {
    for (let index = 0; index < otpLength; index++ ) {
      if (!otpInputValue[index] || (index === otpLength - 1)) {
        otpInputRef.current[index].focus()
        break
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={updateFocusedIndex}
      style = {{
      // width: '100%',
        backgroundColor: 'yellow'
      }}>
      <View>
        {renderOtpComponent()}
      </View>
    </TouchableWithoutFeedback>
  )
})

