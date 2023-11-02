import React, { memo, useCallback } from 'react'

import { map } from 'lodash'
import { StyleSheet, View } from 'react-native'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { ISubscriptionCard } from '../../../Interfaces'
import { SUBSCRIPTION_SCREEN } from '../../../strings'
import { ButtonComponent, CustomText, SpacerComponent } from '../../generic'

const ITEMS_SPACING = verticalScale(5)

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: ITEMS_SPACING,
    borderBottomWidth: 1,
    borderBottomColor: colors.ashGrey,
    flexWrap: 'wrap'
  },
  basicPlanDetailContainer: {
    rowGap: ITEMS_SPACING
  },
  planBtn: {

  },
  subsCardContainer: {
    borderWidth: 2,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderRadius: 10
  },
  planButtonSeperator: {
    paddingTop: 15
  }
})

const { PRICE, QUANTITY, VALIDITY } = SUBSCRIPTION_SCREEN

export const SubscriptionCardComponent = memo((props: ISubscriptionCard) => {
  const { price, quantity, validity, multiSubscription, name, btnBackgroundColor } = props
  const renderBasicDetailTextComponent = (label, value) => {
    return (
      <View style={styles.rowContainer}>
        <CustomText
          text={label}
          fontSize={14}
          color={textColor.black}
          fontWeight='600'
        />
        <CustomText
          text={value}
          fontSize={15}
          color={textColor.black}
        />
      </View>
    )
  }

  const renderPlanBasicDetails = () => {
    return (
      <View style={styles.basicPlanDetailContainer}>
        {renderBasicDetailTextComponent(PRICE, price)}
        {renderBasicDetailTextComponent(QUANTITY, quantity)}
        {renderBasicDetailTextComponent(VALIDITY, validity)}
      </View>
    )
  }

  const renderPlanBenefitItem = (subscriptionItem) => {
    const { key, value, label } = subscriptionItem
    return (
      <View style={styles.rowContainer}
        key = {key}
      >
        <CustomText
          text={label}
          fontSize={16}
          color={textColor.black}
          fontWeight='bold'
        />
        <CustomText
          text={value}
          fontSize={14}
          color={textColor.black}
        />
      </View>
    )
  }

  const renderPlanBenefits = () => {
    return (
      <View style={styles.basicPlanDetailContainer}>
        { map(multiSubscription, renderPlanBenefitItem) }
      </View>
    )
  }

  const getBuyPlanBtnStyle = useCallback(() => {
    return {
      backgroundColor: btnBackgroundColor
    }
  }, [btnBackgroundColor])

  const getContainerStyle = useCallback(() => {
    return {
      ...styles.subsCardContainer,
      borderColor: btnBackgroundColor
    }
  }, [btnBackgroundColor])

  const buyPlanButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={name}
        buttonContainerStyle={getBuyPlanBtnStyle()}
        color={textColor.black}
      />
    )
  }

  return (
    <View style={getContainerStyle()}>
      {renderPlanBasicDetails()}
      {renderPlanBenefits()}
      <SpacerComponent style={styles.planButtonSeperator}/>
      {buyPlanButton()}
    </View>
  )

})