import React, { memo, useCallback, useState } from 'react'

import { map } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'

import { selectWinningBid, sendMsgByBuyer, sendMsgBySeller } from '../../../../redux/part-request-detail/PartRequestDetailApi'
import { isPartRequestCancelled, isPartRequestResolved } from '../../../../utils/app-utils'
import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { PART_REQUEST_BUTTONS, PART_REQUEST_STR_VALUE, PartTypesButton } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
import { icons } from '../../../Icons'
import { IBidDetail, ICompanyDetail, IPartRequestBasicDetail } from '../../../Interfaces'
import { ButtonComponent, CustomText, IconButtonWrapperComponent, IconWrapper, TextInputComponent } from '../../generic'
import { ImageZoomViewerComponent } from '../../generic/ImageZoomViewerComponent'
import { ImageGalleryComponent } from '../home/ImageGalleryComponent'
import { log } from '../../../config/log'

interface IProps {
  basicDetail: IPartRequestBasicDetail
  onPressWishlistButton?: () => void
  onPressIgnoreButton?: () => void
  scrollToProposeOfferSection?: () => void
  isPartAddedInWishlist: boolean
  isPartAddedInIgnoreList: boolean
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 10
  },
  cardContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 10
  },
  textAlignLeft: {
    alignSelf: 'flex-start'
  },
  rowGapContainer: {
    rowGap: 10
  },
  proposeOfferBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    columnGap: 5
  },
  selectedBtnContainer: {
    padding: 10,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  unselectedBtnContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  normalBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingTop: 15
  },
  btnContainer: {
    rowGap: 15,
    paddingVertical: 15
  },
  resolutionStatus: {
    paddingTop: 20
  }
})

export const companyDetailStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    rowGap: 5
  },
  heading: {
    alignSelf: 'flex-start',
    paddingLeft: 10
  }
})


export const RequestedPartBasicDetailsComponent = memo((props: IProps) => {

  const { basicDetail, onPressWishlistButton, onPressIgnoreButton, scrollToProposeOfferSection,
    isPartAddedInWishlist,  isPartAddedInIgnoreList } = props
  const { heading, addressInfo, description, uploadedDate, partRequestStatus, isPostByLoggedInUser } = basicDetail
  const [selectedImageIndex, updateImageIndex] = useState(0)
  const [ isImageZoomViewerVisible, updateState ] = useState(false)
  const { t } = useTranslation()

  const onChangeImageIndex = (imgIndex) => {
    updateImageIndex(imgIndex)
  }

  const renderHeadingComponent = () => {
    return (
      <CustomText
        text={heading}
        fontSize={19}
        color={textColor.black}
        numberOfLines={2}
        ellipsizeMode='tail'
        textStyle={styles.textAlignLeft}
      />
    )
  }

  const renderAddressComponent = () => {
    const addressStr = `${t('PART_REQUEST_SCREEN.IAM_LOOING')} > ${addressInfo}`
    return (
      <CustomText
        text={addressStr}
        fontSize={14}
        color={textColor.lightBlack}
        numberOfLines={2}
        ellipsizeMode='tail'
        textStyle={styles.textAlignLeft}
      />
    )
  }

  const renderDescriptionComponent = () => {
    return (
      <CustomText
        text={description}
        fontSize={14}
        color={textColor.black}
        numberOfLines={2}
        ellipsizeMode='tail'
        textStyle={styles.textAlignLeft}
      />
    )
  }


  const renderProposeOfferButton = ({
    icon,
    label,
    btnContainerStyle,
    color,
    onPress
    // buttonWidth,
    // color
  }) => {
    return (
      <Pressable style={btnContainerStyle}
        onPress={onPress}
      >
        <IconWrapper
          iconSource={icon}
          iconHeight={14}
          iconWidth={14}
          tintColor={colors.mediumGrey}
        />
        <CustomText
          text={label}
          fontSize={14}
          color={color}
        />
      </Pressable>

    )
  }

  const renderUploadedDate = () => {
    return (
      <View style={styles.dateContainer}>
        <IconWrapper
          iconSource={icons.CALENDAR_ICON}
          iconHeight={14}
          iconWidth={14}
        />
        <CustomText
          text={uploadedDate}
          fontSize={14}
          color={textColor.black}
          numberOfLines={1}
          ellipsizeMode='tail'
        />
      </View>
    )
  }

  const renderPartRequestStatus = () => {
    const status = PART_REQUEST_STR_VALUE[partRequestStatus]
    return (
      <CustomText
        text={`${t('PART_REQUEST_SCREEN.REQUEST_STATUS_IS')} ${t(status)}`}
        fontSize={16}
        color={textColor.black}
        fontWeight='bold'
        textStyle={styles.resolutionStatus}
      />
    )
  }

  const renderButtons = () => {
    if(isPartRequestCancelled(partRequestStatus) || isPartRequestResolved(partRequestStatus)) {
      return renderPartRequestStatus()
    }
    if(isPostByLoggedInUser) return null
    return (
      <View style={styles.btnContainer}>
        {renderProposeOfferButton({
          ...PART_REQUEST_BUTTONS[PartTypesButton.PROPOSE_OFFER],
          btnContainerStyle: styles.proposeOfferBtnContainer,
          onPress: scrollToProposeOfferSection
        })}
        <View style={styles.rowContainer} >
          {renderProposeOfferButton({
            ...PART_REQUEST_BUTTONS[PartTypesButton.OFFER_LATER],
            btnContainerStyle: isPartAddedInWishlist ? styles.selectedBtnContainer : styles.unselectedBtnContainer,
            onPress: onPressWishlistButton
          })}
          {renderProposeOfferButton({
            ...PART_REQUEST_BUTTONS[PartTypesButton.IGNORE_REQUEST],
            btnContainerStyle: isPartAddedInIgnoreList ? styles.selectedBtnContainer : styles.unselectedBtnContainer,
            onPress: onPressIgnoreButton
          })}
        </View>
      </View>
    )
  }

  const showImageZoomViewer = () => {
    updateState(true)
  }

  const renderPartImage = () => {
    const { imageGallery } = basicDetail as IPartRequestBasicDetail
    return (
      <IconButtonWrapperComponent
        iconSource={imageGallery?.[selectedImageIndex]}
        iconHeight={verticalScale(140)}
        iconWidth={scale(250)}
        style={styles.iconContainer}
        resizeMode='cover'
        onPressIcon={showImageZoomViewer}
      />
    )
  }


  const renderProductGallery = () => {
    const { imageGallery } = basicDetail as IPartRequestBasicDetail
    return (
      <ImageGalleryComponent
        imagesList={imageGallery}
        selectedImageIndex={selectedImageIndex}
        onChangeImageIndex={onChangeImageIndex}
      />
    )
  }

  const renderDetails = () => {
    return (
      <View style={styles.rowGapContainer}>
        {renderHeadingComponent()}
        {renderAddressComponent()}
        {renderDescriptionComponent()}
      </View>
    )
  }

  const closeImageZoomViewer = () => {
    updateState(false)
  }

  const openImageZoomViewerComponent = () => {
    const { imageGallery } = basicDetail as IPartRequestBasicDetail

    return (
      <ImageZoomViewerComponent
        imageUrls={imageGallery}
        isVisible={isImageZoomViewerVisible}
        closeImageZoomViewer={closeImageZoomViewer}
      />
    )
  }

  return (
    <View style={styles.cardContainer}>
      {renderPartImage()}
      {renderProductGallery()}
      {renderDetails()}
      {renderButtons()}
      {renderUploadedDate()}
      {openImageZoomViewerComponent()}
    </View>
  )


})


export const CompanyDetailComponent = memo(({ companyDetail }: { companyDetail: ICompanyDetail }) => {

  const { companyLogo, companyName, companyFiscal, companyAddressStreet } = companyDetail

  const renderComanyImage = () => {
    return (
      <IconWrapper
        iconSource={companyLogo}
        iconHeight={verticalScale(130)}
        iconWidth={'60%'}
        resizeMode='contain'
      />
    )
  }

  const renderCompanyName = () => {
    return (
      <CustomText
        text={companyName}
        fontSize={16}
        color={textColor.black}
        numberOfLines={1}
      />
    )
  }

  const renderCompanyAddress = () => {
    return (
      <CustomText
        text={companyAddressStreet}
        fontSize={14}
        color={textColor.black}
        numberOfLines={2}
        ellipsizeMode='tail'
      />
    )
  }

  const renderCompanyFiscalCode = () => {
    return (
      <CustomText
        text={companyFiscal}
        fontSize={14}
        color={textColor.black}
      />
    )
  }

  const renderHeading = () => (
    <CustomText
      text={'PART_REQUEST_SCREEN.COMPANY_DETAILS'}
      fontSize={16}
      color={textColor.black}
      textStyle={companyDetailStyles.heading}
    />
  )

  return (
    <View  style={companyDetailStyles.cardContainer}>
      {renderHeading()}
      {renderComanyImage()}
      {renderCompanyName()}
      {renderCompanyAddress()}
      {renderCompanyFiscalCode()}
    </View>
  )
})


export const biddingStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: verticalScale(20),
    elevation: 10,
    rowGap: 5,
    paddingHorizontal: scale(25)
  },
  heading: {
    alignSelf: 'flex-start',
    paddingLeft: 10
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWithLabelContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  biddingByContainer: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    width: '100%',
    alignItems: 'center',
    rowGap: 5
  },
  description: {
    alignSelf: 'flex-start'
  },
  biddingDetailContainer: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden'
  },
  detailItemContainer: {
    alignSelf: 'center',
    width: '100%',
    overflow: 'hidden'
    // paddingVertical: 5
  },
  title: {
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    width: '100%',
    paddingVertical: 5
  },
  value: {
    textAlign: 'center',
    paddingVertical: 5
  },
  otherDetailContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    columnGap: 10
  },
  selectWinningBidContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: colors.primary,
    marginTop: 5,
    zIndex: 9999
  },
  sendMsgContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    columnGap: 5,
    zIndex: 99
  },
  sendMsgButton: {
    height: 40,
    paddingHorizontal: 10
  },
  sendMsgInputText: {
    flex: 1,
    borderColor: '#dee2e6'
  },
  inputText: {
    height: '100%'
  },
  bidWinAbsContainer: {
    position: 'absolute',
    // height: '100%',
    // width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 5,
    zIndex: -1
  },
  bidWinBorderContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    bottom: 10,
    borderColor: colors.primary,
    borderWidth: 2,
    right: 10,
    zIndex: -1
  },
  trophyContainer: {
    left: 10,
    height: 60,
    width: 60,
    borderBottomEndRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  msgRowContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'flex-start',
    backgroundColor: '#ffffdd',
    padding: 5,
    width: '100%'
  },
  flexStartRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  widthContainer: {
    justifyContent: 'flex-start'
  },
  shareIconStyle: {
    marginTop: 0,
    transform: [{
      rotateX: '180deg'
    }]
  },
  messageSeperator: {
    rowGap: 10,
    paddingVertical: 10,
    width: '100%'
  },
  textMsg: {
    flexWrap: 'wrap'
  }
})

export const BiddingDetailComponent = memo(({ biddingDetail, partRequestStatus, isPostByLoggedInUser }: {
  biddingDetail: IBidDetail
  partRequestStatus: number
  isPostByLoggedInUser: boolean
}) => {

  const { companyName, description, isWinningBid, messages, productType, displayPrice, availability, bidId, partRequestId, bidImagesSlides } = biddingDetail
  const [message, updateMsgText] = useState('')
  const [selectedImageIndex, updateImageIndex] = useState(0)
  const [ isImageZoomViewerVisible, updateState ] = useState(false)


  const renderBiddingDescription = () => {
    return (
      <CustomText
        text={description}
        fontSize={14}
        color={textColor.black}
        fontWeight='bold'
        textStyle={biddingStyles.description}
      />
    )
  }

  const renderIconWithLabelComponent = ({ icon, label, tintColor = colors.lightBlack, colorText = textColor.black }) => {
    return (
      <View style={biddingStyles.iconWithLabelContainer}>
        <IconWrapper
          iconSource={icon}
          iconHeight={15}
          iconWidth={15}
          tintColor={tintColor}
        />
        <CustomText
          text={label}
          fontSize={14}
          color={colorText}
        />
      </View>
    )
  }

  const selectBidAsWinning = useCallback(() => {
    selectWinningBid({
      bidId,
      partRequestId
    })
  }, [bidId, partRequestId])

  const renderSelectAsWinningBid = () => {
    if(isPartRequestResolved(partRequestStatus)) return null
    if(!isPostByLoggedInUser) return null
    return (
      <Pressable style={biddingStyles.selectWinningBidContainer}
        onPress={selectBidAsWinning}
      >
        {renderIconWithLabelComponent({ icon: icons.TROPHY, label: 'PART_REQUEST_SCREEN.SELECT_WINNING', tintColor: colors.primary, colorText: colors.primary })}
      </Pressable>
    )
  }

  const renderBiddingByComponent = () => {
    return (
      <View style={biddingStyles.biddingByContainer} >
        <CustomText
          text={'PART_REQUEST_SCREEN.OFFER_FROM'}
          fontSize={14}
          color={textColor.black}
        />
        <View style={biddingStyles.rowContainer}>
          <IconWrapper
            iconSource={icons.COMPANY_PODEM_LOGO}
            iconHeight={26}
            iconWidth={26}
          />
          <CustomText
            text={companyName}
            fontSize={14}
            color={textColor.black}
          />
        </View>
        {renderSelectAsWinningBid()}
      </View>
    )
  }

  const renderOtherDetailComponent = () => {
    return (
      <View style={biddingStyles.otherDetailContainer}>
        {renderIconWithLabelComponent({ icon: icons.RECYCLE_ICON, label: productType })}
        {renderIconWithLabelComponent({ icon: icons.CIRCLE_CHECKBOX, label: 'PART_REQUEST_SCREEN.COMPANY' })}
        {renderIconWithLabelComponent({ icon: icons.CIRCLE_CHECKBOX, label: 'PART_REQUEST_SCREEN.WARRANTY' })}
        {renderIconWithLabelComponent({icon: icons.PASSWORD_INVISIBLE, label: displayPrice })}
      </View>
    )
  }

  const renderBiddingDetailTextComponent = (biddingDetailTitle, biddingDetailValue) => {
    return (
      <View style={biddingStyles.detailItemContainer}>
        <CustomText
          text={biddingDetailTitle}
          fontSize={13}
          color={textColor.black}
          textStyle={biddingStyles.title}
          fontWeight='600'
        />
        <CustomText
          text={biddingDetailValue}
          fontSize={13}
          color={textColor.black}
          textStyle={biddingStyles.value}
        />
      </View>
    )
  }

  const renderBiddingDetailsComponent = () => {
    return (
      <View style={biddingStyles.biddingDetailContainer}>
        {renderBiddingDetailTextComponent('PART_REQUEST_SCREEN.STARE', availability)}
        {renderBiddingDetailTextComponent('PART_REQUEST_SCREEN.DELIVERY_COST', 'PART_REQUEST_SCREEN.DELIVERY_COST_VALUE')}
        {renderBiddingDetailTextComponent('PART_REQUEST_SCREEN.OFFERED_BY', 'PART_REQUEST_SCREEN.COMPANY')}
        {renderBiddingDetailTextComponent('PART_REQUEST_SCREEN.COMPLIANCE', 'PART_REQUEST_SCREEN.COMPLIANCE_DURATION')}
        {renderBiddingDetailTextComponent('PART_REQUEST_SCREEN.RETURN', 'PART_REQUEST_SCREEN.RETURN_DURATION')}
      </View>
    )
  }


  const renderSendMsgTextInput = () => {
    return (
      <TextInputComponent
        value={message}
        onChangeText={updateMsgText}
        textInputType='roundedCorners'
        textContainerStyle={biddingStyles.sendMsgInputText}
        style={biddingStyles.inputText}
      />
    )
  }

  const sendMessage = useCallback(() => {
    if(isPostByLoggedInUser) {
      sendMsgByBuyer({
        bidId,
        msg: message,
        partRequestId
      })?.then(() => {
        updateMsgText('')
      })
    } else {
      sendMsgBySeller({
        bidId,
        msg: message,
        partRequestId
      })?.then(() => {
        updateMsgText('')
      })
    }
  }, [message, isPostByLoggedInUser, bidId, partRequestId])

  const renderSendMsgWithButton = () => {
    if(isPartRequestCancelled(partRequestStatus) || isPartRequestResolved(partRequestStatus)) {
      return null
    }
    return (
      <View style={biddingStyles.sendMsgContainer}>
        {renderSendMsgTextInput()}
        <ButtonComponent
          text={'BUTTONS.SEND'}
          buttonType={ButtonType.ROUNDED_BTN}
          buttonContainerStyle={biddingStyles.sendMsgButton}
          onPress={sendMessage}
        />
      </View>
    )
  }

  const renderBidWinContainer = () => {
    return (
      <View style={biddingStyles.bidWinAbsContainer}>
        <View
          style={biddingStyles.bidWinBorderContainer}
        />
      </View>
    )
  }

  const renderTrophyBid = () => {
    return (
      <View style={biddingStyles.trophyContainer}>
        <IconWrapper
          iconSource={icons.TROPHY}
          iconHeight={30}
          iconWidth={30}
          tintColor={colors.white}
          resizeMode='cover'
        />
      </View>
    )
  }

  const renderMsgRecievedSent = (msgItem) => {
    const { text, createdAt, userType  } = msgItem
    return (
      <View style={biddingStyles.msgRowContainer}>
        <IconWrapper
          iconSource={icons.SHARE}
          iconHeight={15}
          iconWidth={15}
          resizeMode='cover'
          style={biddingStyles.shareIconStyle}
        />
        <View style={biddingStyles.widthContainer}>
          <CustomText
            text={text}
            fontSize={14}
            color={textColor.black}
            fontWeight='500'
            numberOfLines={3}
            textStyle={biddingStyles.textMsg}
          />
          <View style={biddingStyles.flexStartRowContainer}>
            <CustomText
              text={userType}
              fontSize={12}
              color={textColor.lightGrey}
            />
            <CustomText
              text={createdAt}
              fontSize={12}
              color={textColor.lightGrey}
            />
          </View>
        </View>
      </View>
    )
  }

  const renderMessagesList = () => {
    if(!messages?.length) return null
    return (
      <View style={biddingStyles.messageSeperator}>
        {
          map(messages, renderMsgRecievedSent)
        }
      </View>
    )
  }

  const onChangeImageIndex = useCallback((imageIndex) => {
    updateImageIndex(imageIndex)
  }, [])

  const closeImageZoomViewer = useCallback(() => {
    updateState(false)
  }, [])

  const onClickImage = useCallback(() => {
    updateState(true)
  }, [])


  const openImageZoomViewerComponent = () => {
    return (
      <ImageZoomViewerComponent
        imageUrls={bidImagesSlides}
        isVisible={isImageZoomViewerVisible}
        closeImageZoomViewer={closeImageZoomViewer}
        initialIndex={selectedImageIndex}
      />
    )
  }


  const renderBidGalleryComponent = () => {
    if(!bidImagesSlides.length) return null
    return (
      <ImageGalleryComponent
        imagesList={bidImagesSlides}
        selectedImageIndex={selectedImageIndex}
        onChangeImageIndex={onChangeImageIndex}
        callZoomImageViewerModal={onClickImage}
      />
    )
  }

  return (
    <View>
      <View style={biddingStyles.cardContainer}>
        {renderBiddingByComponent()}
        {renderBiddingDescription()}
        {renderBidGalleryComponent()}
        {renderOtherDetailComponent()}
        {renderBiddingDetailsComponent()}
        {renderMessagesList()}
        {renderSendMsgWithButton()}
        {isWinningBid && renderBidWinContainer()}
        {isWinningBid && renderTrophyBid()}
        {openImageZoomViewerComponent()}
      </View>
    </View>
  )
})


