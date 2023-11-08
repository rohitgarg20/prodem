import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { styles } from './styles'
import { HeaderComponent } from '../../../common/components/screens'
import { MyPartRequestCardComponent } from '../../../common/components/screens/my-part-request'
import { ScrollableTopBarComponent } from '../../../common/components/screens/ratings'
import { log } from '../../../common/config/log'
import { partRequestStatusTypeList } from '../../../common/Constant'
import { ScreenNames } from '../../../common/Screens'
import { MY_PART_REQUEST_LIST_SCREEN } from '../../../common/strings'
import { cancelMyPartRequest, fetchMyPartRequestList } from '../../../redux/my-part-request/MyPartRequestApi'
import { onChangeSelectedPartRequestTypeReducer, resetReducerData } from '../../../redux/my-part-request/MyPartRequestListSlice'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'

const { HEADER_TITLE } = MY_PART_REQUEST_LIST_SCREEN

export const MyPartRequestListScreen = () => {

  const dispatch = useDispatch()
  const selectedPartRequestStatusType = useSelector((state: RootState) => state.myPartRequestListReducer.selectedPartRequestStatus)
  const partRequestList = useSelector((state: RootState) => state.myPartRequestListReducer.partRequestList)

  useEffect(() => {
    fetchMyPartRequestList()
    return () => {
      dispatch({
        type: resetReducerData.type
      })
    }
  }, [dispatch])

  const updateSelectedStatusType = useCallback((selectedStatus) => {
    log('updateSelectedStatusType', selectedStatus)
    fetchMyPartRequestList(selectedStatus)
    dispatch({
      type: onChangeSelectedPartRequestTypeReducer.type,
      payload: {
        selectedStatus
      }
    })
  }, [dispatch])

  const renderPartRequestStatusTypeListComponent = () => {
    return (
      <View>
        <ScrollableTopBarComponent
          tabBarList={partRequestStatusTypeList}
          selectedTabKey={selectedPartRequestStatusType}
          onPressTab={updateSelectedStatusType}
        />
      </View>
    )
  }

  const getKeyExtractor = (item, index) => {
    return `${item.partRequestId}_${index}`
  }

  const renderItemSeperatorComponent = () => {
    return (
      <View style={styles.ordersCardSeperator} />
    )
  }

  const navigateToPartRequestDetail = useCallback((partRequestId) => {
    navigateSimple({
      screenToNavigate: ScreenNames.PART_REQUEST_DETAIL_SCREEN,
      params: {
        partRequestId
      }
    })
  },[])

  const onPressCancelButton = useCallback((partRequestId) => {
    cancelMyPartRequest(partRequestId)
  },[])

  const renderPartRequestItemCardComponent = ({ item }) => {
    return (
      <MyPartRequestCardComponent
        partRequestDetail={item}
        onPressCancelButton={onPressCancelButton}
        navigateToPartRequestDetailScreen={navigateToPartRequestDetail}
      />
    )
  }

  const renderPartRequestListComponent = () => {
    if(isEmpty(partRequestList)) return null
    return (
      <FlashList
        data={partRequestList}
        renderItem={renderPartRequestItemCardComponent}
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
      {renderPartRequestStatusTypeListComponent()}
      <View style={styles.mainContainer}>
        {renderPartRequestListComponent()}
      </View>
    </View>
  )
}
