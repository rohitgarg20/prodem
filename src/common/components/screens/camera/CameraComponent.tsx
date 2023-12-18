import React, { useCallback, useEffect, useRef, useState } from 'react'

import { isEmpty } from 'lodash'
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import { Camera, CameraPermissionStatus, CameraPermissionRequestResult,
  useCameraDevice } from 'react-native-vision-camera'

// import { blobToBase64, getBlob } from '../../../../utils/app-utils'
import { useDispatch } from 'react-redux'

import { updateTabBarStateReducer } from '../../../../redux/bottom-tab-bar/BottomTabBarSlice'
import { hideLoader, showLoader } from '../../../../redux/LoaderDataStore/LoaderSlice'
import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
import { ICameraComponent } from '../../../Interfaces'
import { showAndroidToastMessage } from '../../../Toast'
import { ButtonComponent, IconWrapper } from '../../generic'
import { genericDrawerController } from '../../ModalComponent/GenericModalController'

const styles = StyleSheet.create({
  captureBtn: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignSelf: 'center',
    zIndex: 99999
  },
  container: {
    position: 'absolute',
    top: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    left: 0,
    backgroundColor: colors.lightBlack
  },
  cameraContainer: {
    height: SCREEN_HEIGHT,
    width: '100%'
    // backgroundColor: 'red'
  },
  captureBtnContainer: {
    position: 'absolute',
    bottom: 100,
    alignContent: 'center',
    alignSelf: 'center',
    zIndex: 999
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // columnGap: 20,
    position: 'absolute',
    bottom: 50,
    width: '100%',
    left: 0,
    right: 0
  },
  btnContainer: {
    minWidth: 150,
    borderRadius: 15
  }
})


export const CameraComponent = (props: ICameraComponent) => {
  const [ isCameraShown, updateCameraShown ] = useState(false)
  const dispatch = useDispatch()
  const { onSavePicture, onDismiss } = props

  const cameraRef: any = useRef(null)
  const device: any = useCameraDevice('back')
  log('useCameraDevices', device)
  const [photoObj, setPhoto] = useState({
    path: '',
    height: 0,
    width: 0
  })
  const { path } = photoObj

  useEffect(() => {
    Camera.getCameraPermissionStatus().then((permissionStatus: CameraPermissionStatus) => {
      if(permissionStatus === 'granted') {
        updateCameraShown(true)
      } else {
        Camera.requestCameraPermission().then((updatedPermissionStatus: CameraPermissionRequestResult) => {
          if(updatedPermissionStatus === 'granted') {
            updateCameraShown(true)
          } else {
            showAndroidToastMessage('NOT_HAVE_PERMISSION')
          }
        })
      }
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: updateTabBarStateReducer.type,
      payload: {
        isTabBarVisible: false
      }
    })
    return  () => {
      dispatch({
        type: updateTabBarStateReducer.type,
        payload: {
          isTabBarVisible: true
        }
      })
    }
  }, [dispatch])

  const onBackPressed = useCallback(() => {
    log('onn back pressed is called')
    if (isCameraShown) {
      updateCameraShown(false)
      onDismiss()
      return true
    }
    return false
  }, [updateCameraShown, isCameraShown, onDismiss])


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }
  }, [onBackPressed])


  useEffect(() => {
    if(isCameraShown) {
      genericDrawerController.closeGenericDrawerModal()
    }
  }, [isCameraShown])

  const takePhoto = () => {
    cameraRef.current.takePhoto({
      flash: 'off'
    }).then((clickedPhotoObj) => {
      const { path: photoPath, height: photoHt, width: photoWidth } = clickedPhotoObj
      setPhoto({
        path: `file://${photoPath}`,
        height: photoHt,
        width: photoWidth
      })
    })
  }

  // const getBase64Image = (imageUri) => {
  //   return getBlob(imageUri).then((blob) => {
  //     return blobToBase64(blob).then(finalImage => {
  //       return finalImage as string
  //     })
  //   })
  // }

  const renderCapturePhotoBtn = () => {
    return (
      <View style={styles.captureBtnContainer}>
        <TouchableOpacity style={styles.captureBtn}
          onPress={takePhoto} />
      </View>
    )
  }

  const onSaveCropImage = () => {
    dispatch({
      type: showLoader.type
    })
    setTimeout(() => {
      dispatch({
        type: hideLoader.type
      })
    }, 1000)
    ImageCropPicker.openCropper({
      path: photoObj.path,
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      const { data, mime } = image
      if(onSavePicture) {
        onSavePicture({
          images: [{
            base64: `data:${mime};base64,${data}`,
            type: mime
          }]
        })
      }
      if(onDismiss) {
        onDismiss()
      }
    })
    updateCameraShown(false)

  }


  const renderSavePhotoBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={'CAMERA_STRINGS.SAVE_PHOTO'}
        onPress={onSaveCropImage}
        color={textColor.white}
        buttonContainerStyle={styles.btnContainer}
      />
    )
  }

  const onRetryPhoto = () => {
    setPhoto({
      path: '',
      height: 0,
      width: 0
    })
  }

  const renderRetryPhotoBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={'CAMERA_STRINGS.RETRY_PHOTO'}
        onPress={onRetryPhoto}
        color={textColor.white}
        buttonContainerStyle={styles.btnContainer}
      />
    )
  }

  const renderBottomButtonComponent = () => {
    return (
      <View style={styles.rowContainer}>
        {renderRetryPhotoBtn()}
        {renderSavePhotoBtn()}
      </View>
    )
  }

  const renderClickedImage = () => {
    return (
      <View style={styles.container}>
        <IconWrapper
          iconSource={path}
          iconHeight={'100%'}
          iconWidth={'100%'}
          resizeMode='contain'
        />
        {renderBottomButtonComponent()}
      </View>
    )
  }

  const renderCamera = () => {
    return (
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          style={styles.cameraContainer}
        />
        {renderCapturePhotoBtn()}
      </View>
    )
  }


  if(!isCameraShown || isEmpty(device)) return null

  return (
    <>
      {
        path ? renderClickedImage() : renderCamera()
      }
    </>
  )

}
