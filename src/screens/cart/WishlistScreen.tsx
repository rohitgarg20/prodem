import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import { HeaderComponent } from '../../common/components/screens'
import { CartCardComponent } from '../../common/components/screens/cart'
import { cartStyles } from '../../common/components/screens/cart/styles'
import { SCREEN_HEIGHT } from '../../common/Constant'
import { ICartItemComponent } from '../../common/Interfaces'
import { WISHLIST_SCREEN } from '../../common/strings'
import { addProductWishlist, getWishlistDetails, removeProductFromWishlist } from '../../redux/wishlist/WishlistApi'
import { getWishListSelector, getWishlistData } from '../../redux/wishlist/WishlistSelector'
import { verticalScale } from '../../utils/scaling'


const { HEADER_TITLE } = WISHLIST_SCREEN

export const WishlistScreen = () => {

  const wishListData = useSelector(getWishlistData)
  const wishList = useSelector(getWishListSelector)

  useEffect(() => {
    getWishlistDetails()
  }, [])

  const onRemoveItemFromWishList = useCallback((productId) => {
    removeProductFromWishlist({
      productId
    })
  }, [])

  const onUpdateCartQuantity = useCallback((productId, quantity) => {
    addProductWishlist({
      productId,
      qty: quantity
    })
  }, [])

  const renderWishListItemComponent = ({ item }) => {
    const wishListItem: ICartItemComponent = wishListData[item]
    const { productId, productName, productImage, displayPrice, quantity, cartId, qtyNonEditable } = wishListItem
    return (
      <CartCardComponent
        productId={productId}
        productName={productName}
        displayPrice={displayPrice}
        productImage={productImage}
        quantity={quantity}
        cartId={cartId}
        onRemoveItemFromCart={onRemoveItemFromWishList}
        updateCartQty={onUpdateCartQuantity}
        qtyNonEditable={true}
      />
    )
  }

  const getKeyExtractor = (item) => {
    const cartItem: ICartItemComponent = wishListData[item]
    const { productId, cartId } = cartItem
    return `${productId}_${cartId}`
  }

  const getItemSeperatorComponent = () => {
    return (<View style={cartStyles.cartItemSeperator} />)
  }

  const renderWishListComponent = () => {
    return (
      <FlashList
        contentContainerStyle={cartStyles.cartListContainer}
        data={wishList}
        renderItem={renderWishListItemComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={getItemSeperatorComponent}
        estimatedItemSize={verticalScale(120)}
        drawDistance={SCREEN_HEIGHT}
      />
    )
  }

  const onRefreshData = useCallback(() => {
    getWishlistDetails()
  }, [])

  const renderWishListHeaderComponent = () => {
    return (
      <HeaderComponent
        title={HEADER_TITLE}
        showBackBtn
        showRefreshButton
        showEndContainer={false}
        onPressRefreshButton={onRefreshData}
      />
    )
  }

  return (
    <View style={cartStyles.mainContainer}>
      {renderWishListHeaderComponent()}
      {renderWishListComponent()}
    </View>

  )
}