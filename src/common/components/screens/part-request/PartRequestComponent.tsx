import React from 'react'

import { StyleSheet, View } from 'react-native'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { IPartRequestCardComponent } from '../../../Interfaces'
import { BUTTONS } from '../../../strings'
import { ButtonComponent, CustomText } from '../../generic'

const styles = StyleSheet.create({
  redDot: {
    height: scale(16),
    width: scale(16),
    borderRadius: 20,
    backgroundColor: textColor.red
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: textColor.black
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonsRowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(10)
  }
})

const { IGNORE, LATER, BIDDING } = BUTTONS
export const PartRequestComponent = (props: IPartRequestCardComponent) => {

  const { title, description, uploadedDate, partRequestId } = props

  const renderRedIcon = () => {
    return ( <View  style={styles.redDot} /> )
  }

  const renderTitle = () => {
    return (
      <CustomText
        text={title}
        fontSize={18}
        color={textColor.black}
      />
    )
  }

  const renderDescription = () => {
    return (
      <CustomText
        text={description}
        fontSize={14}
        color={textColor.duckBlue}
      />
    )
  }

  const renderUploadedDate = () => {
    return (
      <CustomText
        text={uploadedDate}
        fontSize={14}
        color={textColor.black}
      />
    )
  }

  const renderIgnoreButtons = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={IGNORE}
        fontSize={14}
        color={textColor.black}
        textStyle={styles.underline}
      />
    )
  }

  const renderLaterButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        textStyle={styles.underline}
        text={LATER}
        fontSize={14}
        color={textColor.black}
      />
    )
  }

  const renderBiddingButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={BIDDING}
        fontSize={14}
        color={textColor.white}
      />
    )
  }

  const renderButtonsComponnent = () => {
    return (
      <View style={styles.rowContainer}>
        {renderBiddingButton()}
        {renderLaterButton()}
        {renderIgnoreButtons()}
      </View>
    )
  }

  const renderRedDotWithTitle = () => {
    return (
      <View style={styles.rowContainer}>
        {renderRedIcon()}
        {renderTitle()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderRedDotWithTitle()}
      {renderDescription()}
      {renderUploadedDate()}
      {renderButtonsComponnent()}
    </View>
  )
}