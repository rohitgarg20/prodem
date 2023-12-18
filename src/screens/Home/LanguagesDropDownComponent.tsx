import React, { useCallback, useEffect, useState } from 'react'

import { find } from 'lodash'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

import { dimissKeyboard } from '../../common/App-Utils'
import { colors, textColor } from '../../common/Colors'
import { CenterModalPopup, ButtonComponent } from '../../common/components'
import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { DropDownListComponent } from '../../common/components/screens/dropdown/DropDownListComponent'
import { log } from '../../common/config/log'
import { isIos, LanguagesAvailable } from '../../common/Constant'
import { ButtonType } from '../../common/Enumerators'
import { bottomModal } from '../../common/GenericStyle'
import { IDropDownItem } from '../../common/Interfaces'
import { setLanguage } from '../../utils/auth-utils'


const styles = StyleSheet.create({
  textSytle: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.lightBlack
  },
  sortByFilter: {
    alignItems: 'center'
  },
  dropdownContainer: {
    paddingVertical: 0
  },
  dropdownList: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
})


export const LanguagesDropdownComponent = () => {

  const {i18n } = useTranslation()
  const [selectedLng, updateLang] = useState('English $')

  useEffect(() => {
    const languageLabel = find(LanguagesAvailable, (item) => item.id === i18n.language)
    updateLang(languageLabel?.name?.toString() || 'English $')
  }, [i18n.language])

  const onPressDropDownItem = useCallback((selectedDropdownItem: IDropDownItem) => {
    genericDrawerController.closeGenericDrawerModal()
    log('selectedDropdownItem', selectedDropdownItem)
    const lng = selectedDropdownItem?.id?.toString() || 'en'
    i18n.changeLanguage(lng)
    setLanguage(lng)
    updateLang(selectedDropdownItem?.name?.toString() || 'English $')
  }, [i18n])

  const renderDropdownListComponent = useCallback(() => {
    return (
      <DropDownListComponent
        dropdownList={LanguagesAvailable}
        onPressDropDownItem={onPressDropDownItem}
        fieldKey={'languages'}
        flatlistContainer={styles.dropdownList}
        dropDownContainer={styles.dropdownContainer}
      />
    )
  }, [onPressDropDownItem])

  const renderCenterDropDown = useCallback(() => {
    return (
      <CenterModalPopup
        innerContent={() => renderDropdownListComponent()}
      />
    )
  }, [renderDropdownListComponent])


  const renderDropDownComponent = useCallback(() => {
    genericDrawerController.showGenericDrawerModal({
      renderingComponent: () => renderCenterDropDown(),
      closeDrawerOnOutsideTouch: isIos,
      modalPositionStyling: bottomModal
    })
  }, [renderCenterDropDown])


  const showDropDownMenu = useCallback(() => {
    renderDropDownComponent()
    genericDrawerController.openGenericDrawerModal()
    dimissKeyboard()
  }, [renderDropDownComponent])


  return (
    <ButtonComponent
      text={selectedLng}
      buttonType={ButtonType.SIMPLE_BTN}
      color={textColor.white}
      textStyle={styles.textSytle}
      onPress={showDropDownMenu}
      buttonContainerStyle={styles.sortByFilter}
    />
  )

}

