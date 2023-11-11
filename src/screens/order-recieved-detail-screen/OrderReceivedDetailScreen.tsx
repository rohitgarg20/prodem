import React, { useCallback, useEffect, useState } from 'react'

import { isEmpty } from 'lodash'
import { ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './styles'
import { colors, textColor } from '../../common/Colors'
import { ButtonComponent, CenterModalPopup, CustomText, IconWrapper, LabelWithArrowComponent, SpacerComponent, SubmitRatingComponent, TextInputComponent } from '../../common/components'
import EmptyScreenComponent from '../../common/components/generic/EmptyScreenComponent'
import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { HeaderComponent } from '../../common/components/screens'
import { DropDownListComponent } from '../../common/components/screens/dropdown/DropDownListComponent'
import { log } from '../../common/config/log'
import { updateOrderStatusOptions } from '../../common/Constant'
import { ButtonType } from '../../common/Enumerators'
import { centerModal } from '../../common/GenericStyle'
import { icons } from '../../common/Icons'
import { IDropDownItem } from '../../common/Interfaces'
import { onSelectDropDowItemReducer, resetFetchedOrderDetailReducer } from '../../redux/order-recieved/OrderReceivedDetailSlice'
import { addRemarks, changeOrderStatus, fetchOrderDetails, submitRating } from '../../redux/order-recieved/OrderRecievedApi'
import { RootState } from '../../store/DataStore'
import { scale, verticalScale } from '../../utils/scaling'

interface IProps {
  navigation?: any
  route?: any
}

export const OrderReceivedDetailScreen = (props: IProps) => {

  const { route } = props
  const dispatch = useDispatch()
  const orderDetails = useSelector((state: RootState) => state.OrderReceivedDetailReducer.orderDetails)
  const isFetching = useSelector((state: RootState) => state.OrderReceivedDetailReducer.isFetching)
  const selectedDropDownItem = useSelector((state: RootState) => state.OrderReceivedDetailReducer.selectedStatusItem)

  useEffect(() => {
    const orderId = route?.params?.orderId
    fetchOrderDetails(orderId)
    return () => {
      dispatch({
        type: resetFetchedOrderDetailReducer.type
      })
    }
  }, [route, dispatch])

  const {
    orderDate, orderNo, orderPrice, itemPrice, quantity, deliveryCost, productName,
    productImage = '', address, buyerEmail, buyerMobile, buyerName, orderId, vendorRemarks
  } = orderDetails || {}
  const [sellerNote, updateSellerNotes] = useState(vendorRemarks)

  useEffect(() => {
    updateSellerNotes(vendorRemarks)
  }, [vendorRemarks])

  const renderQtyWithPrice = () => {
    const dispValue = itemPrice + ' X ' + quantity
    return (
      <View style={styles.rowContainerFlexEnd}>
        <CustomText
          text={dispValue}
          fontSize={16}
          color={textColor.mediumGrey}
        />
      </View>
    )
  }

  const renderOrderNo = () => {
    const displayLabel = `Order no.. ${orderNo}`
    return (
      <CustomText
        text={displayLabel}
        fontSize={17}
        fontWeight="bold"
        color={textColor.black}
        lineHeight={18}
      />
    )
  }

  const renderOrderDate = () => {
    return (
      <View style={styles.orderDateContainer}>
        <CustomText
          text={'Order Date: '}
          fontSize={17}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={22}
        />
        <CustomText
          text={orderDate}
          fontSize={16}
          color={textColor.mediumGrey}
          lineHeight={22}
        />
      </View>
    )
  }

  const renderOrderNoWithDate = () => {
    return (
      <View >
        {renderOrderNo()}
        {renderOrderDate()}
      </View>
    )
  }

  const renderProductName = () => {
    return (
      <CustomText
        text={productName}
        fontSize={14}
        color={textColor.lightBlack}
        // numberOfLines={3}
        // ellipsizeMode='tail'
        textStyle={styles.productName}
      />
    )
  }

  const renderProductImage = () => {
    return (
      <IconWrapper
        iconSource={productImage || icons.DEFAULT_IMAGE}
        iconHeight={verticalScale(70)}
        iconWidth={scale(70)}
        style={styles.iconContainer}
        resizeMode='cover'
      />
    )
  }

  const renderProductNameWithImage = () => {
    return (
      <View style={styles.rowContainer}>
        {renderProductImage()}
        {renderProductName()}
      </View>
    )
  }

  const renderTotalCost = () => {
    return (
      <View style={styles.rowContainerFlexEnd}>
        <CustomText
          text={'Final Amount:'}
          fontSize={15}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <CustomText
          text={orderPrice}
          fontSize={15}
          color={textColor.black}
          lineHeight={18}
          fontWeight="bold"
        />
      </View>
    )
  }

  const renderDeliveryCost = () => {
    return (
      <View style={styles.rowContainerFlexEnd}>
        <CustomText
          text={'* Estimated Delivery cost:'}
          fontSize={15}
          color={textColor.black}
        />
        <CustomText
          text={deliveryCost}
          fontSize={15}
          color={textColor.black}
        />
      </View>
    )
  }

  const renderCarDetails = () => {
    return (
      <View style={styles.topPadding}>
        <CustomText
          text={'The car for which parts were offered'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <SpacerComponent style={styles.titleBoldSeperator} />
        <CustomText
          text={productName}
          fontSize={14}
          color={textColor.mediumGrey}
        />
      </View>
    )
  }

  const renderIconWithLabelComponent = ({ icon, label, tintColor = colors.lightBlack, colorText = textColor.mediumGrey }) => {
    return (
      <View style={styles.iconWithLabelContainer}>
        <IconWrapper
          iconSource={icon}
          iconHeight={16}
          iconWidth={16}
          tintColor={tintColor}
        />
        <CustomText
          text={label}
          fontSize={16}
          color={colorText}
        />
      </View>
    )
  }

  const renderDeliveryAddress = () => {
    return (
      <View>
        <CustomText
          text={'Delivery Address'}
          fontSize={16}
          color={textColor.black}
          fontWeight='bold'
        />
        <CustomText
          text={address}
          fontSize={16}
          color={textColor.mediumGrey}
        />
      </View>
    )
  }

  const renderDeliveryInformation = () => {
    return (
      <View style={styles.topPadding}>
        <CustomText
          text={'Delivery Information'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <SpacerComponent style={styles.titleBoldSeperator} />
        {renderIconWithLabelComponent({ icon: icons.PROFILE_ICON, label: buyerName })}
        {renderIconWithLabelComponent({ icon: icons.CALL_BTN, label: buyerMobile })}
        {renderIconWithLabelComponent({ icon: icons.EMAIL, label: buyerEmail })}
        {renderDeliveryAddress()}
      </View>
    )
  }

  const renderTextInputField = () => {
    return (
      <TextInputComponent
        value={sellerNote}
        multiline={true}
        onChangeText={updateSellerNotes}
        textInputType='roundedCorners'
        // textContainerStyle = {addPartStyle.textInputField}
        style={styles.textInputMultine}
      />
    )
  }

  const addRemarksButton = useCallback(() => {
    addRemarks({
      orderId,
      remark: sellerNote
    })
  }, [sellerNote, orderId])

  const renderSellerNotes = () => {
    return (
      <View style={styles.topPadding}>
        <CustomText
          text={'Seller Notes'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <SpacerComponent style={styles.titleBoldSeperator} />
        <CustomText
          text={'Only you can see these comments for order management'}
          fontSize={14}
          color={textColor.mediumGrey}
        />
        <SpacerComponent style={styles.topPadding} />
        {renderTextInputField()}
        <ButtonComponent
          buttonType={ButtonType.SIMPLE_BTN}
          text={'Save Observation'}
          onPress={addRemarksButton}
          buttonContainerStyle={styles.simpleBtnBorder}
        />
      </View>
    )
  }

  const onPressDropDownItem = useCallback((selectedDropdownItem: IDropDownItem, fieldKey: string) => {
    changeOrderStatus({
      status: selectedDropdownItem.id,
      orderId
    }).then((respData) => {
      log('respDatarespData', respData)
      dispatch({
        type: onSelectDropDowItemReducer.type,
        payload: {
          selectedDropdownItem,
          fieldKey
        }
      })
      genericDrawerController.closeGenericDrawerModal()
    }).catch(err => {
      log('errerrerr', err)
    })
  }, [dispatch, orderId])

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
      closeDrawerOnOutsideTouch: false,
      modalPositionStyling: centerModal
    })
  }, [renderCenterDropDown])


  const showDropDownMenu = useCallback((fieldKey, dropdownData) => {
    renderDropDownComponent(dropdownData, fieldKey)
    genericDrawerController.openGenericDrawerModal()
  }, [renderDropDownComponent])


  const renderLabelWithArrowComponent = () => {
    return (
      <View style={styles.topPadding}>
        <CustomText
          text={'Change order status'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <SpacerComponent style={styles.titleBoldSeperator} />
        <LabelWithArrowComponent
          defaultValue = {'Select'}
          selectedDropDownItem = {selectedDropDownItem}
          onPress={showDropDownMenu}
          dropdownData={updateOrderStatusOptions}
          dropDownKey={'updateStatus'}
        />
      </View>
    )
  }

  const submitRatingApi = (rating, desc) => {
    submitRating({
      ratings: rating,
      orderId,
      desc
    })
  }

  const renderRatingModal = () => {
    return (
      <SubmitRatingComponent
        submitRating={submitRatingApi}
      />
    )
  }

  const showRatingPopup = () => {
    genericDrawerController.showGenericDrawerModal({
      renderingComponent: () => renderRatingModal(),
      closeDrawerOnOutsideTouch: false,
      modalPositionStyling: centerModal
    })
    genericDrawerController.openGenericDrawerModal()
  }

  const renderChoiceContainer = () => {
    return (
      <View style={styles.topPadding}>
        <CustomText
          text={'Choice'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <SpacerComponent style={styles.titleBoldSeperator} />
        <ButtonComponent
          text={'Give a rating'}
          buttonType={ButtonType.ROUNDED_BTN}
          buttonContainerStyle={styles.sendMsgButton}
          onPress={showRatingPopup}
        />
      </View>
    )
  }

  const renderTotalPriceContainer = ()=> {
    return (
      <View style={styles.totalPriceContainer}>
        {renderDeliveryCost()}
        {renderTotalCost()}
      </View>
    )
  }

  const renderContentContainer = () => {
    return (
      <ScrollView style={styles.contentContainer}
        contentContainerStyle={styles.listContentContainer} >
        {renderOrderNoWithDate()}
        {renderProductNameWithImage()}
        {renderQtyWithPrice()}
        <SpacerComponent style={styles.priceSeperator} />
        {renderTotalPriceContainer()}
        {renderCarDetails()}
        {renderDeliveryInformation()}
        {renderSellerNotes()}
        {renderChoiceContainer()}
        {renderLabelWithArrowComponent()}
      </ScrollView>
    )
  }
  log('isEmpty(orderDetails) && !isFetching', isEmpty(orderDetails), !isFetching)

  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={'Order Detail'}
      />
      { !isEmpty(orderDetails) && renderContentContainer()}
      { isEmpty(orderDetails) && !isFetching && ( <EmptyScreenComponent /> ) }
    </View>
  )
}