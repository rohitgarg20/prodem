import React, { useEffect } from 'react'

import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { icons } from '../../../Icons'
import { IProductCardComponent } from '../../../Interfaces'
import { CustomText, IconWrapper } from '../../generic'


const styles = StyleSheet.create({
  cardContainer: {
    height: verticalScale(170),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    columnGap: 5
  },
  iconContainer: {
    borderRadius: 5
  },
  companyNameContainer: {
    paddingLeft: 10
  },
  companyInfo: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  productCount: {
    paddingRight: scale(5)
  },
  productViewsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productDetails: {
    flex: 1
  },
  viewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})


export const ProductItemCardComponent = (props: IProductCardComponent) => {

  const {
    productId, productName, productSubCategory, displayPrice, quantity,
    productImage, productViews, companyLogo, companyName, onPressProductCard
  } = props

  useEffect(() => {
    FastImage.preload([{ uri: productImage }])
  }, [productImage])

  const renderProductImage = () => {
    return (
      <IconWrapper
        iconSource={productImage}
        iconHeight={verticalScale(137)}
        iconWidth={scale(100)}
        style={styles.iconContainer}
        resizeMode='cover'
      />
    )
  }

  const renderProductName = () => {
    return (
      <CustomText
        text={productName}
        fontSize={15}
        color = {textColor.black}
        fontWeight="800"
        numberOfLines={2}
        ellipsizeMode='tail'
      />

    )
  }

  const renderProductPrice = () => {
    return (
      <CustomText
        text={displayPrice}
        fontSize={18}
        color = {colors.lightBlack}
        fontWeight="400"
      />

    )
  }

  const renderCompanyLogo = () => {
    return <IconWrapper
      iconSource={companyLogo}
      iconHeight={20}
      iconWidth={20}
      resizeMode='cover'
    />
  }

  const renderCompanyName = () => {
    return (
      <CustomText
        text={companyName}
        fontSize={12}
        color = {textColor.lightGrey}
        fontWeight="400"
        textStyle={styles.companyNameContainer}
      />
    )
  }

  const renderCompanyInfo = () => {
    return (
      <View style={styles.companyInfo}>
        {renderCompanyLogo()}
        {renderCompanyName()}
      </View>
    )
  }

  const renderProductViewsCount = () => {
    return (
      <CustomText
        text={productViews.toString()}
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
        tintColor={textColor.primary}
      />
    )
  }

  const renderProductViews = () => {
    return (
      <View style={styles.viewsContainer}>
        {renderProductViewsCount()}
        {renderProductViewsIcon()}
      </View>
    )
  }

  const renderProductDetails = () => {
    return (
      <View style={styles.productDetails}>
        {renderProductName()}
        {renderProductPrice()}
        {renderCompanyInfo()}
        {renderProductViews()}
      </View>
    )
  }

  const onPressCard = () => {
    if(onPressProductCard) {
      onPressProductCard(productId)
    }
  }

  return (
    <Pressable style={styles.cardContainer}
      onPress={onPressCard}
    >
      {renderProductImage()}
      {renderProductDetails()}
    </Pressable>
  )

}