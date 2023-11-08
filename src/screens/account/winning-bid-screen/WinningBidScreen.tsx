import React, { useEffect, useState } from 'react'

import { FlatList, View } from 'react-native'

import styles from './styles'
import EmptyScreenComponent from '../../../common/components/generic/EmptyScreenComponent'
import SingleSelectMenuBarComponent from '../../../common/components/generic/SingleSelectMenuBarComponent'
import { HeaderComponent } from '../../../common/components/screens'
import BidItemContainer from '../../../common/components/screens/bids-screen/BidComponent'
import { log } from '../../../common/config/log'
import { WINNING_BIDS_TOP_BAR_KEYS } from '../../../common/Constant'
import { WINNING_BID_SCREEN } from '../../../common/strings'
import { fetchWinningBidApiData } from '../../../redux/winning-bid/WinningBidApi'
import { getWinningBidDataListSelector } from '../../../redux/winning-bid/WinningBidSelector'
import { resetWinningBidDataReducer } from '../../../redux/winning-bid/WinningBidSlice'
import { store, useAppDispatch, useAppSelector } from '../../../store/DataStore'

const { HEADER_TITLE } = WINNING_BID_SCREEN

const WinningBidScreen = () => {
  const [selectedType, updateSelectedType] = useState(WINNING_BIDS_TOP_BAR_KEYS[0].key)
  const winningBidList = useAppSelector(getWinningBidDataListSelector(selectedType))

  log('winningBidList : ', winningBidList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchWinningBidApiData(selectedType)

    return () => {
      dispatch(resetWinningBidDataReducer())
    }
  }, [dispatch])

  const onSelectedTabChanged = (value: string) => {
    updateSelectedType(value)
    if (!store.getState()?.winningBidReducer?.[value]?.list?.length) {
      fetchWinningBidApiData(value)
    }
  }

  return <View style={styles.container}>
    <HeaderComponent
      showBackBtn
      title={HEADER_TITLE}
    />
    <SingleSelectMenuBarComponent
      dataList={WINNING_BIDS_TOP_BAR_KEYS}
      onItemChanged={onSelectedTabChanged}
    />
    <FlatList
      key={selectedType}
      data={winningBidList}
      renderItem={({item}) => <BidItemContainer item={item}/>}
      keyExtractor={item => item.bidId || ''}
      removeClippedSubviews={false}
      ListEmptyComponent={() => <EmptyScreenComponent />}
      contentContainerStyle={styles.flatListContainer}
    />
  </View>

}

export default WinningBidScreen