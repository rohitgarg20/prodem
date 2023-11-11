import React, { useEffect, useState } from 'react'

import { FlatList, View } from 'react-native'

import styles from './styles'
import EmptyScreenComponent from '../../../common/components/generic/EmptyScreenComponent'
import SingleSelectMenuBarComponent from '../../../common/components/generic/SingleSelectMenuBarComponent'
import { HeaderComponent } from '../../../common/components/screens'
import BidItemContainer from '../../../common/components/screens/bids-screen/BidComponent'
import { MY_BIDS_REQUEST_TOP_BAR_KEYS, SCREEN_HEIGHT } from '../../../common/Constant'
import { BID_REQUEST_SCREEN } from '../../../common/strings'
import { fetchMyBidRequestApiData } from '../../../redux/my-bid-request/MyBidRequestApi'
import { getMyBidRequestDataFetchingStatusSelector, getMyBidRequestDataListSelector } from '../../../redux/my-bid-request/MyBidRequestSelector'
import { resetMyBidRequestDataReducer } from '../../../redux/my-bid-request/MyBidRequestSlice'
import { store, useAppDispatch, useAppSelector } from '../../../store/DataStore'
import { FlashList } from '@shopify/flash-list'
import { verticalScale } from '../../../utils/scaling'

const { HEADER_TITLE } = BID_REQUEST_SCREEN

const MyBidRequestScreen = () => {
  const [selectedType, updateSelectedType] = useState(MY_BIDS_REQUEST_TOP_BAR_KEYS[0].key)
  const myBidRequestList = useAppSelector(getMyBidRequestDataListSelector(selectedType))
  const isLoading = useAppSelector(getMyBidRequestDataFetchingStatusSelector(selectedType))
  const dispatch = useAppDispatch()
  const windowSize = myBidRequestList.length > 50 ? myBidRequestList.length / 4 : 21


  useEffect(() => {
    fetchMyBidRequestApiData(selectedType)

    return () => {
      dispatch(resetMyBidRequestDataReducer())
    }
  }, [])

  const onSelectedTabChanged = (value: string) => {
    updateSelectedType(value)
    if (!store.getState()?.myBidRequestReducer?.[value]?.list?.length) {
      fetchMyBidRequestApiData(value)
    }
  }

  const getEmptyComponent = () =>  <EmptyScreenComponent />

  const getRenderItem = ({ item }) => <BidItemContainer item={item}/>

  const getKeyExtractor = (item, index) =>  `${item.bidId}_${index}` || ''

  return <View style={styles.container}>
    <HeaderComponent
      showBackBtn
      title={HEADER_TITLE}
    />
    <SingleSelectMenuBarComponent
      dataList={MY_BIDS_REQUEST_TOP_BAR_KEYS}
      onItemChanged={onSelectedTabChanged}
    />
    {isLoading ? null : <FlashList
      key={selectedType}
      data={myBidRequestList}
      renderItem={getRenderItem}
      keyExtractor={getKeyExtractor}
      removeClippedSubviews={true}
      ListEmptyComponent={getEmptyComponent}
      contentContainerStyle={styles.flatListContainer}
      decelerationRate="normal"
      estimatedItemSize={verticalScale(425)}
      drawDistance={5 * SCREEN_HEIGHT}
      // maxToRenderPerBatch={windowSize}
      // windowSize={windowSize}

    />}
  </View>

}

export default MyBidRequestScreen