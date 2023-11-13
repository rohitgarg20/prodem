import { useCallback, useEffect, useRef } from 'react'

import { map } from 'lodash'
import ImageCropPicker from 'react-native-image-crop-picker'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch } from 'react-redux'

import { hideLoader, showLoader } from '../../../../redux/LoaderDataStore/LoaderSlice'
import { log } from '../../../config/log'
import { ICameraComponent, IImageItem } from '../../../Interfaces'


export const ImagePickerComponent = (props: ICameraComponent) => {
  const { onSavePicture, onDismiss, maxAllowedImages } = props
  const isImagePickerLaunched = useRef(false)
  const dispatch = useDispatch()

  const onSaveCropImage = useCallback(async(images) => {
    let imgResult: IImageItem[] = []
    log('onSaveCropImageonSaveCropImageonSaveCropImage')
    for await (const image of images) {
      try {
        const croppedImgResp = await ImageCropPicker.openCropper({
          mediaType: 'photo',
          path: image.uri,
          width: 400,
          height: 400,
          cropping: true,
          multiple: true,
          includeBase64: true,
          showCropFrame: true,
          enableRotationGesture: true,
          freeStyleCropEnabled: true
        })
        log('onSaveCropImageonSaveCropImageonSaveCropImage', croppedImgResp)

        const { data, mime } = croppedImgResp
        imgResult.push({
          base64: `data:${mime};base64,${data}`,
          type: mime
        })
        if(onSavePicture && imgResult.length === images.length) {
          onDismiss()
          onSavePicture({
            images: imgResult
          })
        }
      } catch(err) {
        log('onSaveCropImageonSaveCropImageonSaveCropImage, errerr', err)

        if(onSavePicture) {
          onDismiss()
          onSavePicture({
            images: imgResult
          })
        }
      }

    }

  }, [onSavePicture, onDismiss])


  const setSelectedImgResponse = useCallback((selectedImgResp) => {
    log('setSelectedImgResponse', selectedImgResp)
    if(selectedImgResp?.didCancel && onDismiss) {
      onDismiss()
    } else {
      const imgRespData = selectedImgResp?.assets
      log('onSaveCropImage called before')
      const imagesList: any[] = map(imgRespData, (imgData: IImageItem) => {
        const { type, uri  } = imgData
        return {
          type,
          uri
        }
      })
      log('onSaveCropImage called')
      onSaveCropImage(imagesList)
    }
  }, [onSaveCropImage, onDismiss])

  useEffect(() => {
    const options: any = {
      selectionLimit: maxAllowedImages,
      mediaType: 'photo',
      quality: 0.4
    }
    dispatch({
      type: showLoader.type
    })
    if(!isImagePickerLaunched.current) {
      isImagePickerLaunched.current = true
      launchImageLibrary(options, setSelectedImgResponse).then(() => {
        dispatch({
          type: hideLoader.type
        })
      }).catch((err) => {
        log('errerrerrerrerrerrerrerr called', err)
      })
    }
    return () => {
      dispatch({
        type: hideLoader.type
      })
    }
  }, [setSelectedImgResponse, maxAllowedImages, dispatch])

  return null
}