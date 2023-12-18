import React, { memo, useCallback } from 'react'

import { get } from 'lodash'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { CustomText } from './CustomText'
import { IconWrapper } from './IconWrapper'
import { colors, textColor } from '../../Colors'
import { icons } from '../../Icons'
import { CrossButtonComponent } from '../screens'

interface IProps {
  imageUrls: string[] | number[]
  isVisible: boolean
  closeImageZoomViewer: () => void
  initialIndex?: number
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.lightBlack,
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10
  },
  emptyContainer: {
    width: 40,
    height: 10
  }
})

export const ImageZoomViewerComponent = memo((props: IProps) => {

  const { imageUrls, isVisible, closeImageZoomViewer, initialIndex = 0 } = props

  const getImagesInImageViewerFormat = useCallback(() => {
    let images: any = []
    imageUrls.forEach((image) => {
      if(typeof image === 'string') {
        images.push( { url: image })
      } else if (typeof image === 'number') {
        images.push( { url: '', props: { source: image } })
      }
    })
    return images
  }, [imageUrls])

  const showLoaderOnImageLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'}
          animating = {true}
          color = {colors.primary} />
      </View>
    )
  }


  const renderTopHeader = (currentIndex?: number) => {
    const activeIndex = currentIndex || 0
    const imageIndex = `${activeIndex + 1}/${imageUrls.length}`
    return (
      <View style={styles.rowContainer}>
        <View style={styles.emptyContainer} />
        <CustomText color={textColor.white} >
          {imageIndex}</CustomText>
        <CrossButtonComponent onPressIcon={closeImageZoomViewer} />
      </View>
    )
  }

  const renderIndicator = () => {
    return (
      <View />
    )
  }

  const renderImage = (propsImg) => {
    const imgSource = get(propsImg, 'source.uri') || get(propsImg, 'source')
    return (
      <IconWrapper
        iconSource={imgSource}
        iconHeight={'80%'}
        iconWidth={'100%'}
        // style={styles.iconContainer}
        resizeMode='stretch'
      />
    )
  }

  return (
    <Modal visible={isVisible}
      transparent>
      <ImageViewer imageUrls={getImagesInImageViewerFormat()}
        loadingRender={showLoaderOnImageLoading}
        renderHeader={renderTopHeader}
        renderIndicator={renderIndicator}
        // renderImage={renderImage}
        failImageSource={{
          url: icons.DEFAULT_IMAGE,
          props: {
            source: icons.DEFAULT_IMAGE
          }
        }}
        index={initialIndex}
        enablePreload
      />
    </Modal>
  )
})