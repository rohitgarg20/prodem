import React, { memo } from 'react'

import { useRoute } from '@react-navigation/native'
import { get } from 'lodash'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

import { BASE_URL } from '../../common/ApiConstant'
import { colors, textColor } from '../../common/Colors'
import { CustomText } from '../../common/components'
import { HeaderComponent } from '../../common/components/screens'


const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 10,
    flex: 1
  },
  container: {
    flex: 1
  }
})


export const TermsOfConditionScreen = memo(() => {

  const routeParams = useRoute()
  const url = get(routeParams, 'params.url', '')
  const headerTitle = get(routeParams, 'params.headerTitle', '')
  const renderHeading = () => {
    return (
      <HeaderComponent
        showBackBtn
        title={headerTitle}
      />
    )
  }

  const renderDescription = () => {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: `${BASE_URL}${url}` }}
        style={styles.container}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
        javaScriptEnabled={true}
      />
    )
  }
  return (
    <View style={styles.mainContainer}>
      {renderHeading()}
      {renderDescription()}
    </View>
  )

})