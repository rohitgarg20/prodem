import { createSlice } from '@reduxjs/toolkit'
import { filter, get } from 'lodash'

import { log } from '../../common/config/log'
import { ADD_PART_FORM, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IAddPartForm, ISellDropDownData } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'


const initialState: IAddPartForm = {
  formData: ADD_PART_FORM
}

const onChangeUserInput = (state: IAddPartForm, { payload }) => {
  const { fieldKey, value } = payload
  state.formData[fieldKey].inputValue = value
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
  state.formData = ADD_PART_FORM
}

const onAddNewPartError = (state: IAddPartForm, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
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
    onAddPartSuccessReducer: onAddNewPart,
    onAddPartFailureReducer: onAddNewPartError
  }
})

export const {
  onChangeUserInputReducer, onFetchedSellDropDownListSuccess, onSelectDropDowItemReducer, onSelectImagesReducer,
  onRemoveImageReducer, onAddPartFailureReducer, onAddPartSuccessReducer
} = addPartSlice.actions

export default addPartSlice.reducer
