import React from 'react'

import { icons } from '../../Icons'
import { IconButtonWrapperComponent } from '../generic'

export const CrossButtonComponent = ({  onPressIcon }: { onPressIcon: () => void }) => {

  return (
    <IconButtonWrapperComponent
      iconSource={icons.CROSS_ICON}
      iconWidth={30}
      iconHeight={30}
      onPressIcon={onPressIcon}
    />
  )
}