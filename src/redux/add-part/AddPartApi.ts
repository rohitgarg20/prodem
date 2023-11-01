import { isEmpty } from 'lodash'

import { onFetchedSellDropDownListSuccess, onAddPartSuccessReducer, onAddPartFailureReducer } from './AddPartSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { AddPartFieldKeys, InputType } from '../../common/Constant'
import { IFormField } from '../../common/Interfaces'
import { apiDispatch } from '../../network/DispatchApiCall'
import { showAndroidToastMessage } from '../../common/Toast'


export const getSellingDropDownList = () => {
  apiDispatch({
    endPoint: API_END_POINT.GET_SELL_DROPDOWN_LIST,
    onSuccess: onFetchedSellDropDownListSuccess.type,
    showLoaderOnScreen: true,
    method: 'GET'
    // headers: {
    //   'a'
    // }
  })
}

export const isAddPartFormValid = (formData: Record<AddPartFieldKeys, IFormField>) => {
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

export const addNewPart = (addPartForm: Record<AddPartFieldKeys, IFormField>) => {
  const formData = new FormData()
  const emptyFieldName = isAddPartFormValid(addPartForm)
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
      endPoint: API_END_POINT.CREATE_PRODUCT,
      onSuccess: onAddPartSuccessReducer.type,
      showLoaderOnScreen: true,
      method: 'POST',
      body: formData,
      onFailure: onAddPartFailureReducer.type
    })

  } else {
    showAndroidToastMessage(`${emptyFieldName} cannot be empty`)
  }

  log('formDataformDataformData', formData, addPartForm)
}