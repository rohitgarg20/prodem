import React from 'react'

import { StyleSheet, View } from 'react-native'

import { scale, verticalScale } from '../../../../utils/scaling'
import { textColor } from '../../../Colors'
import { icons } from '../../../Icons'
import { CustomText, IconWrapper } from '../../generic'

const styles = StyleSheet.create({

  iconContainer: {
    borderRadius: 10
  },
  productPrice: {
    textDecorationLine: 'line-through'
  },
  productCount: {
    paddingRight: scale(5)
  },
  cardContainer: {
    flexDirection: 'row',
    columnGap: 15
  },
  productViewsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailContainer: {
    justifyContent: 'space-between',
    rowGap: 10
  },
  otherDetailContainer: {
    rowGap: 5
  }
})


export const ProductDetails = ({
  productImage,
  productName,
  displayPrice,
  actualPrice,
  productViews
}: {
  productImage: string
  productName: string
  displayPrice: string
  actualPrice: string
  productViews: string
}) => {

  const renderProductImage = () => {
    return (
      <IconWrapper
        iconSource={productImage}
        iconHeight={verticalScale(140)}
        iconWidth={scale(120)}
        style={styles.iconContainer}
        resizeMode='cover'
      />
    )
  }

  const renderProductName = () => {
    return (
      <CustomText
        text={productName}
        fontSize={18}
        color = {textColor.black}
        fontWeight="bold"
      />

    )
  }

  const renderProductOfferPrice = () => {
    return (
      <CustomText
        text={displayPrice}
        fontSize={16}
        color = {textColor.stormGrey}
        fontWeight="600"
      />

    )
  }

  const renderProductPrice = () => {
    return (
      <CustomText
        text={actualPrice}
        fontSize={16}
        color = {textColor.black}
        fontWeight="800"
        textStyle={styles.productPrice}
      />

    )
  }

  const renderProductViewsCount = () => {
    return (
      <CustomText
        text={`${productViews} Views`}
        fontSize={16}
        color = {textColor.stormGrey}
        fontWeight="400"
        textStyle={styles.productCount}
      />
    )
  }

  const renderProductViewsIcon = () => {
    return (
      <IconWrapper
        iconSource={icons.STAR_ICON}
        iconHeight={16}
        iconWidth={16}
        resizeMode='cover'
        tintColor={textColor.stormGrey}
      />
    )
  }

  const renderProductViews = () => {
    return (
      <View style={styles.productViewsContainer}>
        {renderProductViewsCount()}
        {/* {renderProductViewsIcon()} */}
      </View>
    )
  }

  const renderProductDetails = () => {
    return (
      <View style={styles.detailContainer}>
        {renderProductName()}
        <View style={styles.otherDetailContainer}>
          {renderProductViews()}
          {renderProductOfferPrice()}
          {renderProductPrice()}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.cardContainer}>
      {renderProductImage()}
      {renderProductDetails()}
    </View>
  )
}