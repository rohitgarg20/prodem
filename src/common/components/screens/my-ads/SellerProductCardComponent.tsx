import React, { memo, useCallback, useEffect } from 'react'

import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { icons } from '../../../Icons'
import { IProductCardComponent } from '../../../Interfaces'
import { CustomText, IconButtonWrapperComponent, IconWrapper } from '../../generic'


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
    flex: 1,
    rowGap: 5
  },
  viewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  btnContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 5
  },
  rowContainerSB: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

interface IProps {
  sellerProductData: IProductCardComponent
  onEditBtnPress: (productData: IProductCardComponent) => void
  onDeleteBtnPress: (productId: number) => void
  onPressProductCard: (productId: number) => void
}

export const SellerProductItemCardComponent = memo((props: IProps) => {

  const { sellerProductData, onEditBtnPress, onDeleteBtnPress, onPressProductCard } = props

  const {
    productId, productName, displayPrice, quantity,
    productImage, productViews
  } = sellerProductData

  useEffect(() => {
    // log('productImageproductImage', productImage)
    if(productImage && productImage.includes('http')) {
      FastImage.preload([{ uri: productImage }])
    }
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
        color = {textColor.primary}
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
      <CustomText
        text={'Views: '}
        fontSize={16}
        color = {textColor.stormGrey}
        fontWeight="400"
        textStyle={styles.productCount}
      />
    )
  }

  const onEditBtn = useCallback(() => {
    if(onEditBtnPress) {
      onEditBtnPress(sellerProductData)
    }
  }, [onEditBtnPress, sellerProductData])

  const onDeleteProduct = useCallback(() => {
    if(onDeleteBtnPress) {
      onDeleteBtnPress(productId)
    }
  }, [onDeleteBtnPress, productId])


  const renderEditBtn = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={icons.EDIT_ICON}
        iconHeight={13}
        iconWidth={13}
        buttonContainerStyle={styles.btnContainer}
        tintColor={colors.primary}
        onPressIcon={onEditBtn}
      />
    )
  }

  const renderDeleteBtn = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={icons.DELETE_ICON}
        iconHeight={13}
        iconWidth={13}
        buttonContainerStyle={styles.btnContainer}
        tintColor={colors.primary}
        onPressIcon={onDeleteProduct}
      />
    )
  }

  const renderProductViews = () => {
    return (
      <View style={styles.rowContainerSB}>
        <View style={styles.viewsContainer}>
          {renderProductViewsIcon()}
          {renderProductViewsCount()}
        </View>
        {renderEditBtn()}
      </View>
    )
  }

  const renderProductQtyCount = () => {
    return (
      <CustomText
        text={quantity.toString()}
        fontSize={16}
        color = {textColor.stormGrey}
        fontWeight="400"
        textStyle={styles.productCount}
      />
    )
  }

  const renderProductQtyLabel = () => {
    return (
      <CustomText
        text={'Quantity: '}
        fontSize={16}
        color = {textColor.stormGrey}
        fontWeight="400"
        textStyle={styles.productCount}
      />
    )
  }

  const renderProductQty = () => {
    return (
      <View style={styles.rowContainerSB}>
        <View style={styles.viewsContainer}>
          {renderProductQtyLabel()}
          {renderProductQtyCount()}
        </View>
        {renderDeleteBtn()}
      </View>
    )
  }

  const renderProductDetails = () => {
    return (
      <View style={styles.productDetails}>
        {renderProductName()}
        {renderProductPrice()}
        {renderProductViews()}
        {renderProductQty()}
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

})