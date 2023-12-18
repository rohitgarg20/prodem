import React from 'react'

import { View } from 'react-native'
import { StyleSheet } from 'react-native'

import { LanguagesDropdownComponent } from '../../../screens/Home/LanguagesDropDownComponent'
import { colors } from '../../Colors'
import { icons } from '../../Icons'
import { IconButtonWrapperComponent } from '../generic'

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  languageContainer: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.primary
  }
})

export const CrossButtonComponent = ({
  onPressIcon, showCrossButton = true, showLanguageDropDown = false
}: { onPressIcon?: () => void; showCrossButton?: boolean; showLanguageDropDown?: boolean }) => {

  return (
    <View style={styles.rowContainer}>
      {showCrossButton && <IconButtonWrapperComponent
        iconSource={icons.CROSS_ICON}
        iconWidth={30}
        iconHeight={30}
        onPressIcon={onPressIcon}
      />
      }
      {showLanguageDropDown && <View style ={styles.languageContainer}>
        <LanguagesDropdownComponent />
      </View>
      }
    </View>
  )
}