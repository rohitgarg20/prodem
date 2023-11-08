import React, { useState } from 'react'

import { StyleSheet, View } from 'react-native'

import { ButtonComponent } from './ButtonComponent'
import { CustomText } from './CustomText'
import RadioButtonComponent from './RadioButtonComponent'
import { TextInputComponent } from './TextInputComponent'
import { scale, verticalScale } from '../../../utils/scaling'
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
    borderRadius: 10
  },
  ratingDescription: {
    rowGap: 10
  }
})

export const SubmitRatingComponent = ({ submitRating }: { submitRating: (rating: number, description: string) => void }) => {

  const [selectedRating, updateSelectedRating] = useState(-1)
  const [description, updateDescription] = useState('')

  const onChangeRadioButton = (key) => {
    updateSelectedRating(key)
  }

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
      showAndroidToastMessage('Description cannot be empty')
    } else {
      submitRating(selectedRating, description)
    }
  }

  const renderTextInputField = () => {
    return (
      <TextInputComponent
        value={description}
        multiline={true}
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
          text={'How did this buyer feel about you?'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <CustomText
          text={'Please describe it in few words'}
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

  return (
    <View style={styles.ratingContainer}>
      {renderRatingsAvailable()}
      {renderRatingDescriptionComponent()}
    </View>
  )
}