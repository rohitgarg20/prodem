import { isEmpty } from 'lodash'

import { onFetchedAskPartRequestDropDownListSuccess, onAskPartSuccessReducer, onAskPartFailureReducer } from './AskPartSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { InputType, PartRequestFieldKeys } from '../../common/Constant'
import { IFormField } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { apiDispatch } from '../../network/DispatchApiCall'


export const getRequestPartDropDownData = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_ASK_PART_DROPDOWN_LIST,
    onSuccess: onFetchedAskPartRequestDropDownListSuccess.type,
    showLoaderOnScreen: true,
    method: 'POST'
    // headers: {
    //   'a'
    // }
  })
}

export const isAskPartFormValid = (formData: Record<PartRequestFieldKeys, IFormField>) => {
  let emptyField = ''
  Object.keys(formData).forEach((formKey) => {
    const formKeyData = formData?.[formKey]
    const { inputValue, type, selectedItem, selectedImages } = formKeyData
    if(emptyField.length) {
      return
    }

    if(type === InputType.TEXT_INPUT) {
      if(!inputValue) {
        emptyField = formKey
      }
    }

    if(type === InputType.DROPDOWN) {
      if(isEmpty(selectedItem)) {
        emptyField = formKey
      }
    }

    // if( type === InputType.IMAGES_SELECTION) {
    //   if(isEmpty(selectedImages)) {
    //     emptyField = formKey
    //   }
    // }
  })
  return emptyField
}

export const requestNewPartApi = (addPartForm: Record<PartRequestFieldKeys, IFormField>) => {
  const formData = new FormData()
  const emptyFieldName = isAskPartFormValid(addPartForm)
  if(!emptyFieldName) {
    Object.keys(addPartForm).forEach((formKey) => {
      const formKeyData = addPartForm?.[formKey]
      const { inputValue, type, selectedItem, selectedImages, apiKey } = formKeyData
      if(type === InputType.TEXT_INPUT) {
        formData.append(apiKey, inputValue)
      }
      if(type === InputType.DROPDOWN) {
        formData.append(apiKey, selectedItem.id)
      }

      if(type === InputType.IMAGES_SELECTION) {
        selectedImages.forEach((image, index) => {
          const base64Img = image?.base64
          const parsedBase64Img = base64Img.split(',')[1]
          formData.append(`${apiKey}[${index}]`, parsedBase64Img)
        })
      }
    })

    apiDispatch({
      endPoint: API_END_POINT.ASK_PART_REQUEST,
      onSuccess: onAskPartSuccessReducer.type,
      showLoaderOnScreen: true,
      method: 'POST',
      body: formData,
      onFailure: onAskPartFailureReducer.type
    })

  } else {
    showAndroidToastMessage(`${emptyFieldName} cannot be empty`)
  }

  log('formDataformDataformData', formData, addPartForm)
}