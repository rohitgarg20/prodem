import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './styles'
import EmptyScreenComponent from '../../../common/components/generic/EmptyScreenComponent'
import { HeaderComponent } from '../../../common/components/screens'
import { OrderRecievedCardComponent } from '../../../common/components/screens/order-received'
import { ScrollableTopBarComponent } from '../../../common/components/screens/ratings'
import { log } from '../../../common/config/log'
import { OrderReceivedTypeList } from '../../../common/Constant'
import { ScreenNames } from '../../../common/Screens'
import { fetchOrderRecievedList } from '../../../redux/order-recieved/OrderRecievedApi'
import { getOrderRecievedListByStatus } from '../../../redux/order-recieved/OrderRecievedSelector'
import { onChangeSelectedOrderTypeReducer, resetReducerData } from '../../../redux/order-recieved/OrderRecievedSlice'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'


export const OrderRecievedListScreen = () => {

  const dispatch = useDispatch()
  const selectedOrderStatusType = useSelector((state: RootState) => state.OrderRecievedReducer.selectedOrderType)
  const isFetching = useSelector((state: RootState) => state.OrderRecievedReducer.isFetching)
  const orderRecievedList = useSelector(getOrderRecievedListByStatus(selectedOrderStatusType))

  useEffect(() => {
    fetchOrderRecievedList()
    return () => {
      dispatch({
        type: resetReducerData
      })
    }
  }, [dispatch])

  const updateOrderType = useCallback((selectedOrderStatus) => {
    dispatch({
      type: onChangeSelectedOrderTypeReducer.type,
      payload: {
        orderType: selectedOrderStatus
      }
    })
  }, [dispatch])

  const renderOrderTypeListComponent = () => {
    return (
      <View>
        <ScrollableTopBarComponent
          tabBarList={OrderReceivedTypeList}
          selectedTabKey={selectedOrderStatusType}
          onPressTab={updateOrderType}
        />
      </View>
    )
  }

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
      screenToNavigate: ScreenNames.ORDER_RECEIVED_DETAIL,
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

  const renderOrderRecievedListComponent = () => {
    if(isEmpty(orderRecievedList)) {
      if(!isFetching) {
        return <EmptyScreenComponent />
      }
      return null
    }
    return (
      <FlashList
        data={orderRecievedList}
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
        title={'ORDER_RECIEVED.HEADER_TITLE'}
      />
      {renderOrderTypeListComponent()}
      <View style={styles.mainContainer}>
        {renderOrderRecievedListComponent()}
      </View>
    </View>
  )
}
