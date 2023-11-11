import React, { useCallback, useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ratingsStyles as styles } from './styles'
import { HeaderComponent } from '../../../common/components/screens'
import { ScrollableTopBarComponent } from '../../../common/components/screens/ratings'
import { RatingCardComponent } from '../../../common/components/screens/ratings/RatingCardComponent'
import { log } from '../../../common/config/log'
import { RATINGS_TOP_BAR } from '../../../common/Constant'
import { IRatingCard, RatingTypes } from '../../../common/Interfaces'
import { ScreenNames } from '../../../common/Screens'
import { RATINGS_SCREEN } from '../../../common/strings'
import { getRatingListData } from '../../../redux/ratings/RatingApi'
import { onChangeRatingTypeReducer, resetDataReducer } from '../../../redux/ratings/RatingsSlice'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'

const { HEADER_TITLE } = RATINGS_SCREEN

export const RatingsScreen = () => {

  const dispatch = useDispatch()
  const ratingData = useSelector((state: RootState) => state.ratingsReducer.ratingData)
  const selectedRatingType = useSelector((state: RootState) => state.ratingsReducer.selectedRatingType)

  useEffect(() => {
    getRatingListData(RatingTypes.PENDING)

    return () => {
      dispatch({ type: resetDataReducer })
    }
  }, [dispatch])


  const onPressTab = (updatedRating: RatingTypes) => {
    log('onPressTabonPressTabonPressTab', updatedRating)
    if(isEmpty(ratingData?.[updatedRating])) {
      getRatingListData(updatedRating)
    }
    dispatch({
      type: onChangeRatingTypeReducer.type,
      payload: {
        updatedRatingType: updatedRating
      }
    })

  }

  const navigateToOrderReceivedScreen = useCallback((orderId) => {
    if(selectedRatingType !== RatingTypes.RECIEVED) {
      navigateSimple({
        screenToNavigate: ScreenNames.ORDER_RECEIVED_DETAIL,
        params: {
          orderId
        }
      })
    }
  }, [selectedRatingType])

  const renderRatingCardComponent = ({ item }: { item: IRatingCard }) => {
    return (
      <RatingCardComponent
        {...item}
        navigateToOrderReceivedScreen={navigateToOrderReceivedScreen}
      />
    )
  }

  const renderRatingsTypeListComponent = () => {
    return (
      <View>
        <ScrollableTopBarComponent
          tabBarList={RATINGS_TOP_BAR}
          selectedTabKey={selectedRatingType}
          onPressTab={onPressTab}
        />
      </View>
    )
  }

  const getKeyExtractor = (item, index) => {
    return `${item.orderId}_${index}`
  }

  const renderItemSeperatorComponent = () => {
    return (
      <View style={styles.ratingCardSeperator} />
    )
  }

  const renderRatingListComponent = () => {
    const ratingTypeListData = ratingData[selectedRatingType]
    if(isEmpty(ratingTypeListData)) return null
    return (
      <FlashList
        data={ratingTypeListData}
        renderItem={renderRatingCardComponent}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        estimatedItemSize={130}
        contentContainerStyle={styles.ratingListContainer}
      />
    )
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={HEADER_TITLE}
      />
      {renderRatingsTypeListComponent()}
      <View style={styles.mainContainer}>
        {renderRatingListComponent()}
      </View>
    </View>
  )
}