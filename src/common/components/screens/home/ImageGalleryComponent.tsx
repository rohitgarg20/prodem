import React, { useCallback, useRef } from 'react'

import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors } from '../../../Colors'
import { icons } from '../../../Icons'
import { IconButtonWrapperComponent, IconWrapper } from '../../generic'

const styles = StyleSheet.create({
  imageCContainer: {

  },
  arrowBtnContainer: {
    height: scale(20),
    width: scale(20),
    borderRadius: 20,
    backgroundColor: colors.aquaHaze,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftArrow: {
    transform: [{
      rotate: '90deg'
    }]
  },
  rightArrow: {
    transform: [{
      rotate: '-90deg'
    }]
  },
  headerComponentStyle: {
    justifyContent: 'center',
    paddingRight: 20
  },
  footerComponentStyle: {
    justifyContent: 'center',
    paddingLeft: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    paddingVertical: 20
  },
  imagesSeperator: {
    paddingRight: 10
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.primary,
    padding: 5
  },
  listContainer: {
    alignItems: 'center'
  },
  productListContainer: {
    flex: 1
  }
})

export const ImageGalleryComponent = ({
  imagesList, selectedImageIndex, onChangeImageIndex, callZoomImageViewerModal
}: { imagesList: string[] | number[]; selectedImageIndex: number; onChangeImageIndex: (imgIndex: number) => void;  callZoomImageViewerModal?: () => void } ) => {

  const flatListRef: any = useRef(null)

  const onPressImage = useCallback((index) => () => {
    if(onChangeImageIndex) {
      onChangeImageIndex(index)
    }
    if(callZoomImageViewerModal) {
      callZoomImageViewerModal()
    }

  }, [onChangeImageIndex, callZoomImageViewerModal])

  const renderProductImage = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={selectedImageIndex === index ? styles.iconContainer : {} }
        onPress={onPressImage(index)}
      >
        <IconWrapper
          iconSource={item}
          iconHeight={verticalScale(70)}
          iconWidth={scale(70)}
          resizeMode='cover'
        />
      </TouchableOpacity>
    )
  }

  const onPressLeftArrow = () => {
    const updatedIndex = selectedImageIndex - 1
    if(onChangeImageIndex) {
      onChangeImageIndex(updatedIndex)
    }
    flatListRef?.current?.scrollToIndex({
      index: updatedIndex
    })
  }

  const onPressRightArrow = () => {
    const updatedIndex = selectedImageIndex + 1
    if(onChangeImageIndex) {
      onChangeImageIndex(updatedIndex)
    }
    flatListRef?.current?.scrollToIndex({
      index: selectedImageIndex + 1
    })
  }

  const renderLeftArrowButton = () => {
    return (
      <IconButtonWrapperComponent
        buttonContainerStyle={styles.arrowBtnContainer}
        iconSource={icons.DOWN_ARROW}
        iconHeight={12}
        iconWidth={12}
        tintColor={colors.lightBlack}
        onPressIcon={onPressLeftArrow}
        style={styles.leftArrow}
        isDisabled = {selectedImageIndex === 0}
      />
    )
  }

  const renderRightArrowButton = () => {
    return (
      <IconButtonWrapperComponent
        buttonContainerStyle={styles.arrowBtnContainer}
        iconSource={icons.DOWN_ARROW}
        iconHeight={12}
        iconWidth={12}
        tintColor={colors.lightBlack}
        onPressIcon={onPressRightArrow}
        style={styles.rightArrow}
        isDisabled={selectedImageIndex === imagesList?.length - 1}
      />
    )
  }

  const listSeperatorComponent = () => ( <View style={styles.imagesSeperator} /> )

  const renderProductImageListGallery = () => {
    return (
      <View style={styles.productListContainer}>
        <FlatList
          ref={flatListRef}
          data={imagesList}
          horizontal
          renderItem={renderProductImage}
          ItemSeparatorComponent={listSeperatorComponent}
          contentContainerStyle={styles.listContainer}
        // ListHeaderComponentStyle={styles.headerComponentStyle}
        // ListFooterComponentStyle={styles.footerComponentStyle}
        // ListHeaderComponent={renderLeftArrowButton}
        // ListFooterComponent={renderRightArrowButton}
        />
      </View>
    )
  }

  return (
    <View style={styles.rowContainer}>
      {renderLeftArrowButton()}
      {renderProductImageListGallery()}
      {renderRightArrowButton()}
    </View>
  )
}