import { createSlice } from '@reduxjs/toolkit'
import { filter, find, get, isEmpty } from 'lodash'
import { ToastAndroid } from 'react-native'

import { log } from '../../common/config/log'
import { ADD_PART_FORM, AddPartFieldKeys, InputType, ReducerName } from '../../common/Constant'
import { IAddPartForm, ISellDropDownData } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { tString } from '../../utils/app-utils'


const initialState: IAddPartForm = {
  formData: ADD_PART_FORM,
  editProductId: -1
}

const onChangeUserInput = (state: IAddPartForm, { payload }) => {
  const { fieldKey, value } = payload
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
  state.formData.category.dropdownData = subcategory
  state.formData.vehicles.dropdownData = models.map((model) => {
    return {
      id: model.id,
      name: (model.name || model.value || '').toString(),
      value: model.value
    }
  })
  state.formData.status.dropdownData = productType
}

const onSelectDropDowItem = (state: IAddPartForm, { payload }) => {
  const { fieldKey, selectedDropdownItem } = payload
  state.formData[fieldKey].selectedItem = selectedDropdownItem
}

const onMultiSelectDropDowItem = (state: IAddPartForm, { payload }) => {
  const { fieldKey, selectedDropdownItem } = payload
  const selectedVehiclesNames: string[] = []
  const vehiclesDropDownData = state.formData.vehicles.dropdownData
  vehiclesDropDownData?.forEach((item) => {
    selectedDropdownItem?.forEach((selectedItem) => {
      if(selectedItem === item?.id) {
        selectedVehiclesNames.push(item?.name || '')
      }
    })
  })

  state.formData[fieldKey].multiSelectedDropDownItem = selectedDropdownItem
  state.formData[fieldKey].multiSelectedDropDownItemNames = selectedVehiclesNames
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
      addPartForm[formKey].multiSelectedDropDownItem = []
      addPartForm[formKey].multiSelectedDropDownItemNames = []
    }

    if(type === InputType.IMAGES_SELECTION) {
      addPartForm[formKey].selectedImages = []
    }
  })
  state.formData = addPartForm
}

const onAddNewPartError = (state: IAddPartForm, { payload }) => {
  const { error } = payload
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)
}

const onAddNewPartSuccess = (state: IAddPartForm, { payload }) => {
  showAndroidToastMessage('MultiLanguageString.PRODUCT_ADDED')
  onAddNewPart(state)
}

const onEditPartSuccess = (state: IAddPartForm, { payload }) => {
  showAndroidToastMessage('MultiLanguageString.PUPDATED')
  onAddNewPart(state)
}

const getProductType = (state: IAddPartForm, productStatus: number) => {
  const statusAvailableList = state.formData.status.dropdownData
  if(!isEmpty(statusAvailableList)) {
    return find(statusAvailableList, (item) => item.id === productStatus)
  } else {
    return {
      id: productStatus,
      value: productStatus === 1 ? tString('MultiLanguageString.NEW') : tString('MultiLanguageString.OLD')
    }
  }
}

const prepoulateAddPartFormData = (state: IAddPartForm, { payload }) => {
  log('payloadpayload', payload)
  const {
    productId, productName, productDescription, displayPrice, quantity, categoryName,  subcategoryName, subCategoryId, productType, productSlides,
    multiSelectedDropDownItemNames = [], multiSelectedDropDownItem = []
  } = payload
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
        addPartForm.vehicles.selectedItem = {}
        addPartForm.vehicles.multiSelectedDropDownItemNames = multiSelectedDropDownItemNames
        addPartForm.vehicles.multiSelectedDropDownItem = multiSelectedDropDownItem
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
    onEditPartSuccessReducer: onEditPartSuccess,
    onMultiSelectDropDowItemReducer: onMultiSelectDropDowItem
  }
})

export const {
  onChangeUserInputReducer, onFetchedSellDropDownListSuccess, onSelectDropDowItemReducer, onSelectImagesReducer,
  onRemoveImageReducer, onAddPartFailureReducer, resetAddPartSuccessReducer, editFormReducer, onAddNewPartSuccessReducer,
  onEditPartSuccessReducer, onMultiSelectDropDowItemReducer
} = addPartSlice.actions

export default addPartSlice.reducer
