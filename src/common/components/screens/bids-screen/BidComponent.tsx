import React, { memo, useCallback, useMemo } from 'react'

import { StyleSheet, View } from 'react-native'

import { scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { BID_COMPONENT_LABEL } from '../../../strings'
import { CustomText } from '../../generic/CustomText'

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 10,
    paddingHorizontal: scale(10),
    paddingBottom: scale(40),
    paddingTop: scale(10),
    marginTop: scale(10),
    elevation: 4,
    shadowColor: colors.fuscosGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    backgroundColor: colors.lightOrangeBackground
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  flexOne: { flex: 1 }
})

const BidItemContainer = memo(({ item }: { item: IBidItem }) => {


  const LabelComponent = useCallback(({
    keyLabel,
    valueLabel
  }) => {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.flexOne}>
          <CustomText
            text={keyLabel}
            fontSize={14}
            color={textColor.black}
          />
        </View>
        <View style={styles.flexOne}>
          <CustomText
            text={valueLabel}
            fontSize={14}
            color={textColor.cinder}
          />
        </View>

      </View>
    )
  }, [])


  return <View style={styles.infoCard}>
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.BID_ID_LABEL}
      valueLabel={item.bidId} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.USER_ID_LABEL}
      valueLabel={item.userId} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.BID_TITLE}
      valueLabel={item.title} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.BID_REMARK}
      valueLabel={item.privateRemark} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.BID_PRICE}
      valueLabel={item.price} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.BID_CREATED_AT}
      valueLabel={item.createdAt} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_TITLE}
      valueLabel={item.requestTitle} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_VEHICLE}
      valueLabel={item.requestVehicle} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_YEAR}
      valueLabel={item.requestYear} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_VERIANT}
      valueLabel={item.requestVarient} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_ENGINE}
      valueLabel={item.requestEngine} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_DELIVERY_LOCATION}
      valueLabel={item.requestDeliveryLocation} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.PART_REQUEST_CREATED_AT}
      valueLabel={item.requestCreatedAt} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.COMPANY_NAME}
      valueLabel={item.companyName} />
    <LabelComponent keyLabel={BID_COMPONENT_LABEL.COMPANY_TRADE}
      valueLabel={item.companyTrade} />
  </View>
})

export default BidItemContainer

