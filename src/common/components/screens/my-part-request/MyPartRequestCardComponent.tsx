import React, { memo } from 'react'

import { StyleSheet, View } from 'react-native'

import { isPartRequestCancelled, isPartRequestResolved } from '../../../../utils/app-utils'
import { colors, textColor } from '../../../Colors'
import { ButtonType } from '../../../Enumerators'
import { IPartRequestBasicDetail } from '../../../Interfaces'
import { BUTTONS } from '../../../strings'
import { ButtonComponent, CustomText, SpacerComponent } from '../../generic'

interface IProps {
  partRequestDetail: IPartRequestBasicDetail
  navigateToPartRequestDetailScreen: (productId: number) => void
  onPressCancelButton: (productId: number) => void
}

const styles = StyleSheet.create({
  sendMsgButton: {
    height: 35,
    paddingHorizontal: 10
  },
  cancelBtn: {
    height: 35,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightestGrey
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainContainer: {
    // rowGap: 5
  },
  bottomSpacing: {
    paddingTop: 8
  },
  orderRowContainer: {
    flexDirection: 'row',
    columnGap: 5,
    paddingTop: 10
  }
})

export const MyPartRequestCardComponent = memo((props: IProps) => {
  const { partRequestDetail, navigateToPartRequestDetailScreen, onPressCancelButton } = props
  const {
    heading, description, uploadedDate, dealsCount, partRequestId, partRequestStatus
  } = partRequestDetail


  const renderPartDetail = () => {
    return (
      <CustomText
        text={heading}
        fontSize={14}
        color={textColor.black}
        numberOfLines={2}
        ellipsizeMode='tail'
        fontWeight='600'
      />
    )
  }

  const renderPartDescription = () => {
    return (
      <CustomText
        text={description}
        fontSize={13}
        color={textColor.lightBlack}
        numberOfLines={2}
        ellipsizeMode='tail'
      />
    )
  }

  const renderDealsCount = () => {
    return (
      <View style={styles.orderRowContainer}>
        <CustomText
          text={'Deals:'}
          fontSize={14}
          color={textColor.lightBlack}
        />
        <CustomText
          text={dealsCount}
          fontSize={15}
          color={textColor.black}
          fontWeight='600'
        />
      </View>
    )
  }

  const renderOrderDate = () => {
    return (
      <CustomText
        text={uploadedDate}
        fontSize={14}
        color={textColor.lightBlack}
      />
    )
  }

  const onPressButton = () => {
    navigateToPartRequestDetailScreen(partRequestId)
  }

  const renderOrderDetailButton = () => {
    return (
      <ButtonComponent
        text={BUTTONS.VIEW_DETAILS}
        buttonType={ButtonType.ROUNDED_BTN}
        buttonContainerStyle={styles.sendMsgButton}
        onPress={onPressButton}
      />
    )
  }


  const onCancelButtonPress = () => {
    onPressCancelButton(partRequestId)
  }

  const renderCancelButton = () => {
    if(isPartRequestCancelled(partRequestStatus) || isPartRequestResolved(partRequestStatus)) return null
    return (
      <View>
        <ButtonComponent
          text={BUTTONS.CANCEL}
          buttonType={ButtonType.ROUNDED_BTN}
          buttonContainerStyle={styles.cancelBtn}
          onPress={onCancelButtonPress}
          color={textColor.black}
        />
        <SpacerComponent style={styles.bottomSpacing} />
      </View>
    )
  }

  const renderDealsCountWithViewDetailBtn = () => {
    return (
      <View style={styles.rowContainer}>
        {renderDealsCount()}
        {renderCancelButton()}
      </View>
    )
  }


  const renderDateWithCancelRowContainer = () => {
    return (
      <View style={styles.rowContainer}>
        {renderOrderDate()}
        {renderOrderDetailButton()}
      </View>
    )
  }

  const renderTopSection = () => {
    return (
      <View>
        {renderPartDetail()}
        {renderPartDescription()}
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderTopSection()}
      {renderDealsCountWithViewDetailBtn()}
      {/* <SpacerComponent style={styles.bottomSpacing} /> */}
      {renderDateWithCancelRowContainer()}
    </View>
  )

})