import React, { useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import EmptyScreenComponent from '../../common/components/generic/EmptyScreenComponent'
import { HeaderComponent } from '../../common/components/screens'
import { CartCardComponent } from '../../common/components/screens/cart'
import { cartStyles } from '../../common/components/screens/cart/styles'
import { SCREEN_HEIGHT } from '../../common/Constant'
import { ICartItemComponent } from '../../common/Interfaces'
import { CART_SCREEN } from '../../common/strings'
import { addProductToCart, getCartDetails, removeProductFromCart } from '../../redux/cart/CartApi'
import { getCartListSelector, getCartData } from '../../redux/cart/CartSelector'
import { RootState } from '../../store/DataStore'
import { verticalScale } from '../../utils/scaling'


const { HEADER_TITLE } = CART_SCREEN

export const CartScreen = () => {

  const cartData = useSelector(getCartData)
  const cartList = useSelector(getCartListSelector)
  const isFetching = useSelector((state: RootState) => state.cartReducer.isFetching)
  useEffect(() => {
    getCartDetails()
  }, [])

  const onRemoveItemFromCart = (productId) => {
    removeProductFromCart({
      productId
    })
  }

  const onUpdateCartQuantity = (productId, quantity) => {
    addProductToCart({
      productId,
      qty: quantity
    })
  }

  const renderCartItemComponent = ({ item }) => {
    const cartItem: ICartItemComponent = cartData[item]
    const { productId, productName, productImage, displayPrice, quantity, cartId } = cartItem
    return (
      <CartCardComponent
        productId={productId}
        productName={productName}
        displayPrice={displayPrice}
        productImage={productImage}
        quantity={quantity}
        cartId={cartId}
        onRemoveItemFromCart={onRemoveItemFromCart}
        updateCartQty={onUpdateCartQuantity}
      />
    )
  }

  const getKeyExtractor = (item) => {
    const cartItem: ICartItemComponent = cartData[item]
    const { productId, cartId } = cartItem
    return `${productId}_${cartId}`
  }

  const getItemSeperatorComponent = () => {
    return (<View style={cartStyles.cartItemSeperator} />)
  }

  const renderCartListComponent = () => {
    if(isEmpty(cartList) && !isFetching) {
      return  (
        <EmptyScreenComponent />
      )
    }
    return (
      <FlashList
        contentContainerStyle={cartStyles.cartListContainer}
        data={cartList}
        renderItem={renderCartItemComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={getItemSeperatorComponent}
        estimatedItemSize={verticalScale(120)}
        drawDistance={SCREEN_HEIGHT}
      />
    )
  }

  const renderCartHeaderComponent = () => {
    return (
      <HeaderComponent
        title={HEADER_TITLE}
        showRefreshButton
        showEndContainer={false}
        onPressRefreshButton={getCartDetails}
      />
    )
  }

  return (
    <View style={cartStyles.mainContainer}>
      {renderCartHeaderComponent()}
      {renderCartListComponent()}
    </View>

  )
}