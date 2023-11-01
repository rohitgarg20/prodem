import React, { useCallback, useState } from 'react'

import { map } from 'lodash'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

import { colors, textColor } from '../../common/Colors'
import { CustomText, IconButtonWrapperComponent, IconWrapper } from '../../common/components'
import { BottomModalPopup } from '../../common/components/generic/BottomModalPopup'
import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { CameraComponent } from '../../common/components/screens/camera/CameraComponent'
import { ImagePickerComponent } from '../../common/components/screens/image-picker/ImagePickerComponent'
import { SelectPictureOptionListComponent } from '../../common/components/screens/select-picture/SelectPictureComponent'
import { log } from '../../common/config/log'
import { PICTURE_OPTIONS_KEY, PROFILE_OPTIONS } from '../../common/Constant'
import { bottomModal } from '../../common/GenericStyle'
import { icons } from '../../common/Icons'
import { IImageItem, IProfileOptionItem } from '../../common/Interfaces'
import { navigateSimple } from '../../utils/navigation-utils'
import { scale, verticalScale } from '../../utils/scaling'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  selectPhotoContainer: {
    height: verticalScale(100),
    width: 100,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  selectImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0
    // height: 30,
    // width: 30
  },
  userEmail: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.lightBlack
  },
  userMobile: {
  },
  userMobileContainer: {
    backgroundColor: colors.lightWhite,
    padding: 5,
    borderRadius: 15,
    maxWidth: 100
  },
  headerContainer: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(25)
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10
  },
  profileIcon: {
    borderRadius: 100,
    overflow: 'hidden'
  },
  userDetail: {
    rowGap: 5
  },
  optionRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(15),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.lightestGrey
  },
  profileIconWithNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10
  },
  transformArrow: {
    transform: [{
      rotate: '-90deg'
    }]
  },
  editIconContainer: {
    height: 40,
    width: 40,
    backgroundColor: colors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  editBtnContainer: {
    position: 'absolute',
    right: scale(10),
    top: verticalScale(15)
  }
})

export const AccountScreen = ({ navigation }) => {

  const [showCameraComponent, updateCameraShownStatus ] = useState(false)
  const [showImageGallery, updateImageGalleryStatus ] = useState(false)

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

  const openSelectUserImagePopup = () => {

    genericDrawerController.showGenericDrawerModal({
      closeDrawerOnOutsideTouch: true,
      renderingComponent: () => <BottomModalPopup innerContent={renderSelectOptionsListComponent} />,
      modalPositionStyling: bottomModal
    })
    genericDrawerController.openGenericDrawerModal()
  }


  const renderSelectImageButton = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={icons.PROFILE_CAMERA}
        iconHeight={26}
        iconWidth={26}
        onPressIcon={openSelectUserImagePopup}
        buttonContainerStyle={styles.selectImageButton}
        tintColor={colors.primary}
      />
    )
  }

  const renderSelectUserPhotoButton = () => {
    return (
      <View style={styles.selectPhotoContainer}>
        <IconWrapper
          iconSource={icons.PROFILE_BIGGER_CIRCLE}
          iconHeight={100}
          iconWidth={100}
          style={styles.profileIcon}
        />
        {renderSelectImageButton()}
      </View>
    )
  }

  const renderUserName =  () => {
    return (
      <CustomText
        text='rahul'
        fontSize={14}
        color={textColor.midnightMoss}
      />
    )
  }

  const renderUserEmail =  () => {
    return (
      <CustomText
        text='avinashsaini37@gmail.com'
        fontSize={14}
        color={textColor.midnightMoss}
        textStyle={styles.userEmail}
      />
    )
  }

  const renderUserMobile = () => {
    return (
      <View style={styles.userMobileContainer}>
        <CustomText
          text='1987654367'
          fontSize={14}
          color={textColor.midnightMoss}
          textStyle={styles.userMobile}
        />
      </View>
    )
  }

  const renderUserDetailsContainer = () => {
    return (
      <View style={styles.userDetail}>
        {renderUserName()}
        {renderUserEmail()}
        {renderUserMobile()}
      </View>
    )
  }

  const navigateToEditProfileScreen = () => {

  }

  const renderEditIcon = () => {
    return (
      <View style = {styles.editBtnContainer}>
        <IconButtonWrapperComponent
          iconSource={icons.EDIT_ICON}
          iconHeight={23}
          iconWidth={23}
          buttonContainerStyle={styles.editIconContainer}
          onPressIcon={navigateToEditProfileScreen}
          tintColor={colors.ashGrey}
        />
      </View>
    )
  }

  const renderHeaderContainer = () => {
    return (
      <View style={styles.headerContainer}>
        {renderEditIcon()}
        <View style={styles.rowContainer}>
          {renderSelectUserPhotoButton()}
          {renderUserDetailsContainer()}
        </View>
      </View>
    )
  }


  const renderProfileIconWithNameContainer = (icon, label) => {
    return (
      <View style={styles.profileIconWithNameContainer}>
        <IconWrapper
          iconSource={icon}
          iconHeight={30}
          iconWidth={30}
          tintColor={colors.primary}
        />
        <CustomText
          text={label}
          fontSize={16}
          color={textColor.midnightMoss}
        />
      </View>
    )
  }

  const renderArrowContainer = () => {
    return <IconWrapper
      iconSource={icons.DOWN_ARROW}
      iconHeight={15}
      iconWidth={15}
      style={styles.transformArrow}
      // tintColor={colors.primary}
    />
  }

  const navigateToDedicatedScreen = (screenToNavigate) => {
    navigateSimple({
      screenToNavigate,
      navigator: navigation
    })
  }

  const renderOptionItem = (item: IProfileOptionItem) => {
    const { icon, label, screenToNavigate, key } = item
    return (
      <Pressable key={key}
        style={styles.optionRowContainer}
        onPress={() => navigateToDedicatedScreen(screenToNavigate)}
      >
        {renderProfileIconWithNameContainer(icon, label)}
        {renderArrowContainer()}
      </Pressable>
    )
  }


  const optionsListContainer = () => {
    return (
      <ScrollView>
        {
          map(PROFILE_OPTIONS, renderOptionItem)
        }
      </ScrollView>
    )
  }

  const onCloseCameraComponent = () => {
    updateCameraShownStatus(false)
  }

  const onCloseImageGallery = useCallback(() => {
    updateImageGalleryStatus(false)
  }, [])

  const onSavePicture = ({ images }: { images: IImageItem[] }) => {

    // log('onSavePictureonSavePicture', images)
    // dispatch({
    //   type: onSelectImagesReducer.type,
    //   payload: {
    //     selectedImages: images
    //   }
    // })
  }


  return (
    <View style={styles.mainContainer}>
      {renderHeaderContainer()}
      {optionsListContainer()}
      { showCameraComponent && <CameraComponent
        onSavePicture={onSavePicture}
        onDismiss={onCloseCameraComponent}/> }
      { showImageGallery &&  <ImagePickerComponent
        maxAllowedImages = {1}
        onSavePicture={onSavePicture}
        onDismiss={onCloseImageGallery}/> }
    </View>
  )
}