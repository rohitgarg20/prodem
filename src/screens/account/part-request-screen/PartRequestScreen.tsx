import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { ActivityIndicator, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { partRequestStyles as styles } from './styles'
import { colors } from '../../../common/Colors'
import { HeaderComponent } from '../../../common/components/screens'
import { PartRequestComponent } from '../../../common/components/screens/part-request'
import { ScrollableTopBarComponent } from '../../../common/components/screens/ratings'
import { log } from '../../../common/config/log'
import { SCREEN_HEIGHT } from '../../../common/Constant'
import { IPartRequestCardComponent } from '../../../common/Interfaces'
import { ScreenNames } from '../../../common/Screens'
import { addPartRequestToWishlistApi, dispatchPartRequestApi, fetchPartRequestInitialData, ignorePartRequestApi } from '../../../redux/part-request/PartRequestApi'
import {
  getPartRequestTypeListSelector, getSelectedPartRequestType, getPartRequestListDataSelector,
  getCurrentPageSelector, getTotalPageSelector } from '../../../redux/part-request/PartRequestSelector'
import { resetDataReducer, updateSelectedPartRequestTypeReducer } from '../../../redux/part-request/PartRequestSlice'
import { navigateSimple } from '../../../utils/navigation-utils'
import { scale } from '../../../utils/scaling'



export const PartRequestScreen = () => {

  const dispatch = useDispatch()
  const partRequestTypeList = useSelector(getPartRequestTypeListSelector)
  const selectedPartRequestType = useSelector(getSelectedPartRequestType)
  const partRequestListData = useSelector(getPartRequestListDataSelector)
  const currentPageNumber = useSelector(getCurrentPageSelector) || 0
  const totalPages = useSelector(getTotalPageSelector) || 0

  useEffect(() => {
    fetchPartRequestInitialData(dispatch)
    return () => {
      dispatch({ type: resetDataReducer.type })
    }
  }, [dispatch])

  const onPressTab = useCallback((partRequestKey) => {
    dispatch({
      type: updateSelectedPartRequestTypeReducer.type,
      payload: {
        selectedPartRequestType: partRequestKey
      }
    })
    dispatchPartRequestApi({
      listType: partRequestKey,
      page: 1,
      showLoaderOnScreen: true
    })
  }, [dispatch])

  const renderPartRequestTypeListComponent = () => {
    return (
      <View>
        <ScrollableTopBarComponent
          tabBarList={partRequestTypeList}
          selectedTabKey={selectedPartRequestType}
          onPressTab={onPressTab}
          buttonWidth={scale(160)}
        />
      </View>
    )
  }

  //   const renderPartRequestListItems = () => {
  //     return (

  //     )
  //   }

  const getKeyExtractor = (item: IPartRequestCardComponent, index) => {
    return `${item.partRequestId}_${index}`
  }

  const renderItemSeperatorComponent = () => {
    return (
      <View style={styles.partRequestCardSeperator} />
    )
  }

  const navigateToDetailScreen = useCallback((partRequestId: number) => {
    navigateSimple({
      screenToNavigate: ScreenNames.PART_REQUEST_DETAIL_SCREEN,
      params: {
        partRequestId
      }
    })
  }, [])

  const onPressIgnoreButton = useCallback((partRequestId: number) => {
    ignorePartRequestApi(partRequestId)
  }, [])

  const onPressWishlistButton = useCallback((partRequestId: number) => {
    addPartRequestToWishlistApi(partRequestId)
  }, [])

  const renderPartRequestCardComponent = ({ item }: { item: IPartRequestCardComponent }) => {
    return (
      <PartRequestComponent
        {...item}
        navigateToDetailScreen={navigateToDetailScreen}
        onPressIgnoreButton={onPressIgnoreButton}
        onPressWishlistButton={onPressWishlistButton}
      />
    )
  }

  const renderFooterComponent = () => {
    if((currentPageNumber === totalPages) || (partRequestListData?.length === 0) || currentPageNumber === 0) return null
    return (
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
      />
    )
  }

  const fetchPartRequestListData = useCallback(() => {
    if(currentPageNumber < totalPages) {
      dispatchPartRequestApi({
        listType: selectedPartRequestType,
        page: currentPageNumber + 1
      })
    }
  }, [currentPageNumber, selectedPartRequestType, totalPages])

  const renderPartRequestListItems = () => {
    if(isEmpty(partRequestListData)) return null
    return (
      <FlashList
        data={partRequestListData}
        renderItem={renderPartRequestCardComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        estimatedItemSize={130}
        contentContainerStyle={styles.partRequestListContainer}
        onEndReached={fetchPartRequestListData}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooterComponent}
        drawDistance={SCREEN_HEIGHT}
      />
    )
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={'PART_REQUEST_SCREEN.HEADER_TITLE'}
      />
      {renderPartRequestTypeListComponent()}
      <View style={styles.mainContainer}>
        {renderPartRequestListItems()}
      </View>
    </View>
  )
}