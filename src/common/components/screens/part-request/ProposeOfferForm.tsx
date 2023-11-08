import React, { useCallback } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { onChangeUserInputReducer, onSelectDropDowItemReducer } from '../../../../redux/part-request-detail/PartRequestDetailSlice'
import { RootState } from '../../../../store/DataStore'
import { verticalScale, scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { ProposeOfferFieldKeys } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
import { centerModal } from '../../../GenericStyle'
import { IDropDownItem, IFormField } from '../../../Interfaces'
import { BUTTONS, PART_REQUEST_SCREEN } from '../../../strings'
import { ButtonComponent, CenterModalPopup, CustomText, LabelWithArrowComponent, TextInputComponent } from '../../generic'
import { genericDrawerController } from '../../ModalComponent/GenericModalController'
import { DropDownListComponent } from '../dropdown/DropDownListComponent'
import { proposeNewOfferApiRequest } from '../../../../redux/part-request-detail/PartRequestDetailApi'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: verticalScale(10),
    elevation: 10,
    rowGap: 5,
    paddingHorizontal: scale(15)
  },
  formContainer: {

  },
  textInputField: {
    paddingVertical: scale(8)
  },
  titleSeperator: {
    paddingBottom: scale(5)
  },
  fieldSeperator: {
    paddingBottom: scale(10)
  },
  buttonSeperator: {
    paddingTop: 30
  },
  formTitle: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export const ProposeOfferFormComponent = () => {

  const dispatch = useDispatch()
  const proposeForm = useSelector((state: RootState) => state.partRequestDetailReducer.formData)
  const activePartRequestId = useSelector((state: RootState) => state.partRequestDetailReducer.activePartRequestId)

  const renderTitleComponent = useCallback((title: string) => {
    return (
      <CustomText
        text={title}
        fontSize={17}
        color={textColor.midnightMoss}
        textStyle={styles.titleSeperator}
      />
    )
  }, [])

  const onChangeUserInput = useCallback((fieldKey: string, value: string) => {
    dispatch({
      type: onChangeUserInputReducer.type, payload: {
        fieldKey,
        value
      }
    })
  }, [dispatch])

  const renderTextInputField = (fieldData: IFormField) => {
    const { inputValue, keyboardType, key, multiline  } = fieldData

    return (
      <TextInputComponent
        value={inputValue}
        keyboardType={keyboardType}
        multiline={multiline}
        textFieldKey={key}
        onChangeUserInput={onChangeUserInput}
        textInputType='roundedCorners'
        textContainerStyle = {styles.textInputField}
      />
    )
  }

  const renderInputTextContainer = (fieldData: IFormField) => {
    const { title  } = fieldData
    return (
      <View>
        {renderTitleComponent(title)}
        {renderTextInputField(fieldData)}
      </View>
    )
  }

  const onPressDropDownItem = useCallback((selectedDropdownItem: IDropDownItem, fieldKey: string) => {
    dispatch({
      type: onSelectDropDowItemReducer.type,
      payload: {
        selectedDropdownItem,
        fieldKey
      }
    })
    genericDrawerController.closeGenericDrawerModal()
  }, [dispatch])

  const renderDropdownListComponent = useCallback((dropdownData, fieldKey) => {
    return (
      <DropDownListComponent
        dropdownList={dropdownData}
        onPressDropDownItem={onPressDropDownItem}
        fieldKey={fieldKey}
      />
    )
  }, [onPressDropDownItem])

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


  const renderLabelWithArrowComponent = (fieldData: IFormField) => {
    const { title, dropdownData, defaultValue, selectedItem, key } = fieldData
    return (
      <View>
        {renderTitleComponent(title)}
        <LabelWithArrowComponent
          defaultValue = {defaultValue}
          selectedDropDownItem = {selectedItem}
          onPress={showDropDownMenu}
          dropdownData={dropdownData}
          dropDownKey={key}
        />
      </View>
    )
  }

  const renderPropseFormDeciderComponent = ({ item }) => {
    let viewToRender: any
    switch(item as ProposeOfferFieldKeys) {
      case ProposeOfferFieldKeys.TITILE:
      case ProposeOfferFieldKeys.PRICE:
      case ProposeOfferFieldKeys.PRIVATE_REMARKS:
        viewToRender =  renderInputTextContainer(proposeForm[item])
        break

      case ProposeOfferFieldKeys.UNIT:
      case ProposeOfferFieldKeys.CURRENCY:
      case ProposeOfferFieldKeys.OFFERED_BY:
      case ProposeOfferFieldKeys.AVAILABILITY:
        viewToRender = renderLabelWithArrowComponent(proposeForm[item])
        break
      default: {
        viewToRender = null
      }
    }

    return (
      <>
        {viewToRender}
      </>
    )

  }

  const renderItemSeperator = () => {
    return ( <View style={styles.fieldSeperator} /> )
  }


  const proposeOfferBtn = useCallback(() => {
    if(activePartRequestId) {
      proposeNewOfferApiRequest(proposeForm, activePartRequestId)
    }
  }, [proposeForm, activePartRequestId])

  const renderAddOfferButton = () => {
    return (
      <ButtonComponent
        text={BUTTONS.ADD_OFFER}
        onPress={proposeOfferBtn}
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      />
    )
  }

  const renderProposeOfferForm = () => {
    return (
      <FlatList
        data={Object.keys(proposeForm)}
        renderItem={renderPropseFormDeciderComponent}
        ItemSeparatorComponent={renderItemSeperator}
        removeClippedSubviews={false}
        ListFooterComponent={renderAddOfferButton}
        ListFooterComponentStyle={styles.buttonSeperator}
        keyboardShouldPersistTaps='handled'
      />
    )
  }

  const renderTitle = () => {
    return (
      <CustomText
        text={PART_REQUEST_SCREEN.PROPOSE_OFFER_FORM}
        fontSize={16}
        color={textColor.black}
        textStyle={styles.formTitle}
      />
    )
  }

  return (
    <View style={styles.cardContainer}>
      {renderTitle()}
      {renderProposeOfferForm()}
    </View>
  )

}