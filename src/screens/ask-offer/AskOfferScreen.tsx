import React, { useCallback, useEffect, useState } from 'react'

import { BackHandler, FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

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
import { isIos, PartRequestFieldKeys, PICTURE_OPTIONS_KEY } from '../../common/Constant'
import { ButtonType } from '../../common/Enumerators'
import { bottomModal, centerModal } from '../../common/GenericStyle'
import { icons } from '../../common/Icons'
import { IDropDownItem, IFormField, IImageItem } from '../../common/Interfaces'
import { getRequestPartDropDownData, requestNewPartApi } from '../../redux/ask-part/AskPartApi'
import { getAskPartTotalImagesTakenCountSelector } from '../../redux/ask-part/AskPartSelector'
import { onChangeUserInputReducer, onSelectDropDowItemReducer, onRemoveImageReducer, onSelectImagesReducer } from '../../redux/ask-part/AskPartSlice'
import { RootState } from '../../store/DataStore'
import { addPartStyle as askPartStyle } from '../add-part/styles'


const MAX_IMAGES_ALLOWED = 5

export const AskOfferScreen = () => {

  const askPartForm = useSelector((state: RootState) => state.askPartSliceReducer.formData)
  const isLoading = useSelector((state: RootState) => state.loaderReducer.isLoading) || false
  const totalImagesTakenCount = useSelector(getAskPartTotalImagesTakenCountSelector)
  const [showCameraComponent, updateCameraShownStatus ] = useState(false)
  const [showImageGallery, updateImageGalleryStatus ] = useState(false)

  const dispatch = useDispatch()


  const onBackPressed = useCallback(() => {
    return isLoading
  }, [isLoading])


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed)
    }
  }, [onBackPressed])

  useEffect(() => {
    getRequestPartDropDownData()
  }, [])

  const renderTitleComponent = useCallback((title: string) => {
    return (
      <CustomText
        text={title}
        fontSize={17}
        color={textColor.midnightMoss}
        textStyle={askPartStyle.titleSeperator}
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
        textContainerStyle = {askPartStyle.textInputField}
        style={multiline ? askPartStyle.textInputMultine : askPartStyle.singleLineStyle}
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

  const renderDropdownListComponent = useCallback((dropdownData, fieldKey) => {
    return (
      <DropDownListComponent
        dropdownList={dropdownData}
        onPressDropDownItem={onPressDropDownItem}
        fieldKey={fieldKey}
      />
    )
  }, [onPressDropDownItem])

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
    const { title, dropdownData, defaultValue, selectedItem, key } = fieldData
    return (
      <View>
        {renderTitleComponent(title)}
        <LabelWithArrowComponent
          defaultValue = {defaultValue}
          selectedDropDownItem = {selectedItem}
          onPress={showDropDownMenu}
          dropdownData={dropdownData}
          dropDownKey={key}
        />
      </View>
    )
  }

  const onPressItem = useCallback((optionData) => {
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

  const renderSelectOptionsListComponent = useCallback(() => {
    return (
      <SelectPictureOptionListComponent onPressItem={onPressItem}/>
    )
  }, [onPressItem])

  const showImagesSelectPopup = useCallback(() => {
    dimissKeyboard()
    genericDrawerController.showGenericDrawerModal({
      closeDrawerOnOutsideTouch: true,
      renderingComponent: () => <BottomModalPopup innerContent={renderSelectOptionsListComponent} />,
      modalPositionStyling: bottomModal
    })
    genericDrawerController.openGenericDrawerModal()
  }, [renderSelectOptionsListComponent])

  const removeSelectedImage = useCallback((item: IImageItem) => {
    dispatch({
      type: onRemoveImageReducer.type,
      payload: {
        selectedImage: item
      }
    })
  }, [dispatch])

  const removeIcon = useCallback((item) => () => {
    removeSelectedImage(item)
  }, [removeSelectedImage])

  const renderSelectedImageItem = ({ item }: { item: IImageItem }) => {
    return (
      <View style={askPartStyle.imageItemContainer}>
        <IconWrapper
          iconSource={item.base64}
          iconHeight={'100%'}
          iconWidth={'100%'}
          style={askPartStyle.imageStyle}
          resizeMode='cover'
        />
        <IconButtonWrapperComponent
          iconSource={icons.CROSS_ICON}
          iconHeight={15}
          iconWidth={15}
          buttonContainerStyle={askPartStyle.crossIconContainer}
          onPressIcon={removeIcon(item)}
        />
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
        buttonContainerStyle={askPartStyle.addMoreImages}
        text='+'
        fontSize={30}
        lineHeight={30}
        fontWeight='700'
        color={textColor.darkOrange}
        onPress={showImagesSelectPopup}
        textStyle={askPartStyle.addBtnText}
      />
    )
  }

  const renderImagesSeperatorComponent = () => (<View style={askPartStyle.imagesSeperator} />)

  const renderSelectedPhotosList = (fieldData: IFormField) => {
    const { selectedImages } = fieldData
    return (
      <FlatList
        contentContainerStyle={askPartStyle.selectedImagesListContainer}
        data={selectedImages}
        renderItem={renderSelectedImageItem}
        horizontal
        ListHeaderComponent={renderAddMoreImagesBtn}
        ListHeaderComponentStyle={askPartStyle.addMoreImagesBtn}
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
          buttonContainerStyle={askPartStyle.choosePhotoBtnContainer}
          text={'MultiLanguageString.CHOOSE_PHOTO'}
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
    switch(item as PartRequestFieldKeys) {
      case PartRequestFieldKeys.TITILE:
      case PartRequestFieldKeys.DESCRIPTION:
      case PartRequestFieldKeys.PRODUCT_VARIANT:
      case PartRequestFieldKeys.ENGINE:
      case PartRequestFieldKeys.CHASIS:
      case PartRequestFieldKeys.DELIVERY_LOCATION:
        viewToRender =  renderInputTextContainer(askPartForm[item])
        break

      case PartRequestFieldKeys.VEHICLES:
      case PartRequestFieldKeys.MANUFACTURING_YEAR:
      case PartRequestFieldKeys.VEHICLES:
      case PartRequestFieldKeys.PRODUCT_TYPE:
      case PartRequestFieldKeys.DELIVERY_CITY:
        viewToRender = renderLabelWithArrowComponent(askPartForm[item])
        break
      case PartRequestFieldKeys.IMAGES:
        viewToRender = renderImageSelectionComponent(askPartForm[item])
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
    return ( <View style={askPartStyle.fieldSeperator} /> )
  }

  const postAd = useCallback(() => {
    dimissKeyboard()
    requestNewPartApi(askPartForm)
  }, [askPartForm])

  const renderAddPartButton = () => {
    return (
      <ButtonComponent
        text={'BUTTONS.REQUEST_QUOTE'}
        onPress={postAd}
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      />
    )
  }

  const renderAddPartForm = () => {
    return (
      <FlatList
        contentContainerStyle={askPartStyle.formContainer}
        data={Object.keys(askPartForm)}
        renderItem={renderAddPartDeciderComponent}
        ItemSeparatorComponent={renderItemSeperator}
        removeClippedSubviews={false}
        ListFooterComponent={renderAddPartButton}
        ListFooterComponentStyle={askPartStyle.buttonSeperator}
        keyboardShouldPersistTaps='handled'
        automaticallyAdjustKeyboardInsets={true}
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
    <View style={askPartStyle.mainContainer}>
      <HeaderComponent title={'ASK_PART_SCREEN.headerTitle'}
        showLanguageDropDown
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