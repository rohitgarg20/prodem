import React from 'react'

import { StyleSheet, View } from 'react-native'

import { UpdateQuantityModalComponent } from './UpdateQuantityModalComponent'
import { scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { centerModal } from '../../../GenericStyle'
import { icons } from '../../../Icons'
import { ICartItemComponent } from '../../../Interfaces'
import { CenterModalPopup, CustomText, IconButtonWrapperComponent, IconWrapper, LabelWithArrowComponent } from '../../generic'
import { genericDrawerController } from '../../ModalComponent/GenericModalController'

const styles = StyleSheet.create({
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden'
  },
  cardContainer: {
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 6,
    elevation: 5,
    backgroundColor: colors.white,
    width: '100%'
  },
  itemDetailsContainer: {
    paddingLeft: 20,
    rowGap: 3,
    flex: 1
  },
  qunatityContainer: {
    maxWidth: 100
  },
  removeCartContainer: {
    alignSelf: 'flex-end'
  },
  quantityDataContainer: {
    paddingVertical: 7,
    borderColor: colors.lightBlack,
    borderRadius: 4
  }
})

export const CartCardComponent = (props: ICartItemComponent) => {
  const { productImage, productName, quantity, displayPrice, onRemoveItemFromCart, productId, updateCartQty } = props

  const renderItemImage = () => {
    return(
      <View style={styles.cardImage}>
        <IconWrapper
          iconSource={productImage || icons.DEFAULT_IMAGE}
          iconHeight={'100%'}
          iconWidth={'100%'}
          resizeMode='cover'
        />
      </View>
    )
  }

  const renderProductName = () => {
    return (
      <CustomText
        text={productName}
        fontSize={12}
        color={textColor.cinder}
        numberOfLines={2}
        ellipsizeMode='tail'
      />
    )
  }

  const renderProductPrice = () => {
    const price = `Price: ${displayPrice}`
    return (
      <CustomText
        text={price}
        fontSize={14}
        color={textColor.cinder}
      />
    )
  }

  const renderQtyModalComponent = () => {
    return (
      <UpdateQuantityModalComponent
        updateQuantityOnPress={updateCartQty}
        productId={productId}
      />
    )
  }

  const showImagesSelectPopup = () => {

    genericDrawerController.showGenericDrawerModal({
      closeDrawerOnOutsideTouch: true,
      renderingComponent: () => <CenterModalPopup innerContent={renderQtyModalComponent} />,
      modalPositionStyling: centerModal
    })
    genericDrawerController.openGenericDrawerModal()
  }

  const renderProductQuantity = () => {
    const displayQty = `Qty: ${quantity}`
    return (
      <View style={styles.qunatityContainer}>
        <LabelWithArrowComponent
          defaultValue={displayQty}
          onPress={showImagesSelectPopup}
          dropDownKey='quantity'
          propsTextColor={textColor.black}
          dropDownContainerStyle={styles.quantityDataContainer}
          fontSize={12}
          lineHeight={14}
        />
      </View>
    )
  }

  const renderItemDetails = () => {
    return (
      <View style={styles.itemDetailsContainer}>
        {renderProductName()}
        {renderProductQuantity()}
        {renderProductPrice()}
      </View>
    )
  }

  const removeProductFromCart = () => {
    if(onRemoveItemFromCart) {
      onRemoveItemFromCart(productId)
    }
  }

  const renderRemoveItemFromCartComponent = () => {
    return (
      <View style={styles.removeCartContainer}>
        <IconButtonWrapperComponent
          iconSource={icons.CART_REMOVE_ICON}
          iconHeight={25}
          iconWidth={25}
          onPressIcon={removeProductFromCart}
          tintColor={textColor.primary}
        />
      </View>
    )
  }

  const renderCartCardComponent = () => {
    return (
      <View style={styles.cardContainer}>
        {renderItemImage()}
        {renderItemDetails()}
        {renderRemoveItemFromCartComponent()}
      </View>
    )
  }

  return (
    <>
      {renderCartCardComponent()}
    </>
  )

}