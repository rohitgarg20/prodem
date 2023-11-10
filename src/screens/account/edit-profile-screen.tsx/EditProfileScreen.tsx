import React, { memo, useCallback } from 'react'

import { FlatList, Pressable, View } from 'react-native'

import { FIELD_TYPE } from './EditProfileConstant'
import useNewInsuranceTrackScreenViewController from './EditProfileScreenController'
import { styles } from './styles'
import { colors, textColor } from '../../../common/Colors'
import { CenterModalPopup, CustomText, LabelWithArrowComponent, TextInputComponent } from '../../../common/components'
import RadioButtonComponent from '../../../common/components/generic/RadioButtonComponent'
import { HeaderComponent } from '../../../common/components/screens'
import { EDIT_PROFILE_SCREEN } from '../../../common/strings'
import { genericDrawerController } from '../../../common/components/ModalComponent/GenericModalController'
import { centerModal } from '../../../common/GenericStyle'
import { DropDownListComponent } from '../../../common/components/screens/dropdown/DropDownListComponent'

const { HEADER_TITLE } = EDIT_PROFILE_SCREEN


const TextFieldBox = ({
  actionName,
  label,
  value,
  onChangeText,
  defaultValue = '',
  errorMessage,
  multiline,
  ...props
}) => {
  return <View>
    <CustomText
      text={label}
      fontSize={16}
      color={textColor.black}
      fontWeight='400'
      textStyle={styles.labelText}
    />
    <TextInputComponent
      value={value?.toString() || ''}
      defaultValue={defaultValue}
      onChangeText={(value) => {
        onChangeText(actionName, value)
      }}
      textInputType='roundedCorners'
      multiline={multiline}
      style={[styles.textInputContainer, multiline ? styles.textInputMultiLine : {}]}
      {...props}
    />
    <CustomText
      text={errorMessage}
      fontSize={12}
      color={colors.error}
    />
  </View>
}

const DropDownBox = ({
item,
updateDropDownValue
} : {
  item: IStateElement,
  updateDropDownValue: (actionName: any, value: string) => void
}) => {

  const renderDropdownListComponent = useCallback((dropdownData, fieldKey) => {
    return (
      <DropDownListComponent
        dropdownList={dropdownData}
        onPressDropDownItem={updateDropDownValue}
        fieldKey={fieldKey}
      />
    )
  }, [updateDropDownValue])

  const renderCenterDropDown = useCallback((dropdownData, fieldKey) => {
    return (
      <CenterModalPopup
        innerContent={() => renderDropdownListComponent(dropdownData, fieldKey)}
      />
    )
  }, [renderDropdownListComponent])

  const renderDropDownComponent = useCallback((dropdownData, fieldKey) => {
    genericDrawerController.showGenericDrawerModal({
      renderingComponent: () => renderCenterDropDown(dropdownData, fieldKey),
      closeDrawerOnOutsideTouch: false,
      modalPositionStyling: centerModal
    })
  }, [renderCenterDropDown])

  const showDropDownMenu = useCallback((fieldKey, dropdownData) => {
    renderDropDownComponent(dropdownData, fieldKey)
    genericDrawerController.openGenericDrawerModal()
  }, [renderDropDownComponent])

  const renderTitleComponent = useCallback((title: string) => {
    return (
      <CustomText
        text={title}
        fontSize={16}
        fontWeight='400'
        color={textColor.midnightMoss}
        textStyle={styles.titleSeperator}
      />
    )
  }, [])
  const selectedValue = item?.optionList?.find(option => option.id == item.value)
  return   <View>
  {renderTitleComponent(item?.label)}
  <LabelWithArrowComponent
    defaultValue = {item?.defaultValue?.toString()  || ''}
    selectedDropDownItem = {selectedValue}
    onPress={showDropDownMenu}
    dropdownData={item?.optionList}
    dropDownKey={item?.actionName}
    fontWeight='400'
  />
</View>
}

const NewInsuranceTrackScreen = () => {
  const { dataList, updateTextValue,
    updateRadioButtonValue, onSubmit, updateDropDownValue } =
    useNewInsuranceTrackScreenViewController()

  /**
   *
   * @returns login button ui
   */
  const SubmitButton = () => {
    return (
      <Pressable
        onPress={onSubmit}
        style={styles.loginBtnElementWrapper}
      >
        <CustomText
          text={'Submit'}
          color={colors.white}

        />
      </Pressable>
    )
  }

  const renderTextBoxItem = ({ item }: { item: IStateElement }) => {
    return (
      <TextFieldBox
        value={item?.value + ''}
        errorMessage={item?.error + ''}
        label={item.label}
        actionName={item.actionName}
        defaultValue={item?.defaultValue + ''}
        onChangeText={updateTextValue}
        multiline={item?.multiline}
      />
    )
  }

  const renderRadioButton = ({ item }: { item: IStateElement }) => {
    return  <RadioButtonComponent
      label={item?.label}
      optionList={item?.optionList || []}
      selectedKey={item?.value?.toString()}
      onValueChanged={(key) => updateRadioButtonValue(item.actionName, key)}
    />
  }



  const renderDropDown = ({ item }: { item: IStateElement }) => {
   return <DropDownBox item={item} updateDropDownValue={updateDropDownValue}/>
  }


  const renderItem = ({ item }: { item: IStateElement }) => {
    return item.fieldType === FIELD_TYPE.TEXTBOX
      ? renderTextBoxItem({ item }) : 
      item.fieldType === FIELD_TYPE.DROP_DOWN ? renderDropDown({ item})
      : renderRadioButton({ item })
  }


  return (
    <View style={styles.container}>
      <HeaderComponent
        showBackBtn
        title={HEADER_TITLE}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={dataList}
          renderItem={renderItem}
          style={styles.component}
          contentContainerStyle={styles.scrollViewContainerStyle}
          contentInsetAdjustmentBehavior="scrollableAxes"
          showsVerticalScrollIndicator={false}
        />
        <SubmitButton />
      </View>
    </View>
  )
}

export default NewInsuranceTrackScreen