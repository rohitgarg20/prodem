import React, { memo, useCallback } from 'react'

import { Pressable, StyleSheet, View } from 'react-native'

import { scale, verticalScale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { ICategoryCardComponent } from '../../../Interfaces'
import { CustomText, IconWrapper } from '../../generic'
import { log } from '../../../config/log'

const styles = StyleSheet.create({
  cardContainer: {
    height: verticalScale(100),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2
  },
  iconContainer: {
    borderRadius: 10
  }
})


export const CategoryCardComponent = memo((props: ICategoryCardComponent) => {
  const { categoryImage, categoryName, categoryId, onPress } = props

  const renderCategoryImage = () => {
    return (
      <IconWrapper
        iconSource={categoryImage}
        iconHeight={verticalScale(80)}
        iconWidth={scale(134)}
        style={styles.iconContainer}
        resizeMode='cover'
      />
    )
  }

  const renderCategoryName = () => {
    return (
      <CustomText
        text={categoryName}
        fontSize={15}
        color = {textColor.black}
        fontWeight='800'
      />

    )
  }

  const onPressCard = useCallback(() => {
    log('onPressCard')
    if (onPress) {
      onPress(categoryId)
    }
  }, [onPress, categoryId])

  return (
    <Pressable style={styles.cardContainer}
      onPress={onPressCard} >
      {renderCategoryImage()}
      {renderCategoryName()}
    </Pressable>
  )
})