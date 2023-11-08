import React from 'react'

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

import { verticalScale } from '../../../utils/scaling'
import { colors, textColor } from '../../Colors'
import { IHeaderComponent } from '../../Interfaces'
import { BackButtonComponent, CustomText, IconButtonWrapperComponent } from '../generic'
import { icons } from '../../Icons'


const styles = StyleSheet.create({
  headerContainer: {
    height: verticalScale(90),
    alignItems: 'center',
    backgroundColor: colors.lightOrange,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  textContainer: {

  },
  refreshBtnContainer: {

  },
  backContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  endContainer: {
    width: 30
  },
  refreshButtonContainer: { padding: 6, backgroundColor: colors.white, borderRadius: 20 }
})


export const HeaderComponent = (props: IHeaderComponent) => {
  const {
    title, showRefreshButton = false, onPressRefreshButton = () => { }, customHeaderStyle = {}, onPress, showBackBtn = false,
    showEndContainer = true
  } = props
  return (
    <SafeAreaView style={[styles.headerContainer, customHeaderStyle]}>
      {showBackBtn ? <BackButtonComponent
        onPressBackBtn={onPress}
        backContainerStyle={styles.backContainerStyle}
      /> : (
        <View />
      )}
      {title ? <CustomText text={title}
        fontSize={24}
        color={textColor.white}
      /> : null}
      {showEndContainer && <View style={styles.endContainer} />}
      {showRefreshButton ? <IconButtonWrapperComponent
        buttonContainerStyle={styles.refreshButtonContainer}
        iconSource={icons.REFRESH_ICON}
        iconHeight={18}
        iconWidth={18}
        onPressIcon={onPressRefreshButton}
        tintColor={colors.lightOrange}
        resizeMode='cover'
      />
        : null}
    </SafeAreaView>
  )
}