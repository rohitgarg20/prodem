
import React, { useCallback, useEffect, useState } from 'react'

import { BackHandler, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { addPartStyle } from './styles'
import { VehiclesMultiSelectDropDown } from './VehiclesMultiSelectDropdown'
import { dimissKeyboard } from '../../common/App-Utils'
import { textColor } from '../../common/Colors'
import { ButtonComponent, CenterModalPopup, CustomText, IconButtonWrapperComponent, IconWrapper, LabelWithArrowComponent, TextInputComponent } from '../../common/components'
import { BottomModalPopup } from '../../common/components/generic/BottomModalPopup'
import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { HeaderComponent } from '../../common/components/screens'
import { CameraComponent } from '../../common/components/screens/camera/CameraComponent'
import { DropDownListComponent } from '../../common/components/screens/dropdown/DropDownListComponent'
import { ImagePickerComponent } from '../../common/components/screens/image-picker/ImagePickerComponent'
import { SelectPictureOptionListComponent } from '../../common/components/screens/select-picture/SelectPictureComponent'
import { log } from '../../common/config/log'
import { AddPartFieldKeys, PICTURE_OPTIONS_KEY, isIos } from '../../common/Constant'
import { ButtonType } from '../../common/Enumerators'
import { bottomModal, centerModal } from '../../common/GenericStyle'
import { icons } from '../../common/Icons'
import { IDropDownItem, IFormField, IImageItem } from '../../common/Interfaces'
import { ADD_PART_SCREEN, BUTTONS } from '../../common/strings'
import { addNewPart, editPart, getSellingDropDownList } from '../../redux/add-part/AddPartApi'
import { getTotalImagesTakenCountSelector } from '../../redux/add-part/AddPartSelector'
import { onChangeUserInputReducer, onMultiSelectDropDowItemReducer, onRemoveImageReducer, onSelectDropDowItemReducer, onSelectImagesReducer, resetAddPartSuccessReducer } from '../../redux/add-part/AddPartSlice'
import { fetchProductDetail } from '../../redux/home/SellerAdsApi'
import { RootState } from '../../store/DataStore'
import { goBack } from '../../utils/navigation-utils'


const { headerTitle, EditPart } = ADD_PART_SCREEN
const MAX_IMAGES_ALLOWED = 5

export const AddPartScreen = ({ navigation, route }) => {

  const addPartForm = useSelector((state: RootState) => state.addPartReducer.formData)
  const isLoading = useSelector((state: RootState) => state.loaderReducer.isLoading) || false
  const totalImagesTakenCount = useSelector(getTotalImagesTakenCountSelector)
  const [showCameraComponent, updateCameraShownStatus ] = useState(false)
  const [showImageGallery, updateImageGalleryStatus ] = useState(false)
  const isEditFlow = route?.params?.isEditFlow || false
  const productId = route?.params?.productId
  const dispatch = useDispatch()

  const onBackPressed = useCallback(() => {
    log('onn back pressed is called')
    return isLoading
  }, [isLoading])


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }
  }, [onBackPressed])

  useEffect(() => {
    getSellingDropDownList()
    return () => {
      dispatch({
        type: resetAddPartSuccessReducer.type
      })
    }
  }, [dispatch])

  const renderTitleComponent = useCallback((title: string) => {
    return (
      <CustomText
        text={title}
        fontSize={17}
        color={textColor.midnightMoss}
        textStyle={addPartStyle.titleSeperator}
      />
    )
  }, [])

  const onChangeUserInput = useCallback((fieldKey: string, value: string) => {
    dispatch({
      type: onChangeUserInputReducer.type, payload: {
        fieldKey,
        value
      }
    })
  }, [dispatch])

  const renderTextInputField = (fieldData: IFormField) => {
    const { inputValue, keyboardType, key, multiline  } = fieldData

    return (
      <TextInputComponent
        value={inputValue}
        keyboardType={keyboardType}
        multiline={multiline}
        textFieldKey={key}
        onChangeUserInput={onChangeUserInput}
        textInputType='roundedCorners'
        textContainerStyle = {addPartStyle.textInputField}
        style={multiline ? addPartStyle.textInputMultine : addPartStyle.singleLineStyle}
      />
    )
  }

  const renderInputTextContainer = (fieldData: IFormField) => {
    const { title  } = fieldData
    return (
      <View>
        {renderTitleComponent(title)}
        {renderTextInputField(fieldData)}
      </View>
    )
  }

  const onPressDropDownItem = useCallback((selectedDropdownItem: IDropDownItem, fieldKey: string) => {
    dispatch({
      type: onSelectDropDowItemReducer.type,
      payload: {
        selectedDropdownItem,
        fieldKey
      }
    })
    genericDrawerController.closeGenericDrawerModal()
  }, [dispatch])

  const submitBtnHandler = useCallback((selectedDropdownItem: IDropDownItem[]) => {
    genericDrawerController.closeGenericDrawerModal()
    dispatch({
      type: onMultiSelectDropDowItemReducer.type,
      payload: {
        selectedDropdownItem,
        fieldKey: AddPartFieldKeys.VEHICLES
      }
    })
  }, [dispatch])

  const renderDropdownListComponent = useCallback((dropdownData, fieldKey) => {
    // if(fieldKey === AddPartFieldKeys.VEHICLES) {
    //   const multiSelectedDropDownItemIds = addPartForm[fieldKey]?.multiSelectedDropDownItem || []
    //   return VehiclesMultiSelectDropDown({
    //     dropdownData,
    //     updateSelectedVehicleData: submitBtnHandler,
    //     initialSelectedData: multiSelectedDropDownItemIds
    //   })
    // } else {
    return (
      <DropDownListComponent
        dropdownList={dropdownData}
        onPressDropDownItem={onPressDropDownItem}
        fieldKey={fieldKey}
      />
    )
    // }
  }, [onPressDropDownItem, submitBtnHandler, addPartForm])

  const renderCenterDropDown = useCallback((dropdownData, fieldKey) => {
    return (
      <CenterModalPopup
        innerContent={() => renderDropdownListComponent(dropdownData, fieldKey)}
      />
    )
  }, [renderDropdownListComponent])

  const renderDropDownComponent = useCallback((dropdownData, fieldKey) => {
    genericDrawerController.showGenericDrawerModal({
      renderingComponent: () => renderCenterDropDown(dropdownData, fieldKey),
      closeDrawerOnOutsideTouch: isIos,
      modalPositionStyling: centerModal
    })
  }, [renderCenterDropDown])


  const showDropDownMenu = useCallback((fieldKey, dropdownData) => {
    dimissKeyboard()
    renderDropDownComponent(dropdownData, fieldKey)
    genericDrawerController.openGenericDrawerModal()
  }, [renderDropDownComponent])


  const renderLabelWithArrowComponent = (fieldData: IFormField) => {
    const { title, dropdownData, defaultValue, selectedItem, key, multiSelectedDropDownItemNames, isListMultiSelect, multiSelectedDropDownItem } = fieldData
    return (
      <View>
        {renderTitleComponent(title)}
        <LabelWithArrowComponent
          defaultValue = {defaultValue}
          selectedDropDownItem = {selectedItem}
          onPress={showDropDownMenu}
          dropdownData={dropdownData}
          dropDownKey={key}
          showMultiSelectList={false}
          multiSelectDropDownItem={multiSelectedDropDownItemNames}
        />
      </View>
    )
  }

  const onPressItem = useCallback((optionData) => {
    log('onPressItem', optionData)
    const { key } = optionData
    switch(key) {
      case PICTURE_OPTIONS_KEY.CAMERA:
        updateCameraShownStatus(true)
        break
      case PICTURE_OPTIONS_KEY.GALLERY:
        updateImageGalleryStatus(true)
        genericDrawerController.closeGenericDrawerModal()
        break
      default:
    }
  }, [])

  const renderSelectOptionsListComponent = () => {
    return (
      <SelectPictureOptionListComponent onPressItem={onPressItem}/>
    )
  }

  const showImagesSelectPopup = () => {
    dimissKeyboard()
    genericDrawerController.showGenericDrawerModal({
      closeDrawerOnOutsideTouch: true,
      renderingComponent: () => <BottomModalPopup innerContent={renderSelectOptionsListComponent} />,
      modalPositionStyling: bottomModal
    })
    genericDrawerController.openGenericDrawerModal()
  }

  const removeSelectedImage = useCallback((item: IImageItem) => {
    dispatch({
      type: onRemoveImageReducer.type,
      payload: {
        selectedImage: item
      }
    })
  }, [dispatch])

  const renderSelectedImageItem = ({ item }: { item: IImageItem }) => {
    return (
      <View style={addPartStyle.imageItemParentContainer}>
        <View style={addPartStyle.imageItemContainer}>
          <IconWrapper
            iconSource={item.base64 || item.imgUrl || ''}
            iconHeight={'100%'}
            iconWidth={'100%'}
            style={addPartStyle.imageStyle}
            resizeMode='cover'
          />
          <IconButtonWrapperComponent
            iconSource={icons.CROSS_ICON}
            iconHeight={15}
            iconWidth={15}
            buttonContainerStyle={addPartStyle.crossIconContainer}
            onPressIcon={() => removeSelectedImage(item)}
            hitSlopTouchable={10}
          />
        </View>
      </View>
    )
  }

  const renderAddMoreImagesBtn = () => {
    if(totalImagesTakenCount === MAX_IMAGES_ALLOWED) {
      return null
    }
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        buttonContainerStyle={addPartStyle.addMoreImages}
        text='+'
        fontSize={30}
        lineHeight={30}
        fontWeight='700'
        textStyle={addPartStyle.addBtnText}
        color={textColor.darkOrange}
        onPress={showImagesSelectPopup}
      />
    )
  }

  const renderImagesSeperatorComponent = () => (<View style={addPartStyle.imagesSeperator} />)

  const renderSelectedPhotosList = (fieldData: IFormField) => {
    const { selectedImages } = fieldData
    return (
      <FlatList
        contentContainerStyle={addPartStyle.selectedImagesListContainer}
        data={selectedImages}
        renderItem={renderSelectedImageItem}
        horizontal
        ListHeaderComponent={renderAddMoreImagesBtn}
        ListHeaderComponentStyle={addPartStyle.addMoreImagesBtn}
        ItemSeparatorComponent={renderImagesSeperatorComponent}
      />
    )
  }

  const renderImageSelectionComponent = (fieldData: IFormField) => {
    const { title, selectedImages } = fieldData

    return (
      <View>
        {renderTitleComponent(title)}
        {!selectedImages?.length ? <ButtonComponent
          buttonType={ButtonType.SIMPLE_BTN}
          buttonContainerStyle={addPartStyle.choosePhotoBtnContainer}
          text='Choose Photo'
          color={textColor.black}
          fontSize={18}
          onPress={showImagesSelectPopup}
        /> : renderSelectedPhotosList(fieldData)
        }
      </View>
    )
  }


  const renderAddPartDeciderComponent = ({ item }) => {
    let viewToRender: any
    switch(item as AddPartFieldKeys) {
      case AddPartFieldKeys.NAME:
      case AddPartFieldKeys.DESCRIPTION:
      case AddPartFieldKeys.PRICE:
      case AddPartFieldKeys.QUANTITY:
        viewToRender =  renderInputTextContainer(addPartForm[item])
        break

      case AddPartFieldKeys.CATEGORY:
      case AddPartFieldKeys.STATUS:
        viewToRender = renderLabelWithArrowComponent(addPartForm[item])
        break
      case AddPartFieldKeys.VEHICLES:
        viewToRender = renderLabelWithArrowComponent(addPartForm[item])
        break
      case AddPartFieldKeys.IMAGES:
        viewToRender = renderImageSelectionComponent(addPartForm[item])
        break
      default: {
        viewToRender = null
      }
    }

    return (
      <>
        {viewToRender}
      </>
    )


  }

  const renderItemSeperator = () => {
    return ( <View style={addPartStyle.fieldSeperator} /> )
  }

  const postAd = useCallback(() => {
    if(isEditFlow) {
      editPart(addPartForm, productId).then(() => {
        fetchProductDetail({ productId })
        goBack(navigation)
      }).catch(() => {
        //
      })
    } else {
      addNewPart(addPartForm)
    }
    dimissKeyboard()
  }, [addPartForm, isEditFlow, productId, navigation])

  const renderAddPartButton = () => {
    return (
      <ButtonComponent
        text={isEditFlow ? BUTTONS.EDIT_YOUR_AD : BUTTONS.POST_YOUR_AD}
        onPress={postAd}
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      />
    )
  }

  const renderAddPartForm = () => {
    return (
      <FlatList
        contentContainerStyle={addPartStyle.formContainer}
        data={Object.keys(addPartForm)}
        renderItem={renderAddPartDeciderComponent}
        ItemSeparatorComponent={renderItemSeperator}
        removeClippedSubviews={false}
        ListFooterComponent={renderAddPartButton}
        ListFooterComponentStyle={addPartStyle.buttonSeperator}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps='handled'
        nestedScrollEnabled
        // keyboardDismissMode='none'
      />
    )
  }

  const onCloseCameraComponent = () => {
    updateCameraShownStatus(false)
  }

  const onCloseImageGallery = useCallback(() => {
    updateImageGalleryStatus(false)
  }, [])

  const onSavePicture = ({ images }: { images: IImageItem[] }) => {
    log('onSavePictureonSavePicture', images)
    dispatch({
      type: onSelectImagesReducer.type,
      payload: {
        selectedImages: images
      }
    })
  }


  return (
    <View style={addPartStyle.mainContainer}>
      <HeaderComponent
        title={ isEditFlow ? EditPart : headerTitle}
        showBackBtn={isEditFlow}
      />
      {renderAddPartForm()}
      { showCameraComponent && <CameraComponent
        onSavePicture={onSavePicture}
        onDismiss={onCloseCameraComponent}/> }
      { showImageGallery &&  <ImagePickerComponent
        maxAllowedImages = {MAX_IMAGES_ALLOWED - totalImagesTakenCount}
        onSavePicture={onSavePicture}
        onDismiss={onCloseImageGallery}/> }
    </View>
  )
}