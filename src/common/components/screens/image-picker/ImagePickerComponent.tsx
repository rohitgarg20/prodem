import { useCallback, useEffect } from 'react'

import { map } from 'lodash'
import ImageCropPicker from 'react-native-image-crop-picker'
import { launchImageLibrary } from 'react-native-image-picker'

import { log } from '../../../config/log'
import { ICameraComponent, IImageItem } from '../../../Interfaces'


export const ImagePickerComponent = (props: ICameraComponent) => {
  const { onSavePicture, onDismiss, maxAllowedImages } = props

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
    if(selectedImgResp?.didCancel && onDismiss) {
      onDismiss()
    } else {
      const imgRespData = selectedImgResp?.assets
      const imagesList: any[] = map(imgRespData, (imgData: IImageItem) => {
        const { type, uri  } = imgData
        return {
          type,
          uri
        }
      })
      log('imagesListimagesList', imagesList[0], selectedImgResp)
      onSaveCropImage(imagesList)
    }
  }, [onSaveCropImage, onDismiss])

  useEffect(() => {
    const options: any = {
      selectionLimit: maxAllowedImages,
      mediaType: 'photo',
      quality: 0.4
    }
    launchImageLibrary(options, setSelectedImgResponse)
  }, [setSelectedImgResponse, maxAllowedImages])

  return null
}