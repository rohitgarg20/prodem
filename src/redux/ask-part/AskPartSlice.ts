import { createSlice } from '@reduxjs/toolkit'
import { filter, get, map } from 'lodash'

import { log } from '../../common/config/log'
import {  ASK_OFFER_FORM, InputType, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IAskPartForm, IPartRequestDropDownData } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'


const initialState: IAskPartForm = {
  formData: ASK_OFFER_FORM
}

const onChangeUserInput = (state: IAskPartForm, { payload }) => {
  const { fieldKey, value } = payload
  state.formData[fieldKey].inputValue = value
}

const onFetchedAskPartRequestDropDownList = (state: IAskPartForm, { payload }) => {
  const dropDownData: IPartRequestDropDownData = get(payload, 'responseData.data', {})
  const { partrequest_delivery_city, partrequest_product_type, partrequest_vehicle, partrequest_year } = dropDownData

  state.formData.deliveryCity.dropdownData = partrequest_delivery_city
  state.formData.productType.dropdownData = partrequest_product_type
  state.formData.vehicles.dropdownData = map(partrequest_vehicle, (item) => {
    return {
      id: item?.vehicle_id,
      value: item?.vehicle_name
    }
  })
  state.formData.maufacturingYear.dropdownData = partrequest_year

}

const onSelectDropDowItem = (state: IAskPartForm, { payload }) => {
  const { fieldKey, selectedDropdownItem } = payload
  state.formData[fieldKey].selectedItem = selectedDropdownItem
}

const onSelectImage = (state: IAskPartForm, { payload }) => {
  const { selectedImages } = payload
  const updatedImages = [ ...state.formData.productSlides.selectedImages || [], ...selectedImages]
  state.formData.productSlides.selectedImages = updatedImages
}

const onRemoveImage = (state: IAskPartForm, { payload }) => {
  const { selectedImage } = payload
  const oldImages = state.formData.productSlides.selectedImages || []
  // log('oldImagesoldImages', oldImages, imageIndex)
  state.formData.productSlides.selectedImages = filter(oldImages, (image) => image.base64 !== selectedImage.base64)
}

const onAskPartForm = (state: IAskPartForm) => {
  showAndroidToastMessage('Request is added successfully')
  const askOfferFrom = state.formData
  Object.keys(askOfferFrom).forEach((formKey) => {
    const formKeyData = askOfferFrom?.[formKey]
    const { type } = formKeyData
    if(type === InputType.TEXT_INPUT) {
      askOfferFrom[formKey].inputValue = ''
    }
    if(type === InputType.DROPDOWN) {
      askOfferFrom[formKey].selectedItem = {}
    }

    if(type === InputType.IMAGES_SELECTION) {
      askOfferFrom[formKey].selectedImages = []
    }
  })
  state.formData = askOfferFrom
}

const onAskPartFormError = (state: IAskPartForm, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', SOMETHING_WENT_WRONG))
}

const askPartRequestSlice = createSlice({
  name: ReducerName.ASK_PART,
  initialState,
  reducers: {
    onChangeUserInputReducer: onChangeUserInput,
    onFetchedAskPartRequestDropDownListSuccess: onFetchedAskPartRequestDropDownList,
    onSelectDropDowItemReducer: onSelectDropDowItem,
    onSelectImagesReducer: onSelectImage,
    onRemoveImageReducer: onRemoveImage,
    onAskPartSuccessReducer: onAskPartForm,
    onAskPartFailureReducer: onAskPartFormError
  }
})

export const {
  onChangeUserInputReducer, onFetchedAskPartRequestDropDownListSuccess, onSelectDropDowItemReducer, onSelectImagesReducer,
  onRemoveImageReducer, onAskPartFailureReducer, onAskPartSuccessReducer
} = askPartRequestSlice.actions

export default askPartRequestSlice.reducer
