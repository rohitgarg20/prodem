import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'

import { BackHandler, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolation, interpolate, Easing, withTiming, useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated'

import { genericDrawerController } from './GenericModalController'
import { colors } from '../../Colors'
import { log } from '../../config/log'
import { SCREEN_HEIGHT } from '../../Constant'


const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    left: 0,
    bottom: 0,
    top: 0,
    backgroundColor: colors.drawerBackGroundGray,
    flex: 1,
    position: 'absolute'
  },
  touchableContainer: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  renderContent: {
    zIndex:999999999
  }
})


export const GenericDrawerComponent = forwardRef((props, ref) => {
  const {
    renderingComponent, closeDrawerOnOutsideTouch, modalPositionStyling, closeModalHandler, onCloseModalCallback
  } = genericDrawerController
  let drawerAnimatedValue = useSharedValue(0)
  const [ isDrawerEnabled,  updateDrawerStatus] = useState(false)

  useEffect(() => {

  }, [])

  useEffect(() => {
    genericDrawerController.setModalRef(ref)
  }, [ref])

  const disableDrawer = useCallback(() => {
    updateDrawerStatus(false)
    if(closeModalHandler) {
      closeModalHandler()
    }
    if(onCloseModalCallback) {
      onCloseModalCallback()
    }
  }, [closeModalHandler, onCloseModalCallback])


  const showDrawer = useCallback(() => {
    updateDrawerStatus(true)
  }, [])

  const onBackPressed = useCallback(() => {
    log('onn back pressed is called')
    if (isDrawerEnabled) {
      updateDrawerStatus(false)
      if(onCloseModalCallback) {
        onCloseModalCallback()
      }
      return true
    }
    return false
  }, [isDrawerEnabled, onCloseModalCallback])


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }
  }, [onBackPressed])


  useImperativeHandle(ref, () => {
    return {
      showDrawer,
      disableDrawer,
      closeDrawer: () => {
        updateDrawerStatus(false)
        if(onCloseModalCallback) {
          onCloseModalCallback()
        }
      },
      renderingComponent,
      closeDrawerOnOutsideTouch,
      modalPositionStyling,
      closeModalHandler,
      onCloseModalCallback
    }
  }, [
    disableDrawer, showDrawer, renderingComponent, closeDrawerOnOutsideTouch, modalPositionStyling,
    closeModalHandler, onCloseModalCallback])

  const showDrawerAnimation = useCallback(() => {
    drawerAnimatedValue.value = withTiming(1, {
      duration: 100,
      easing: Easing.out(Easing.exp)
    } )
  }, [drawerAnimatedValue])

  const closeDrawerAnimation = useCallback(() => {
    drawerAnimatedValue.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp)
    }, () => {
      runOnJS(disableDrawer)()
    })
  }, [drawerAnimatedValue, disableDrawer])

  useEffect(() => {

    if (isDrawerEnabled) {
      showDrawerAnimation()
    }
  }, [isDrawerEnabled, showDrawerAnimation])


  const getTransformedObj = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        drawerAnimatedValue.value,
        [0, 1],
        [SCREEN_HEIGHT, 0],
        Extrapolation.CLAMP
      )
    }],
    ...styles.mainContainer
  }), [])

  const onPressDrawer = () => {
    log('renderDrawerComponent onPressDraweronPressDrawer', modalPositionStyling)
    Keyboard.dismiss()
    if (closeDrawerOnOutsideTouch) {
      closeDrawerAnimation()
      // genericDrawerController.closeGenericDrawerModal()
    }
  }


  const renderDrawerComponent = () => {
    log('renderDrawerComponent', modalPositionStyling)
    return (
      <>
        <Animated.View
          style = {[getTransformedObj, modalPositionStyling]}
        >
          <TouchableOpacity style={styles.touchableContainer}
            onPress={onPressDrawer}
            activeOpacity={1}
          />
          <View style={styles.renderContent} >
            {renderingComponent ? renderingComponent() : null }
          </View>
        </Animated.View>
      </>
    )
  }
  return (
    <>
      {isDrawerEnabled ? renderDrawerComponent() : null }
    </>
  )
})


