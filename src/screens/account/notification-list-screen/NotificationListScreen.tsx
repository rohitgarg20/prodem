import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { colors } from '../../../common/Colors'
import EmptyScreenComponent from '../../../common/components/generic/EmptyScreenComponent'
import { NotificationCardComponent } from '../../../common/components/NotificationCardComponent'
import { HeaderComponent } from '../../../common/components/screens'
import { log } from '../../../common/config/log'
import { INotificationDetail } from '../../../common/Interfaces'
import { ScreenNames } from '../../../common/Screens'
import { getNotificationList, markNotificationRead } from '../../../redux/notification/NotificationApi'
import { getNotificationIds, getFetchingStatus } from '../../../redux/notification/NotificationSelector'
import { onMarkReadNotificationActionReducer } from '../../../redux/notification/NotificationSlice'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'
import { scale, verticalScale } from '../../../utils/scaling'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  mainContainer: {
    paddingHorizontal: scale(15),
    backgroundColor: colors.lightBlue,
    flex: 1
  },
  cardSeperator: {
    paddingBottom: verticalScale(10)
  },
  notificationList: {
    paddingVertical: verticalScale(10)
  }
})

export const NotificationScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const notificationData = useSelector((state: RootState) => state.notificationReducer.notificationData) || {}
  const notificationIds = useSelector(getNotificationIds)
  const isFetching = useSelector(getFetchingStatus)

  useEffect(() => {
    getNotificationList()
  }, [])

  const onPressNotificationItem = useCallback((notificationDetail: INotificationDetail) => {
    const { notificationType, data } = notificationDetail
    log('notificationDetail', notificationDetail)
    const { productId, orderId } = data || {}
    switch(notificationType) {
      case 'bidStatusUpdated':
      case 'newBidReceived':
      case 'bidWinnerSelected':
        if(productId > 0) {
          navigateSimple({
            screenToNavigate: ScreenNames.PART_REQUEST_DETAIL_SCREEN,
            navigator: navigation,
            params: {
              partRequestId: productId
            }
          })
        }
        break
      case 'newOrderReceived':
        if(orderId > 0) {
          navigateSimple({
            screenToNavigate: ScreenNames.ORDER_RECEIVED_DETAIL,
            navigator: navigation,
            params: {
              orderId: orderId
            }
          })
        }
        break
      case 'OrderStatusUpdated':
        if(orderId > 0) {
          navigateSimple({
            screenToNavigate: ScreenNames.ORDER_PLACED_DETAIL_SCREEN,
            params: {
              orderId
            }
          })
        }
        break
      default:
    }
  }, [navigation])

  const onNotificationClick = useCallback((notificationDetail: INotificationDetail) => {
    const { notificationId, isRead } = notificationDetail
    if(!isRead) {
      dispatch({
        type: onMarkReadNotificationActionReducer.type,
        payload: {
          notificationId
        }
      })
      markNotificationRead(notificationId)
    }
    onPressNotificationItem(notificationDetail)
  }, [dispatch, onPressNotificationItem])


  const renderNotificationItemComponent = ({ item }) => {
    const data: INotificationDetail = notificationData[item]
    return (
      <NotificationCardComponent
        notificationDetail={data}
        onNotificationClick={onNotificationClick}
      />
    )
  }

  const getKeyExtractor = (item, index) => {
    return (item || index).toString()
  }

  const renderItemSeperatorComponent = () => {
    return (
      <View style={styles.cardSeperator} />
    )
  }

  const renderNotificaionListComponent = () => {
    if(isEmpty(notificationIds)) {
      if(!isFetching) {
        return <EmptyScreenComponent />
      }
      return null
    }
    return (
      <FlashList
        data={notificationIds}
        renderItem={renderNotificationItemComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        estimatedItemSize={130}
        contentContainerStyle={styles.notificationList}
      />
    )
  }


  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={'NOTIFICATION_SCREEN.HEADER_TITLE'}
      />
      <View style={styles.mainContainer}>
        {renderNotificaionListComponent()}
      </View>
    </View>
  )
}