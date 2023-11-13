import { forEach, isEmpty } from 'lodash'

import { onFetchedSellDropDownListSuccess, resetAddPartSuccessReducer, onAddPartFailureReducer, editFormReducer } from './AddPartSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { AddPartFieldKeys, InputType } from '../../common/Constant'
import { IFormField } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { apiDispatch } from '../../network/DispatchApiCall'
import { callPromisesParallel, getBase64FromImageUrl } from '../../utils/app-utils'


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
  log('addNewPartaddNewPart', addPartForm)
  const emptyFieldName = isAddPartFormValid(addPartForm)
  if(!emptyFieldName) {
    Object.keys(addPartForm).forEach((formKey) => {
      const formKeyData = addPartForm?.[formKey]
      const { inputValue, type, selectedItem, selectedImages, apiKey, apiValue } = formKeyData
      if(type === InputType.TEXT_INPUT) {
        if(formKey === AddPartFieldKeys.DESCRIPTION) {
          formData.append(apiKey, apiValue)
        } else {
          formData.append(apiKey, inputValue)
        }
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
      onSuccess: resetAddPartSuccessReducer.type,
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

export const editPart = async (addPartForm: Record<AddPartFieldKeys, IFormField>, productId: number) => {
  const formData = new FormData()
  const emptyFieldName = isAddPartFormValid(addPartForm)
  if(!emptyFieldName) {
    let resolvedImages: any = []
    let imagesToApi: any = []
    forEach(addPartForm.productSlides.selectedImages, (image) => {
      const { imgUrl } = image
      if(imgUrl?.includes('http')) {
        resolvedImages.push(getBase64FromImageUrl(imgUrl))
      } else {
        const base64Img = image?.base64
        const parsedBase64Img = base64Img.split(',')[1]
        imagesToApi.push(parsedBase64Img)
      }
    })
    await callPromisesParallel(resolvedImages).then((resolveImg) => {
      resolveImg.forEach((base64Img) => {
        const parsedBase64Img = base64Img.split(',')[1]
        if(parsedBase64Img.length) {
          imagesToApi.push(parsedBase64Img)
        }
      })
    }).catch(err => {
      log('error is called', err)
    })
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
        imagesToApi.forEach((parsedBase64Img, index) => {
          formData.append(`${apiKey}[${index}]`, parsedBase64Img)
        })
      }
    })

    formData.append('product_id', productId)
    return new Promise((resolve, reject) => {
      const apiResponse = apiDispatch({
        endPoint: `${API_END_POINT.UPDATE_PRODUCT}/${productId}`,
        onSuccess: resetAddPartSuccessReducer.type,
        showLoaderOnScreen: true,
        method: 'POST',
        body: formData,
        onFailure: onAddPartFailureReducer.type
      })
      try {
        resolve(apiResponse)
      } catch(err) {
        reject(err)
      }
    })

  } else {
    showAndroidToastMessage(`${emptyFieldName} cannot be empty`)
    throw new Error(`${emptyFieldName} cannot be empty`)
  }
}
