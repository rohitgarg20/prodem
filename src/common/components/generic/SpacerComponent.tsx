import React, { memo } from 'react'

import { StyleProp, View, ViewStyle } from 'react-native'

export const SpacerComponent = memo(({ style }: { style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={style} />
  )
})