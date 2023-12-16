import React from 'react'

import { textColor } from '../../Colors'
import { ICustomText } from '../../Interfaces'
import { CustomText } from '../generic/CustomText'

export const HeadingComponent = (props: ICustomText) => {

  const {  fontSize = 21, color = textColor.white, fontWeight = '700', ...restProps  } = props
  return (
    <CustomText
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...restProps}
    />
  )
}