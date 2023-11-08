import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { BID_REQUEST_SCREEN } from "../../../common/strings"
import { HeaderComponent } from "../../../common/components/screens"
import SingleSelectMenuBarComponent from "../../../common/components/generic/SingleSelectMenuBarComponent"

import { MY_BIDS_REQUEST_TOP_BAR_KEYS } from "../../../common/Constant"
import { store, useAppDispatch, useAppSelector } from "../../../store/DataStore"
import EmptyScreenComponent from "../../../common/components/generic/EmptyScreenComponent"
import { getMyBidRequestDataListSelector } from "../../../redux/my-bid-request/MyBidRequestSelector"
import { resetMyBidRequestDataReducer } from "../../../redux/my-bid-request/MyBidRequestSlice"
import { fetchMyBidRequestApiData } from "../../../redux/my-bid-request/MyBidRequestApi"
import styles from './styles'
import BidItemContainer from "../../../common/components/screens/bids-screen/BidComponent"

const { HEADER_TITLE } = BID_REQUEST_SCREEN

const MyBidRequestScreen = () => {
  const [selectedType, updateSelectedType] = useState(MY_BIDS_REQUEST_TOP_BAR_KEYS[0].key)
  const myBidRequestList = useAppSelector(getMyBidRequestDataListSelector(selectedType))
  const dispatch = useAppDispatch()

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



  return <View style={styles.container}>
    <HeaderComponent
      showBackBtn
      title={HEADER_TITLE}
    />
    <SingleSelectMenuBarComponent
      dataList={MY_BIDS_REQUEST_TOP_BAR_KEYS}
      onItemChanged={onSelectedTabChanged}
    />
    <FlatList
      key={selectedType}
      data={myBidRequestList}
      renderItem={BidItemContainer}
      keyExtractor={item => item.bidId || ''}
      removeClippedSubviews={false}
      ListEmptyComponent={() => <EmptyScreenComponent />}
      contentContainerStyle={styles.flatListContainer}
    />
  </View>

}

export default MyBidRequestScreen