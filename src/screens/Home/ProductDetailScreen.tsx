import React, { useEffect, useRef, useState } from 'react'

import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { get, isEmpty } from 'lodash'
import { Linking, ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { productDetailStyles as styles } from './styles'
import { colors } from '../../common/Colors'
import { ButtonComponent, IconButtonWrapperComponent } from '../../common/components'
import { OptionIconWithLabelComponent } from '../../common/components/generic/OptionsIconWithLabelComponent'
import { HeaderComponent } from '../../common/components/screens'
import { ImageGalleryComponent } from '../../common/components/screens/home/ImageGalleryComponent'
import { ProductDescriptionComponent } from '../../common/components/screens/home/ProductDescriptionComponent'
import { ProductDetails } from '../../common/components/screens/home/ProductDetails'
import { ProductOtherDetailsComponent } from '../../common/components/screens/home/ProductOtherDetailsComponent'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { icons } from '../../common/Icons'
import { IProductDetailScreen } from '../../common/Interfaces'
import { PRODUCT_DETAIL_SCREEN } from '../../common/strings'
import { addProductToCart, removeProductFromCart } from '../../redux/cart/CartApi'
import { fetchProductDetail } from '../../redux/home/HomeApi'
import { resetProductDetailReducer } from '../../redux/home/ProductDetailSlice'
import { addProductWishlist, removeProductFromWishlist } from '../../redux/wishlist/WishlistApi'
import { RootState } from '../../store/DataStore'
import { goBack } from '../../utils/navigation-utils'

interface IPDScreen {
  navigation?: any
}

const { HEADER_TITLE, ADD_TO_CART, REMOVE_FROM_CART } = PRODUCT_DETAIL_SCREEN

export const ProductDetailScreen = (props: IPDScreen) => {

  const { navigation } = props
  const dispatch = useDispatch()
  const routeParams = useRoute()
  const productDetailReducer = useSelector((state: RootState) => state.productDetailReducer)
  const [selectedImageIndex, updateImageIndex] = useState(0)
  const { productDetail, isProductInCart, isProductInWishlist } = productDetailReducer
  const productId = get(routeParams, 'params.productId', 0)
  let sourceRef = useRef(axios.CancelToken.source()).current

  useEffect(() => {
    let source = axios.CancelToken.source()
    fetchProductDetail({
      productId,
      cancelToken: sourceRef
    })

    return () => {
      dispatch({
        type: resetProductDetailReducer.type
      })
      source.cancel('component unmounted')
    }

  }, [dispatch, productId, sourceRef])


  const onPressBackButton = () => {
    goBack(navigation)
  }

  const renderProductDetailContainer = () => {
    const { productImage, productName, displayPrice, actualPrice, productViews, imageGallery } = productDetail as IProductDetailScreen
    return (
      <ProductDetails
        productImage={imageGallery?.[selectedImageIndex] || productImage}
        productName={productName}
        displayPrice={displayPrice}
        actualPrice={actualPrice}
        productViews={productViews}
      />
    )
  }

  const onChangeImageIndex = (imgIndex) => {
    updateImageIndex(imgIndex)
  }

  const renderProductGallery = () => {
    const { imageGallery } = productDetail as IProductDetailScreen
    log('imageGalleryimageGalleryimageGallery', imageGallery)
    return (
      <ImageGalleryComponent
        imagesList={imageGallery}
        selectedImageIndex={selectedImageIndex}
        onChangeImageIndex={onChangeImageIndex}
      />
    )
  }

  const renderOtherDetailsComponent = () => {
    const { color, type, brand, createdAt  } = productDetail as IProductDetailScreen

    return (
      <ProductOtherDetailsComponent
        date={createdAt}
        color={color}
        type={type}
        brand={brand}
      />
    )
  }

  const openPhoneDialer = () => {
    const { userMobile  } = productDetail as IProductDetailScreen
    Linking.openURL(`tel:${userMobile}`)

  }

  const renderCallButton = () => {
    const { userMobile  } = productDetail as IProductDetailScreen

    if(!userMobile) return null

    return (
      <OptionIconWithLabelComponent
        icon={icons.CALL_BTN}
        label={userMobile}
        itemKey={'call'}
        onPressItem={openPhoneDialer}
        containerStyle={styles.callBtnContainer}
        tintColor={colors.white}
        textStyleContainer={styles.textStyle}
      />
    )
  }


  const renderProductDescriptopn = () => {
    const { description } = productDetail as IProductDetailScreen
    return (
      <ProductDescriptionComponent
        description={description}
      />
    )

  }

  const renderContentContainer = () => {
    return (
      <ScrollView contentContainerStyle={styles.productDetailContainer}>
        {renderProductDetailContainer()}
        {renderProductGallery()}
        {renderCallButton()}
        {renderOtherDetailsComponent()}
        {renderProductDescriptopn()}
      </ScrollView>
    )
  }

  const onPressWishlist = () => {
    log('isProductInWishlistisProductInWishlist', isProductInWishlist)
    if(!isProductInWishlist) {
      addProductWishlist({
        productId,
        cancelToken: sourceRef
      })
    } else {
      removeProductFromWishlist({
        productId,
        cancelToken: sourceRef
      })
    }
  }

  const renderWishlistButton = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={isProductInWishlist ? icons.WISHLIST_FILLED_ICON : icons.WISHLIST_ICON}
        iconHeight={30}
        iconWidth={30}
        buttonContainerStyle={styles.wishlistBtnContainer}
        tintColor={colors.white}
        onPressIcon={onPressWishlist}
      />
    )
  }

  const onPressAddToCartButton = () => {
    if(isProductInCart) {
      removeProductFromCart({
        productId,
        cancelToken: sourceRef
      })
    } else {
      addProductToCart({
        qty: 1,
        productId,
        cancelToken: sourceRef
      })
    }
  }

  const renderAddToCartButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={isProductInCart ? REMOVE_FROM_CART : ADD_TO_CART}
        onPress={onPressAddToCartButton}
        buttonContainerStyle={styles.addToCartBtnContainer}
      />
    )
  }

  const renderFooterButtons = () => {
    if(isEmpty(productDetail) || productDetail?.isProductByLoogedInUser) return null
    return (
      <View style={styles.rowContainer}>
        {renderWishlistButton()}
        {renderAddToCartButton()}
      </View>
    )
  }


  return (
    <View style={styles.mainContainer}>
      <HeaderComponent title={HEADER_TITLE}
        showBackBtn
        onPress={onPressBackButton}
      />
      { !isEmpty(productDetail) && renderContentContainer()}
      {!isEmpty(productDetail) && renderFooterButtons()}
    </View>
  )
}