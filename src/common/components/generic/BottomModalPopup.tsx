import React, { useEffect } from 'react'

import { StyleSheet, View } from 'react-native'

import { verticalScale } from '../../../utils/scaling'
import { colors } from '../../Colors'


const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: colors.aquaHaze,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    minHeight: verticalScale(250)
  },
  modalEnd: {
    justifyContent: 'flex-end'
  }
})

interface IProps {
  innerContent: () => React.ReactElement<any>
}

export const BottomModalPopup = (props: IProps ) => {
  const { innerContent } = props

  return (
    <View style = {styles.mainContainer}>
      {innerContent()}
    </View>
  )
}
