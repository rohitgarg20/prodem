import { useCallback, useEffect, useRef } from 'react'

import { map } from 'lodash'
import ImageCropPicker, { Image } from 'react-native-image-crop-picker'
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
    // if(selectedImgResp?.didCancel && onDismiss) {
    //   onDismiss()
    // } else {
    const imagesList: any[] = map(selectedImgResp, (imgData: Image) => {
      const { mime, path  } = imgData
      return {
        type: mime,
        uri: path
      }
    })
    log('onSaveCropImage called')
    onSaveCropImage(imagesList)
    // }
  }, [onSaveCropImage])

  useEffect(() => {
    const options: any = {
      maxFiles: maxAllowedImages,
      mediaType: 'photo',
      compressImageQuality: 0.4,
      multiple: true
    }
    dispatch({
      type: showLoader.type
    })
    if(!isImagePickerLaunched.current) {
      isImagePickerLaunched.current = true
      ImageCropPicker.openPicker(options).then((imgResp) => {
        setSelectedImgResponse(imgResp)
      }).catch((err) => {
        if(err?.code === 'E_PICKER_CANCELLED' && onDismiss) {
          onDismiss()
        }
        dispatch({
          type: hideLoader.type
        })
      })
    }
    return () => {
      dispatch({
        type: hideLoader.type
      })
    }
  }, [setSelectedImgResponse, maxAllowedImages, dispatch, onDismiss])

  return null
}