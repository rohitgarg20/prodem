import React, { useCallback, useEffect, useState } from 'react'

import { StyleSheet, View, Keyboard } from 'react-native'
import  Animated, {  Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

import { ButtonComponent } from './ButtonComponent'
import { CustomText } from './CustomText'
import RadioButtonComponent from './RadioButtonComponent'
import { TextInputComponent } from './TextInputComponent'
import { tString } from '../../../utils/app-utils'
import { scale, verticalScale } from '../../../utils/scaling'
import { dimissKeyboard } from '../../App-Utils'
import { colors, textColor } from '../../Colors'
import { ratingsData } from '../../Constant'
import { ButtonType } from '../../Enumerators'
import { showAndroidToastMessage } from '../../Toast'

const styles = StyleSheet.create({
  textInputMultine: {
    height: verticalScale(70)
  },
  ratingContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: scale(30),
    paddingVertical: 20,
    borderRadius: 10,
    maxHeight: 450
  },
  ratingDescription: {
    rowGap: 10
  }
})

const SCROLL_TO = verticalScale(130)

export const SubmitRatingComponent = ({
  submitRating,
  defaultRating = -1,
  defaultDescription = ''
}: {
  submitRating: (rating: number, description: string) => void
  defaultRating?: number
  defaultDescription?: string
}) => {

  const [selectedRating, updateSelectedRating] = useState(defaultRating)
  const [description, updateDescription] = useState(defaultDescription)
  const containerPosition = useSharedValue(0)
  const onChangeRadioButton = (key) => {
    updateSelectedRating(key)
  }

  const keyboardDidHide = useCallback(() => {
    containerPosition.value = 0
  }, [containerPosition])

  const keyboardDidShow = useCallback(() => {
    containerPosition.value = 1
  }, [containerPosition])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [keyboardDidHide, keyboardDidShow])

  const renderRatingsAvailable = () => {
    return (
      <View>
        <RadioButtonComponent
          optionList={ratingsData}
          selectedKey={selectedRating}
          onValueChanged={onChangeRadioButton}
        />
      </View>
    )
  }

  const onSibmitRating = () => {
    if(!description.length) {
      showAndroidToastMessage(tString('MultiLanguageString.RATING_ERROR'))
    } else {
      dimissKeyboard()
      submitRating(selectedRating, description)
    }
  }

  const renderTextInputField = () => {
    return (
      <TextInputComponent
        value={description}
        // multiline={true}
        onChangeText={updateDescription}
        textInputType='roundedCorners'
        // textContainerStyle = {addPartStyle.textInputField}
        style={styles.textInputMultine}
      />
    )
  }

  const renderRatingDescriptionComponent = () => {
    return (
      <View style={styles.ratingDescription}>
        <CustomText
          text={'MultiLanguageString.HEADING'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <CustomText
          text={'MultiLanguageString.DESCRIPTION'}
          fontSize={14}
          color={textColor.mediumGrey}
        />
        {renderTextInputField()}
        <ButtonComponent
          buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
          text={'Save'}
          onPress={onSibmitRating}
        />
      </View>
    )
  }

  const getContainerStyle = useAnimatedStyle(() => {
    return {
      ...styles.ratingContainer,
      transform: [{
        translateY: interpolate(
          containerPosition.value,
          [0, 1],
          [0, -SCROLL_TO],
          Extrapolation.CLAMP
        )
      }]
    }
  }, [])

  return (
    <Animated.View
      style={getContainerStyle}
    >
      {renderRatingsAvailable()}
      {renderRatingDescriptionComponent()}
    </Animated.View>
  )
}