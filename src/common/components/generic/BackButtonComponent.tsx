import React from 'react'

import { Pressable, StyleSheet } from 'react-native'

import { CustomText, IconButtonWrapperComponent } from '.'
import { goBack } from '../../../utils/navigation-utils'
import { colors, textColor } from '../../Colors'
import { icons } from '../../Icons'
import { IBackButtonComponent } from '../../Interfaces'


const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '700',
    paddingLeft: 18
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  backBtn: {
    tintColor: colors.white
  }
})

export const BackButtonComponent = (props: IBackButtonComponent) => {

  const { onPressBackBtn, headerLabel, backContainerStyle } = props

  const onPressBtn = () => {
    if(onPressBackBtn) {
      onPressBackBtn()
    } else {
      goBack(undefined)
    }
  }


  const renderBackIcon = () => (
    <IconButtonWrapperComponent
      iconSource={icons.BACK_BUTTON}
      iconHeight={30}
      iconWidth={30}
      onPressIcon={onPressBtn}
      tintColor={colors.white}
      resizeMode='cover'
    />
  )

  const renderHeaderLabel = () => (
    <CustomText
      text={headerLabel}
      fontSize={25}
      textStyle={styles.textStyle}
      color={textColor.white}
    />
  )

  return (
    <Pressable style={[styles.backContainer, backContainerStyle]}
      onPress={onPressBtn}
    >
      {renderBackIcon()}
      {headerLabel && renderHeaderLabel()}
    </Pressable>
  )
}