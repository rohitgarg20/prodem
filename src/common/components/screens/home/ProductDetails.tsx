import React from 'react'

import { StyleSheet, View } from 'react-native'

import { tString } from '../../../../utils/app-utils'
import { scale, verticalScale } from '../../../../utils/scaling'
import { textColor } from '../../../Colors'
import { SCREEN_WIDTH } from '../../../Constant'
import { icons } from '../../../Icons'
import { CustomText, IconButtonWrapperComponent, IconWrapper } from '../../generic'

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
    columnGap: 15,
    flex: 1,
    width: '100%'
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
  productViews,
  onClickImage
}: {
  productImage: string
  productName: string
  displayPrice: string
  actualPrice: string
  productViews: string
  onClickImage: () => void
}) => {

  const renderProductImage = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={productImage}
        iconHeight={verticalScale(140)}
        iconWidth={scale(120)}
        style={styles.iconContainer}
        resizeMode='cover'
        onPressIcon={onClickImage}
      />
    )
  }

  const renderProductName = () => {
    return (
      <View style={{
        maxWidth: SCREEN_WIDTH * 0.6
      }}>
        <CustomText
          text={productName}
          fontSize={18}
          color = {textColor.black}
        />
      </View>

    )
  }

  const renderProductOfferPrice = () => {
    return (
      <CustomText
        text={displayPrice}
        fontSize={16}
        color = {textColor.red}
        fontWeight="500"
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
        text={`${productViews} ${tString('MultiLanguageString.Views')}`}
        fontSize={16}
        color = {textColor.lightBlack}
        // fontWeight="600"
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