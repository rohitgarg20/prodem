import React, { useCallback } from 'react'

import { map } from 'lodash'
import { StyleSheet, View } from 'react-native'

import { PICTURE_OPTIONS, SCREEN_HEIGHT } from '../../../Constant'
import { IOptionIconWithLabelData } from '../../../Interfaces'
import { OptionIconWithLabelComponent } from '../../generic/OptionsIconWithLabelComponent'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    top: 0, height: SCREEN_HEIGHT,
    backgroundColor: 'red'
  },
  imageSelectionOptions: {
    padding: 15,
    // columnGap: 20,
    rowGap: 10
  }
})


export const SelectPictureOptionListComponent = ({
  onPressItem
}: {
  onPressItem: (optionItem: IOptionIconWithLabelData) => void
}) => {
  const renderOptionItem = useCallback((optionItem: IOptionIconWithLabelData) => {
    const { icon, label, key } = optionItem
    return (
      <OptionIconWithLabelComponent
        icon={icon}
        label={label}
        itemKey={key}
        onPressItem={onPressItem}
      />
    )
  }, [onPressItem])

  const renderOptionsList = useCallback(() => {
    return (<View style={styles.imageSelectionOptions}>
      {
        map(PICTURE_OPTIONS, renderOptionItem)
      }
    </View>
    )
  }, [renderOptionItem])

  return (
    <>
      {renderOptionsList()}
    </>
  )
}