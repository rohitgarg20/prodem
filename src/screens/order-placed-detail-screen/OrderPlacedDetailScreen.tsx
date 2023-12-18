import React, { useEffect } from 'react'

import { isEmpty } from 'lodash'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { colors, textColor } from '../../common/Colors'
import { CustomText, IconWrapper, SpacerComponent } from '../../common/components'
import { HeaderComponent } from '../../common/components/screens'
import { icons } from '../../common/Icons'
import { fetchOrderPlacedDetail } from '../../redux/order-placed/OrderPlacedApi'
import { resetFetchedOrderDetailReducer } from '../../redux/order-recieved/OrderReceivedDetailSlice'
import { RootState } from '../../store/DataStore'
import { tString } from '../../utils/app-utils'
import { scale, verticalScale } from '../../utils/scaling'

const styles = StyleSheet.create({
  productName: {
    flex: 1
  },
  iconContainer: {
    borderRadius: 5
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center'
  },
  rowContainerFlexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10
  },
  iconWithLabelContainer: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'flex-start',
    paddingBottom: 10
    // justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    paddingHorizontal: 20
    // paddingTop: 20,
    // flex: 1
  },
  listContentContainer: {
    paddingVertical: 20
    // paddingHorizontal: 20,
  },
  titleBoldSeperator: {
    borderTopWidth: 2,
    borderColor: colors.primary,
    marginTop: 15,
    paddingTop: 15
  },
  userDetailPadding: {
    paddingBottom: 15
  },
  deliveryCostInfo: {
    paddingTop: 25
  },
  totalPriceContainer: {
    marginVertical: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.lightBlue
  },
  customerRemarksContainer: {
    paddingBottom: 20,
    paddingTop: 10
  },
  orderBasicDetail: {
    rowGap: 5
  }
})

interface IProps {
  route?: any
}

export const OrderPlacedDetailScreen = (props: IProps) => {
  const { route } = props

  const orderDetails = useSelector((state: RootState) => state.orderPlacedDetailReducer.orderDetails)
  const dispatch = useDispatch()

  const { orderNo, displayStatus, customerName, orderDate, email, phone, address, productName, itemPrice, quantity, orderPrice, deliveryCost,
    customerRemarks, productImage, sellerName, sellerPhone, sellerEmail, buyerName, buyerEmail, buyerMobile } = orderDetails || {}


  useEffect(() => {
    const orderId = route?.params?.orderId
    fetchOrderPlacedDetail(orderId)
    return () => {
      dispatch({
        type: resetFetchedOrderDetailReducer.type
      })
    }
  }, [route, dispatch])

  const renderOrderNo = () => {
    const displayLabel = `${tString('MultiLanguageString.ORDER_NO')} ${orderNo}`
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

  const renderHeadingWithDescriptionComponent = (heading, label) => {
    return (
      <View style={styles.rowContainer}>
        <CustomText
          text={heading + ':'}
          fontSize={14}
          color={textColor.mediumGrey}
        />
        <CustomText
          text={label}
          fontSize={16}
          color={textColor.black}
          fontWeight='500'
        />
      </View>
    )
  }

  const renderOrderBasicDetails = () => {
    return (
      <View style={styles.orderBasicDetail}>
        {renderOrderNo()}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.ORDERT_STATUS', displayStatus)}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.CUSTOMER_NAME', customerName)}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.DATE', orderDate)}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.EMAIL', email)}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.PHONE', phone)}
        {renderHeadingWithDescriptionComponent('ORDER_PLACED_DETAIL_SCREEN.DELIVERY_ADDRESS', address)}
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

  const renderDeliveryCost = () => {
    return (
      <View style={styles.rowContainerFlexEnd}>
        <CustomText
          text={'ORDER_PLACED_DETAIL_SCREEN.ESTIMATED_DELIVERY'}
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

  const renderTotalCost = () => {
    return (
      <View style={styles.rowContainerFlexEnd}>
        <CustomText
          text={'ORDER_PLACED_DETAIL_SCREEN.FINAL_AMOUNT'}
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

  const renderIconWithLabelComponent = ({ icon, label, tintColor = colors.lightBlack, colorText = textColor.mediumGrey }) => {
    return (
      <View style={styles.iconWithLabelContainer}>
        <IconWrapper
          iconSource={icon}
          iconHeight={20}
          iconWidth={20}
          tintColor={tintColor}
        />
        <CustomText
          text={label}
          fontSize={16}
          color={colorText}
          numberOfLines={2}
          lineHeight={20}
        />
      </View>
    )
  }

  const renderSellerDetails = () => {
    return (
      <View >
        <CustomText
          text={'ORDER_PLACED_DETAIL_SCREEN.SELLER_DETAILS'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
          textStyle={styles.userDetailPadding}
        />
        {renderIconWithLabelComponent({ icon: icons.PROFILE_ICON, label: sellerName })}
        {renderIconWithLabelComponent({ icon: icons.CALL_BTN, label: sellerPhone })}
        {renderIconWithLabelComponent({ icon: icons.EMAIL, label: sellerEmail })}
      </View>
    )
  }

  const renderBuyerDetails = () => {
    return (
      <View >
        <CustomText
          text={'ORDER_PLACED_DETAIL_SCREEN.BUYER_DETAILS'}
          fontSize={16}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
          textStyle={styles.userDetailPadding}
        />
        {renderIconWithLabelComponent({ icon: icons.PROFILE_ICON, label: buyerName })}
        {renderIconWithLabelComponent({ icon: icons.CALL_BTN, label: buyerMobile })}
        {renderIconWithLabelComponent({ icon: icons.EMAIL, label: buyerEmail })}
      </View>
    )
  }

  const renderGeneralInfo = () => {
    return (
      <CustomText
        text={'ORDER_PLACED_DETAIL_SCREEN.INFO'}
        fontSize={14}
        color={textColor.lightBlack}
        textStyle={styles.deliveryCostInfo}
      />
    )
  }

  const renderCustomerRemarks = () => {
    return (
      <View style={styles.customerRemarksContainer}>
        <CustomText
          text={'ORDER_PLACED_DETAIL_SCREEN.CUSTOMER_REMARKS'}
          fontSize={14}
          fontWeight="bold"
          color={textColor.black}
          lineHeight={18}
        />
        <CustomText
          text={customerRemarks}
          fontSize={16}
          color={textColor.black}
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
        {renderOrderBasicDetails()}
        <SpacerComponent style={styles.titleBoldSeperator} />
        {renderProductNameWithImage()}
        {renderQtyWithPrice()}
        {renderTotalPriceContainer()}
        {renderCustomerRemarks()}
        <SpacerComponent style={styles.titleBoldSeperator} />
        {renderSellerDetails()}
        <SpacerComponent style={styles.titleBoldSeperator} />
        {renderBuyerDetails()}
        {renderGeneralInfo()}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={'ORDER_PLACED_DETAIL_SCREEN.HEADER_TITLE'}
      />
      { !isEmpty(orderDetails) && renderContentContainer()}
    </View>
  )
}