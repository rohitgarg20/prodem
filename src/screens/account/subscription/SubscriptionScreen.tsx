import React, { useEffect } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { subscriptionStyles as styles } from './styles'
import { HeaderComponent } from '../../../common/components/screens'
import { ScrollableTopBarComponent } from '../../../common/components/screens/ratings'
import { SubscriptionCardComponent } from '../../../common/components/screens/subscription/SubscriptionCardComponent'
import { ISubscriptionCard } from '../../../common/Interfaces'
import { SUBSCRIPTION_SCREEN } from '../../../common/strings'
import { getSubscriptionPlans } from '../../../redux/subscription/SubscriptionApi'
import { onChangeSubscriptionTypeReducer } from '../../../redux/subscription/SubscriptionSlice'
import { RootState } from '../../../store/DataStore'


const { HEADER_TITLE }  = SUBSCRIPTION_SCREEN

export const SubscriptionScreen = () => {

  const dispatch = useDispatch()
  const subscriptionData = useSelector((state: RootState) => state.subscriptionReducer.subscriptionData) || {}
  const selectedSubscriptionType = useSelector((state: RootState) => state.subscriptionReducer.selectedSubscriptionType) || ''
  const subscriptionTypeList = useSelector((state: RootState) => state.subscriptionReducer.subscriptionTypeList) || []

  useEffect(() => {
    getSubscriptionPlans()

    // return () => {
    //   dispatch({ type: resetDataReducer })
    // }
  }, [dispatch])


  const onPressTab = (updatedSubscriptionType: string) => {
    dispatch({
      type: onChangeSubscriptionTypeReducer.type,
      payload: {
        updatedSubscriptionType
      }
    })

  }

  const renderSubscriptionCardComponent = ({ item }: { item: ISubscriptionCard }) => {
    return (
      <SubscriptionCardComponent
        {...item}
      />
    )
  }

  const renderSubscriptionTypeList = () => {
    return (
      <View>
        <ScrollableTopBarComponent
          tabBarList={subscriptionTypeList}
          selectedTabKey={selectedSubscriptionType}
          onPressTab={onPressTab}
          buttonWidth={150}
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

  const renderSubscriptionListComponent = () => {
    const subscriptionListData = subscriptionData?.[selectedSubscriptionType]
    if(isEmpty(subscriptionListData)) return null
    return (
      <FlashList
        data={subscriptionListData}
        renderItem={renderSubscriptionCardComponent}
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
      {renderSubscriptionTypeList()}
      <View style={styles.mainContainer}>
        {renderSubscriptionListComponent()}
      </View>
    </View>
  )
}