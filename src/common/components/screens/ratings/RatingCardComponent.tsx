import React, { memo } from 'react'

import { map } from 'lodash'
import { Pressable, StyleSheet, View } from 'react-native'

import { tString } from '../../../../utils/app-utils'
import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { icons } from '../../../Icons'
import { IRatingCard } from '../../../Interfaces'
import { CustomText, IconWrapper } from '../../generic'

export const styles = StyleSheet.create({
  ratingCardContainer: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(10),
    borderRadius: 16,
    backgroundColor: colors.lightBlue,
    rowGap: 7
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5
  },
  userRating: {
    flexDirection: 'row',
    columnGap: scale(15)
  }
})


export const RatingCardComponent = memo((props: IRatingCard) => {
  const { orderNo, ratingDesc, userName, isRatingPending, ratingType, ratingStar, orderDate, navigateToOrderReceivedScreen, orderId } = props

  const renderOrderNo = () => {
    const displayLabel = `${tString('RATINGS_SCREEN.ORDER_NO')}  ${orderNo}`
    return (
      <CustomText
        text={displayLabel}
        fontSize={17}
        fontWeight="bold"
        color={textColor.black}
        lineHeight={18}
      />
    )
  }

  const renderDescriptionOrUserName = () => {
    return (
      <CustomText
        text={ratingDesc || userName}
        fontSize={17}
        lineHeight={18}
        color={textColor.mediumGrey}
        numberOfLines={2}
        ellipsizeMode='tail'
      />
    )
  }

  const renderRatingType = () => {
    return (
      <CustomText
        text={ratingType}
        fontSize={16}
        color={textColor.mediumGrey}
        numberOfLines={1}
      />
    )
  }

  const renderRatingItem = (item, index) => {
    return (
      <IconWrapper
        iconSource={icons.STAR_ICON}
        iconHeight={22}
        iconWidth={22}
        key={index}
        tintColor={colors.lightYellow}
      />
    )
  }

  const renderRatingStars = () => {
    const ratingArr = Array(ratingStar)
    return (
      <View style={styles.userRating}>
        {
          map(ratingArr, renderRatingItem)
        }
      </View>
    )
  }

  const renderOrderDate = () => {
    return (
      <CustomText
        text={orderDate}
        fontSize={16}
        color={textColor.mediumGrey}
      />
    )
  }

  const renderBottomContainer = () => {
    return (
      <View style={styles.rowContainer}>
        {
          isRatingPending ? renderRatingType() : renderRatingStars()
        }
        {renderOrderDate()}
      </View>
    )
  }

  const onPressCard = () => {
    if(navigateToOrderReceivedScreen) {
      navigateToOrderReceivedScreen(orderId)
    }
  }

  return (
    <Pressable style={styles.ratingCardContainer}
      onPress={onPressCard}>
      {renderOrderNo()}
      {renderDescriptionOrUserName()}
      {renderBottomContainer()}
    </Pressable>
  )
})