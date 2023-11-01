import React from 'react'

import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { RootState } from '../../../store/DataStore'
import { colors } from '../../Colors'

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 999999
  },
  loaderCard: {
    height: 120,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.white,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15
  }
})

export const ScreenLoader = () => {

  const isLoading  = useSelector<RootState>(state => state.loaderReducer.isLoading)

  if (!isLoading) return null

  return (
    <View style={styles.mainContainer}>
      <View style={styles.loaderCard}>
        <ActivityIndicator
          animating={true}
          size={'large'}
          color={colors.primary}
        />
      </View>
    </View>
  )

}