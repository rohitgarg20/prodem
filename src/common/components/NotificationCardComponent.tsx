import React, { memo } from 'react'

import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { CustomText, IconWrapper } from './generic'
import { scale, verticalScale } from '../../utils/scaling'
import { colors, textColor } from '../Colors'
import { icons } from '../Icons'
import { INotificationDetail } from '../Interfaces'

const styles = StyleSheet.create({
  userIcon: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: colors.blueishCyan,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: 10
  },
  cardContainer: {
    borderRadius: 10,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    backgroundColor: colors.white,
    elevation: 5,
    rowGap: 10
  },
  notificationDate: {
    // textAlign: 'right',
    alignSelf: 'flex-end'
  },
  notificationDescription: {
    // flex: 1,
    // flexWrap: 'nowrap',
    // backgroundColor: 'red'
  },
  notificationContainer: {
    flex: 1,
    rowGap: 5
  },
  notificationUnRead: {
    backgroundColor: colors.lightOrangeBackground
  }
})

interface IProps {
  notificationDetail: INotificationDetail
  onNotificationClick: (notificationDetail: INotificationDetail) => void
}

export const NotificationCardComponent = memo((props: IProps) => {

  const { notificationDetail, onNotificationClick } = props
  const { isRead, title, description, notificationDate, notificationType, notificationId, bookingId } = notificationDetail

  const renderProfilePic = () => {
    return (
      <View style={styles.userIcon}>
        <IconWrapper
          iconHeight={'70%'}
          iconWidth={'70%'}
          iconSource={icons.ACCOUNT}
          resizeMode='contain'
        />
      </View>
    )
  }

  const renderNotificationTitle = () => {
    return (
      <CustomText
        text={title}
        fontSize={16}
        fontWeight="bold"
        color={textColor.black}
        lineHeight={18}
        // textStyle={styles.userDetailPadding}
      />
    )
  }
  const renderNotificationDescription = () => {
    return (
      <CustomText
        text={description}
        fontSize={14}
        color={textColor.mediumGrey}
        lineHeight={18}
        numberOfLines={2}
        ellipsizeMode='tail'
        textStyle={styles.notificationDescription}
      />
    )
  }

  const renderNotificationDate = () => {
    return (
      <CustomText
        text={notificationDate}
        fontSize={14}
        color={textColor.mediumGrey}
        lineHeight={18}
        textStyle={styles.notificationDate}
      />
    )
  }

  const renderBasicDetail = () => {
    return (
      <View style={styles.rowContainer}>
        {renderProfilePic()}
        <View style={styles.notificationContainer}>
          {renderNotificationTitle()}
          {renderNotificationDescription()}
        </View>
      </View>
    )
  }

  const onPress = () => {
    if(onNotificationClick) {
      onNotificationClick(notificationDetail)
    }
  }

  return (
    <TouchableOpacity style={[styles.cardContainer, isRead ? {} : styles.notificationUnRead ]}
      onPress={onPress}
    >
      {renderBasicDetail()}
      {renderNotificationDate()}
    </TouchableOpacity>
  )
})