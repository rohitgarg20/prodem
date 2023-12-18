import React, { memo } from 'react'

import { StyleSheet, View } from 'react-native'

import { tString } from '../../../../utils/app-utils'
import { textColor } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { IOrderReceivedCardComponent } from '../../../Interfaces'
import { ButtonComponent, CustomText } from '../../generic'

interface IProps {
  orderRecievedItemData: IOrderReceivedCardComponent
  navigateToOrderDetail: (orderId: number) => void
}

const styles = StyleSheet.create({
  sendMsgButton: {
    height: 40,
    paddingHorizontal: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainContainer: {
  },
  orderRowContainer: {
    flexDirection: 'row',
    columnGap: 5,
    paddingTop: 10
  }
})

export const OrderRecievedCardComponent = memo((props: IProps) => {
  const { orderRecievedItemData, navigateToOrderDetail } = props
  const {
    orderNo, orderDate, orderId, orderPrice, productName, displayStatus, deliveryCost
  } = orderRecievedItemData


  const renderOrderNumber = () => {
    return (
      <CustomText
        text={orderNo}
        fontSize={15}
        color={textColor.black}
        fontWeight='600'
      />
    )
  }

  const renderProductName = () => {
    return (
      <CustomText
        text={productName}
        fontSize={14}
        color={textColor.lightBlack}
        numberOfLines={3}
        ellipsizeMode='tail'
      />
    )
  }

  const renderTotalPrice = () => {
    const totalPrice = `${orderPrice} + ${deliveryCost} ${tString('MultiLanguageString.DELIVERY_COST')}`
    return (
      <CustomText
        text={totalPrice}
        fontSize={14}
        color={textColor.lightBlack}
      />
    )
  }

  const renderOrderStatus = () => {
    return (
      <View style={styles.orderRowContainer}>
        <CustomText
          text={'MultiLanguageString.STATUS'}
          fontSize={14}
          color={textColor.lightBlack}
        />
        <CustomText
          text={displayStatus}
          fontSize={15}
          color={textColor.black}
          fontWeight='600'
        />
      </View>
    )
  }

  const renderOrderDate = () => {
    return (
      <CustomText
        text={orderDate}
        fontSize={14}
        color={textColor.lightBlack}
      />
    )
  }

  const onPressButton = () => {
    navigateToOrderDetail(orderId)
  }

  const renderOrderDetailButton = () => {
    return (
      <ButtonComponent
        text={'BUTTONS.ORDER_DETAILS'}
        buttonType={ButtonType.ROUNDED_BTN}
        buttonContainerStyle={styles.sendMsgButton}
        onPress={onPressButton}
      />
    )
  }

  const renderRowContainer = () => {
    return (
      <View style={styles.rowContainer}>
        {renderOrderDate()}
        {renderOrderDetailButton()}
      </View>
    )
  }

  const renderTopSection = () => {
    return (
      <View>
        {renderOrderNumber()}
        {renderProductName()}
        {renderTotalPrice()}
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderTopSection()}
      {renderOrderStatus()}
      {renderRowContainer()}
    </View>
  )

})