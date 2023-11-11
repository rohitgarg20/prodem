import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useSelector } from 'react-redux'

import { styles } from './styles'
import { HeaderComponent } from '../../../common/components/screens'
import { OrderRecievedCardComponent } from '../../../common/components/screens/order-received'
import { ORDER_PLACED } from '../../../common/strings'
import { fetchOrderPlacedList } from '../../../redux/order-placed/OrderPlacedApi'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'
import { ScreenNames } from '../../../common/Screens'

const { HEADER_TITLE } = ORDER_PLACED

export const OrderPlacedListScreen = () => {

  const orderPlacedList = useSelector((state: RootState) => state.orderPlacedReducer.orderPlacedList)

  useEffect(() => {
    fetchOrderPlacedList()
  }, [])


  const getKeyExtractor = (item, index) => {
    return `${item.orderId}_${index}`
  }

  const renderItemSeperatorComponent = () => {
    return (
      <View style={styles.ordersCardSeperator} />
    )
  }

  const navigateToOrderDetail = useCallback((orderId) => {
    navigateSimple({
      screenToNavigate: ScreenNames.ORDER_PLACED_DETAIL_SCREEN,
      params: {
        orderId
      }
    })
  },[])

  const renderOrderItemCardComponent = ({ item }) => {
    return (
      <OrderRecievedCardComponent orderRecievedItemData={item}
        navigateToOrderDetail={navigateToOrderDetail}
      />
    )
  }

  const renderMyOrdersListComponent = () => {
    if(isEmpty(orderPlacedList)) return null
    return (
      <FlashList
        data={orderPlacedList}
        renderItem={renderOrderItemCardComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        estimatedItemSize={130}
        contentContainerStyle={styles.ordersListContainer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={HEADER_TITLE}
      />
      <View style={styles.mainContainer}>
        {renderMyOrdersListComponent()}
      </View>
    </View>
  )
}
