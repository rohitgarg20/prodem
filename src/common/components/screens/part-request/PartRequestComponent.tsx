import React, { memo, useCallback } from 'react'

import { Pressable, StyleSheet, View } from 'react-native'

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
    paddingHorizontal: scale(10),
    rowGap: 2
  },
  btnContainer: {
    paddingHorizontal: 20,
    height: 40
  },
  btnListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  laterBtn: {
    paddingRight: 15
  }
})

const { IGNORE, LATER, BIDDING } = BUTTONS
export const PartRequestComponent = memo((props: IPartRequestCardComponent) => {

  const { title, description, uploadedDate, partRequestId, navigateToDetailScreen, onPressWishlistButton, onPressIgnoreButton } = props

  const renderRedIcon = () => {
    return ( <View  style={styles.redDot} /> )
  }

  const renderTitle = () => {
    return (
      <CustomText
        text={title}
        fontSize={18}
        color={textColor.black}
        numberOfLines={1}
        ellipsizeMode='tail'
      />
    )
  }

  const renderDescription = () => {
    return (
      <CustomText
        text={description}
        fontSize={14}
        color={textColor.duckBlue}
        numberOfLines={1}
        ellipsizeMode='tail'
      />
    )
  }

  const renderUploadedDate = () => {
    return (
      <CustomText
        text={uploadedDate}
        fontSize={14}
        color={textColor.black}
        numberOfLines={1}
        ellipsizeMode='tail'
      />
    )
  }

  const onPressIgnoreBtn = useCallback(() => {
    if(onPressIgnoreButton) {
      onPressIgnoreButton(partRequestId)
    }
  }, [partRequestId, onPressIgnoreButton])


  const renderIgnoreButtons = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={IGNORE}
        fontSize={14}
        color={textColor.black}
        textStyle={styles.underline}
        onPress={onPressIgnoreBtn}
      />
    )
  }


  const onPressWishlistBtn = useCallback(() => {
    if(onPressWishlistButton) {
      onPressWishlistButton(partRequestId)
    }
  }, [onPressWishlistButton, partRequestId])

  const renderLaterButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        textStyle={styles.underline}
        text={LATER}
        fontSize={14}
        color={textColor.black}
        buttonContainerStyle={styles.laterBtn}
        onPress={onPressWishlistBtn}
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
        buttonContainerStyle={styles.btnContainer}
      />
    )
  }

  const renderButtonsComponnent = () => {
    return (
      <View style={styles.btnListRow}>
        {renderBiddingButton()}
        <View style={styles.rowContainer}>
          {renderLaterButton()}
          {renderIgnoreButtons()}
        </View>
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

  const onPress = useCallback(() => {
    if(navigateToDetailScreen) {
      navigateToDetailScreen(partRequestId)
    }
  }, [navigateToDetailScreen, partRequestId])

  return (
    <Pressable style={styles.container}
      onPress={onPress}>
      {renderRedDotWithTitle()}
      {renderDescription()}
      {renderUploadedDate()}
      {renderButtonsComponnent()}
    </Pressable>
  )
})