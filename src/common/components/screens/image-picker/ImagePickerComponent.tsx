import { useCallback, useEffect } from 'react'

import { map } from 'lodash'
import { launchImageLibrary } from 'react-native-image-picker'

import { log } from '../../../config/log'
import { ICameraComponent, IImageItem } from '../../../Interfaces'


export const ImagePickerComponent = (props: ICameraComponent) => {
  const { onSavePicture, onDismiss, maxAllowedImages } = props


  const setSelectedImgResponse = useCallback((selectedImgResp) => {
    log('setSelectedImgResponse', selectedImgResp)
    if(selectedImgResp?.didCancel && onDismiss) {

      onDismiss()

    } else {
      const imgRespData = selectedImgResp?.assets
      const imagesList: IImageItem[] = map(imgRespData, (imgData: IImageItem) => {
        const { type, base64  } = imgData
        return {
          type,
          base64: `data:${type};base64,${base64}`
        }
      })
      if(onSavePicture) {
        onDismiss()
        onSavePicture({
          images: imagesList
        })
      }
    }
  }, [onSavePicture, onDismiss])

  useEffect(() => {
    const options: any = {
      selectionLimit: maxAllowedImages,
      mediaType: 'photo',
      includeBase64: true
    }
    launchImageLibrary(options, setSelectedImgResponse)
  }, [setSelectedImgResponse, maxAllowedImages])

  return null
}