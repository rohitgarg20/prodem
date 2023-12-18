import React, { memo, useCallback, useState } from 'react'

import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { CustomText } from '../../generic'

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 10
  }
})

export const ProductDescriptionComponent = memo(({ description }: { description: string }) => {

  const webViewScript = `
  setTimeout(function() { 
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
  }, 20);
  true; // note: this is required, or you'll sometimes get silent failures
`

  const [webviewHeight, updateHeight] = useState(50)

  const renderHeading = () => {
    return (
      <CustomText
        text={'MultiLanguageString.PRODUCT_DESCRIPTION'}
        fontSize={16}
        color = {textColor.black}
        fontWeight='bold'
      />
    )
  }

  const getHtmlContent = useCallback(() => {
    return `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><p>${description}</p></html>`
  }, [description])

  const onMessageHandler = useCallback((event) => {
    updateHeight(parseInt(event.nativeEvent.data))
  }, [])

  const renderDescription = () => {
    return (

      <WebView
        originWhitelist={['*']}
        source={{ html: getHtmlContent() }}
        style={{
          height: webviewHeight
        }}
        automaticallyAdjustContentInsets={false}
        onMessage={onMessageHandler}
        injectedJavaScript={webViewScript}
        scrollEnabled={false}
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