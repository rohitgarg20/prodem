import React, { useCallback, useState } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { proposeNewOfferApiRequest } from '../../../../redux/part-request-detail/PartRequestDetailApi'
import { onChangeUserInputReducer, onRemoveImageReducer, onSelectDropDowItemReducer, onSelectImagesReducer } from '../../../../redux/part-request-detail/PartRequestDetailSlice'
import { RootState } from '../../../../store/DataStore'
import { verticalScale, scale } from '../../../../utils/scaling'
import { dimissKeyboard } from '../../../App-Utils'
import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { PICTURE_OPTIONS_KEY, ProposeOfferFieldKeys, isIos } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
import { bottomModal, centerModal } from '../../../GenericStyle'
import { icons } from '../../../Icons'
import { IDropDownItem, IFormField, IImageItem } from '../../../Interfaces'
import { BUTTONS, PART_REQUEST_SCREEN } from '../../../strings'
import { ButtonComponent, CenterModalPopup, CustomText, IconButtonWrapperComponent, IconWrapper, LabelWithArrowComponent, TextInputComponent } from '../../generic'
import { BottomModalPopup } from '../../generic/BottomModalPopup'
import { genericDrawerController } from '../../ModalComponent/GenericModalController'
import { CameraComponent } from '../camera/CameraComponent'
import { DropDownListComponent } from '../dropdown/DropDownListComponent'
import { ImagePickerComponent } from '../image-picker/ImagePickerComponent'
import { SelectPictureOptionListComponent } from '../select-picture/SelectPictureComponent'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: verticalScale(10),
    elevation: 10,
    rowGap: 5,
    paddingHorizontal: scale(15)
  },
  formContainer: {

  },
  textInputField: {
    paddingVertical: scale(8)
  },
  titleSeperator: {
    paddingBottom: scale(5)
  },
  fieldSeperator: {
    paddingBottom: scale(10)
  },
  buttonSeperator: {
    paddingTop: 30
  },
  formTitle: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  choosePhotoBtnContainer: {
    borderRadius: 6,
    borderColor: colors.ashGrey,
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: 200,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  imageItemParentContainer: {
    width: 100,
    height: 100
  },
  imageItemContainer: {
    width: 95,
    height: 100,
    borderRadius: 10,
    borderColor: colors.ashGrey,
    // overflow: 'hidden',
    borderWidth: 1,
    zIndex: 999
  },
  crossIconContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.white,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    zIndex: 999999
  },
  imageStyle: {
    borderRadius: 10
  },
  addMoreImages: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: colors.white,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  addMoreImagesBtn: {
    justifyContent: 'center',
    marginRight: 20
  },
  selectedImagesListContainer: {
    paddingTop: 10,
    paddingBottom: 10
  },
  imagesSeperator: {
    paddingRight: 20
  },
  addBtnText: {
    marginTop: isIos ? 7 : 5
  }
})

const MAX_IMAGES_ALLOWED = 5

export const ProposeOfferFormComponent = () => {

  const dispatch = useDispatch()
  const proposeForm = useSelector((state: RootState) => state.partRequestDetailReducer.formData)
  const activePartRequestId = useSelector((state: RootState) => state.partRequestDetailReducer.activePartRequestId)
  const [showCameraComponent, updateCameraShownStatus ] = useState(false)
  const [showImageGallery, updateImageGalleryStatus ] = useState(false)
  const totalImagesTakenCount = proposeForm.productSlides.selectedImages?.length || 0


  const renderTitleComponent = useCallback((title: string) => {
    return (
      <CustomText
        text={title}
        fontSize={17}
        color={textColor.midnightMoss}
        textStyle={styles.titleSeperator}
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
        textContainerStyle = {styles.textInputField}
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
      <View style={styles.imageItemParentContainer}>
        <View style={styles.imageItemContainer}>
          <IconWrapper
            iconSource={item.base64 || item.imgUrl || ''}
            iconHeight={'100%'}
            iconWidth={'100%'}
            style={styles.imageStyle}
            resizeMode='cover'
          />
          <IconButtonWrapperComponent
            iconSource={icons.CROSS_ICON}
            iconHeight={15}
            iconWidth={15}
            buttonContainerStyle={styles.crossIconContainer}
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
        buttonContainerStyle={styles.addMoreImages}
        text='+'
        fontSize={30}
        lineHeight={30}
        fontWeight='700'
        color={textColor.darkOrange}
        textStyle={styles.addBtnText}
        onPress={showImagesSelectPopup}
      />
    )
  }

  const renderImagesSeperatorComponent = () => (<View style={styles.imagesSeperator} />)

  const renderSelectedPhotosList = (fieldData: IFormField) => {
    const { selectedImages } = fieldData
    return (
      <FlatList
        contentContainerStyle={styles.selectedImagesListContainer}
        data={selectedImages}
        renderItem={renderSelectedImageItem}
        horizontal
        ListHeaderComponent={renderAddMoreImagesBtn}
        ListHeaderComponentStyle={styles.addMoreImagesBtn}
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
          buttonContainerStyle={styles.choosePhotoBtnContainer}
          text='Choose Photo'
          color={textColor.black}
          fontSize={18}
          onPress={showImagesSelectPopup}
        /> : renderSelectedPhotosList(fieldData)
        }
      </View>
    )
  }

  const renderPropseFormDeciderComponent = ({ item }) => {
    let viewToRender: any
    switch(item as ProposeOfferFieldKeys) {
      case ProposeOfferFieldKeys.TITILE:
      case ProposeOfferFieldKeys.PRICE:
      case ProposeOfferFieldKeys.PRIVATE_REMARKS:
        viewToRender =  renderInputTextContainer(proposeForm[item])
        break

      case ProposeOfferFieldKeys.UNIT:
      case ProposeOfferFieldKeys.CURRENCY:
      case ProposeOfferFieldKeys.OFFERED_BY:
      case ProposeOfferFieldKeys.AVAILABILITY:
        viewToRender = renderLabelWithArrowComponent(proposeForm[item])
        break
      case ProposeOfferFieldKeys.IMAGES:
        viewToRender = renderImageSelectionComponent(proposeForm[item])
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
    return ( <View style={styles.fieldSeperator} /> )
  }


  const proposeOfferBtn = useCallback(() => {
    if(activePartRequestId) {
      proposeNewOfferApiRequest(proposeForm, activePartRequestId)
    }
  }, [proposeForm, activePartRequestId])

  const renderAddOfferButton = () => {
    return (
      <ButtonComponent
        text={BUTTONS.ADD_OFFER}
        onPress={proposeOfferBtn}
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      />
    )
  }

  const renderProposeOfferForm = () => {
    return (
      <FlatList
        data={Object.keys(proposeForm)}
        renderItem={renderPropseFormDeciderComponent}
        ItemSeparatorComponent={renderItemSeperator}
        removeClippedSubviews={false}
        ListFooterComponent={renderAddOfferButton}
        ListFooterComponentStyle={styles.buttonSeperator}
        keyboardShouldPersistTaps='handled'
        automaticallyAdjustKeyboardInsets={true}
      />
    )
  }

  const renderTitle = () => {
    return (
      <CustomText
        text={PART_REQUEST_SCREEN.PROPOSE_OFFER_FORM}
        fontSize={16}
        color={textColor.black}
        textStyle={styles.formTitle}
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
    <View style={styles.cardContainer}>
      {renderTitle()}
      {renderProposeOfferForm()}
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