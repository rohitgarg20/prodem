/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react'

import { View } from 'react-native'
import MultiSelect from 'react-native-multiple-select'

import { colors } from '../../common/Colors'
import { IconWrapper } from '../../common/components'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IDropDownItem } from '../../common/Interfaces'
import { tString } from '../../utils/app-utils'
import { log } from '../../common/config/log'


export const VehiclesMultiSelectDropDown = ({
  dropdownData, updateSelectedVehicleData, initialSelectedData
}) => {

  const [selectedItems, setSelectedItems] = useState(initialSelectedData)

  const updateSelectedItems = (newSelectedItems) => {
    setSelectedItems(newSelectedItems)
  }

  const submitBtnHandler = useCallback(() => {
    if(updateSelectedVehicleData) {
      updateSelectedVehicleData(selectedItems)
    }
  }, [updateSelectedVehicleData, selectedItems])

  const renderSearchIcon = () => {
    return (
      <IconWrapper
        iconSource={icons.SEARCH_ICON}
        iconHeight={15}
        iconWidth={15}
        tintColor="#CCC"
      />
    )
  }

  const renderVehiclesMultiSelectComponent = useCallback(() => {
    const vehiclesDropDown = dropdownData as IDropDownItem[]
    log('vehiclesDropDownvehiclesDropDown', vehiclesDropDown)
    return <>
      <MultiSelect
        hideTags={false}
        items={vehiclesDropDown}
        uniqueKey="id"
        onSelectedItemsChange={updateSelectedItems}
        selectedItems={selectedItems}
        selectText={tString('MultiLanguageString.VEHILCES')}
        searchInputPlaceholderText={tString('MultiLanguageString.SEARCH_VEHICLES')}
        onChangeInput={ (text)=> console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor={colors.primary}
        tagTextColor={colors.primary}
        selectedItemTextColor={colors.primary}
        selectedItemIconColor={colors.transparent}
        itemTextColor="#000"
        displayKey={'name'}
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor={colors.primary}
        submitButtonText={tString('MultiLanguageString.SUBMIT')}
        styleItemsContainer = {{
          maxHeight: SCREEN_HEIGHT * 0.8
        }}
        searchIcon={renderSearchIcon()}
        hideDropdown={true}
        styleIndicator={{ backgroundColor: colors.transparent }}
        crossIcon={icons.CROSS_ICON}
        submitBtnHandler={submitBtnHandler}
        // hideSubmitButton
      />
    </>
  }, [selectedItems, dropdownData, submitBtnHandler])

  return (
    <View style={{ width: SCREEN_WIDTH * 0.9, maxHeight: SCREEN_HEIGHT * 0.9 }}>
      {renderVehiclesMultiSelectComponent()}
    </View>
  )
}