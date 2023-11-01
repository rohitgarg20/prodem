import React from 'react'

import { StyleSheet, View } from 'react-native'


const styles = StyleSheet.create({
  mainContainer: {
    width: '100%'
  }
})

interface IProps {
  innerContent: () => React.ReactElement<any>
}

export const CenterModalPopup = (props: IProps ) => {
  const { innerContent } = props


  return (
    <View style = {styles.mainContainer}>
      {innerContent()}
    </View>
  )
}
