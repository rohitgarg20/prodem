import { createSlice } from '@reduxjs/toolkit'
import { filter, find, get, isEmpty } from 'lodash'

import { log } from '../../common/config/log'
import { ADD_PART_FORM, AddPartFieldKeys, InputType, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IAddPartForm, ISellDropDownData } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'


const initialState: IAddPartForm = {
  formData: ADD_PART_FORM,
  editProductId: -1
}

const onChangeUserInput = (state: IAddPartForm, { payload }) => {
  const { fieldKey, value } = payload
  log('onChangeUserInput', value)
  let parsedValue = value
  if(fieldKey === AddPartFieldKeys.DESCRIPTION) {
    parsedValue = value.replaceAll('\n', '</br>').replaceAll(' ', '&nbsp')
  }
  state.formData[fieldKey].inputValue = value
  state.formData[fieldKey].apiValue = parsedValue
  // log('onChangeUserInput', state.formData, value.length, value.replaceAll('\n', '</br>').replaceAll(' ', '&nbsp'), )
}

const onFetchedSellDropDownList = (state: IAddPartForm, { payload }) => {
  const dropDownData: ISellDropDownData = get(payload, 'responseData.data', {})
  const { subcategory, models, productType } = dropDownData
  log('onFetchedSellDropDownListonFetchedSellDropDownList', dropDownData)
  state.formData.category.dropdownData = subcategory
  state.formData.vehicles.dropdownData = models
  state.formData.status.dropdownData = productType
  log('onFetchedSellDropDownListonFetchedSellDropDownList', state, payload)
}

const onSelectDropDowItem = (state: IAddPartForm, { payload }) => {
  const { fieldKey, selectedDropdownItem } = payload
  state.formData[fieldKey].selectedItem = selectedDropdownItem
}

const onSelectImage = (state: IAddPartForm, { payload }) => {
  const { selectedImages } = payload
  const updatedImages = [ ...state.formData.productSlides.selectedImages || [], ...selectedImages]
  state.formData.productSlides.selectedImages = updatedImages
}

const onRemoveImage = (state: IAddPartForm, { payload }) => {
  const { selectedImage } = payload
  const oldImages = state.formData.productSlides.selectedImages || []
  // log('oldImagesoldImages', oldImages, imageIndex)
  state.formData.productSlides.selectedImages = filter(oldImages, (image) => image.base64 !== selectedImage.base64)
}

const onAddNewPart = (state: IAddPartForm) => {
  const addPartForm = state.formData
  Object.keys(addPartForm).forEach((formKey) => {
    const formKeyData = addPartForm?.[formKey]
    const { type } = formKeyData
    if(type === InputType.TEXT_INPUT) {
      addPartForm[formKey].inputValue = ''
    }
    if(type === InputType.DROPDOWN) {
      addPartForm[formKey].selectedItem = {}
    }

    if(type === InputType.IMAGES_SELECTION) {
      addPartForm[formKey].selectedImages = []
    }
  })
  state.formData = addPartForm
}

const onAddNewPartError = (state: IAddPartForm, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
}

const onAddNewPartSuccess = (state: IAddPartForm, { payload }) => {
  showAndroidToastMessage('Product is successfully added')
  onAddNewPart(state)
}

const onEditPartSuccess = (state: IAddPartForm, { payload }) => {
  showAndroidToastMessage('Product is successfully updated')
  onAddNewPart(state)
}

const getProductType = (state: IAddPartForm, productStatus: number) => {
  const statusAvailableList = state.formData.status.dropdownData
  if(!isEmpty(statusAvailableList)) {
    return find(statusAvailableList, (item) => item.id === productStatus)
  } else {
    return {
      id: productStatus,
      value: productStatus === 1 ? 'New' : 'Old'
    }
  }
}

const prepoulateAddPartFormData = (state: IAddPartForm, { payload }) => {
  log('payloadpayload', payload)
  const { productId, productName, productDescription, displayPrice, quantity, categoryName,  subcategoryName, subCategoryId, productType, productSlides } = payload
  const addPartForm = state.formData
  Object.keys(addPartForm).forEach((formKey) => {
    switch(formKey) {
      case AddPartFieldKeys.NAME:
        addPartForm.name.inputValue = productName
        break
      case AddPartFieldKeys.DESCRIPTION:
        addPartForm.detail.apiValue = productDescription
        addPartForm.detail.inputValue = productDescription.replaceAll('\r', '').replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('</br>', '\n').replaceAll('&nbsp', ' ')
        break
      case AddPartFieldKeys.CATEGORY:
        addPartForm.category.selectedItem = {
          id: subCategoryId,
          value: `${categoryName} > ${(subcategoryName || '').trim()}`
        }
        break
      case AddPartFieldKeys.IMAGES:
        addPartForm.productSlides.selectedImages = productSlides.map((item) => {
          return {
            imgUrl: item
          }
        })
        break
      case AddPartFieldKeys.STATUS:
        addPartForm.status.selectedItem = getProductType(state, productType)
        break
      case AddPartFieldKeys.VEHICLES:
        addPartForm.vehicles.selectedItem = {

        }
        break
      case AddPartFieldKeys.PRICE:
        addPartForm.price.inputValue = displayPrice
        break
      case AddPartFieldKeys.QUANTITY:
        addPartForm.quantity.inputValue = (quantity || 0).toString()
        break
      default:
        break
    }
  })
  state.formData = addPartForm
  state.editProductId = productId
}

const addPartSlice = createSlice({
  name: ReducerName.ADD_PART,
  initialState,
  reducers: {
    onChangeUserInputReducer: onChangeUserInput,
    onFetchedSellDropDownListSuccess: onFetchedSellDropDownList,
    onSelectDropDowItemReducer: onSelectDropDowItem,
    onSelectImagesReducer: onSelectImage,
    onRemoveImageReducer: onRemoveImage,
    resetAddPartSuccessReducer: onAddNewPart,
    onAddPartFailureReducer: onAddNewPartError,
    editFormReducer: prepoulateAddPartFormData,
    onAddNewPartSuccessReducer: onAddNewPartSuccess,
    onEditPartSuccessReducer: onEditPartSuccess
  }
})

export const {
  onChangeUserInputReducer, onFetchedSellDropDownListSuccess, onSelectDropDowItemReducer, onSelectImagesReducer,
  onRemoveImageReducer, onAddPartFailureReducer, resetAddPartSuccessReducer, editFormReducer, onAddNewPartSuccessReducer,
  onEditPartSuccessReducer
} = addPartSlice.actions

export default addPartSlice.reducer
