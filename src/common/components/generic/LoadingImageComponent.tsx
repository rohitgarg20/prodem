import React, { memo, useCallback } from 'react'

import FastImage from 'react-native-fast-image'

import { icons } from '../../Icons'


export const LoadingImageComponent = memo(({
  iconHeight, iconWidth
}: {
  iconHeight: number | string
  iconWidth: number | string
}) => {

  const getContainerStyle = useCallback(({
    iconWidth: iconW, iconHeight: iconH, containerStyle
  }: { iconWidth: number | string; iconHeight: number | string; containerStyle: any  }) => {
    return {
      ...containerStyle,
      height: iconH,
      width: iconW
    }
  }, [])

  return (
    <FastImage
      source={icons.LOADING_IMAGE_GIF}
      style = {getContainerStyle({
        iconHeight,
        iconWidth,
        containerStyle: {
          position: 'absolute'
        }
      })}
      resizeMode={'cover'}
    />
  )
})