import React from 'react'

import { CustomText } from './CustomText'
import { textColor } from '../../Colors'
import { ICustomText } from '../../Interfaces'

export const SubHeadingComponent = (props: ICustomText) => {

  const {  fontSize = 14, color = textColor.lightGrey, fontWeight = '400', ...restProps  } = props
  return (
    <CustomText
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      {...restProps}
    />
  )
}