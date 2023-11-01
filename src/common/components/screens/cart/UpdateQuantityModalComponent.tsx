import React, { useCallback, useState } from 'react'

import { StyleSheet, View } from 'react-native'

import { scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { SCREEN_WIDTH } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
import { BUTTONS, CART_COMPONENT } from '../../../strings'
import { ButtonComponent, CustomText, TextInputComponent } from '../../generic'
import { genericDrawerController } from '../../ModalComponent/GenericModalController'

const styles = StyleSheet.create({
  quantityModalContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(25),
    backgroundColor: colors.white,
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 10
  },
  quantityInputField: {
    borderWidth: 0,
    paddingTop: 10
  },
  buttonComponent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 15
  },
  textInput: {
    paddingLeft: 0
  },
  disabledBtn: {
    opacity: 0.75
  },
  activeBtn: {
    opacity: 1
  }
})

const { ENTER_QUANTITY, PLACEHOLDER } = CART_COMPONENT
const { CANCEL, APPLY } = BUTTONS

export const UpdateQuantityModalComponent = ({
  updateQuantityOnPress, productId
}: { updateQuantityOnPress: (productId: number, qty: number) => void
  productId: number
}) => {

  const [updatedQty, setProductQuantity] = useState('')


  const dismissQuantityModal = () => {
    genericDrawerController.closeGenericDrawerModal()
  }


  const updateProductQuantity = () => {
    updateQuantityOnPress(productId, parseInt(updatedQty, 10))
  }

  const renderButtonsComponent = () => {
    const isApplyBtnDisabled = !updatedQty
    return (
      <View style = {styles.buttonComponent}>
        <ButtonComponent
          text={CANCEL}
          buttonType={ButtonType.SIMPLE_BTN}
          onPress={dismissQuantityModal}
        />
        <ButtonComponent
          text={APPLY}
          buttonType={ButtonType.SIMPLE_BTN}
          onPress={updateProductQuantity}
          disabled={isApplyBtnDisabled}
          buttonContainerStyle = {isApplyBtnDisabled ? styles.disabledBtn : styles.activeBtn}
        />
      </View>
    )
  }

  const onChangeQunatity = useCallback((updatedValue) => {
    log('onChangeQunatity', updatedValue)
    setProductQuantity(updatedValue)
  }, [])

  const quantityModalComponent = () => {
    return (
      <View style={styles.quantityModalContainer}>
        <CustomText
          text={ENTER_QUANTITY}
          fontSize={16}
          color={textColor.cinder}
        />
        <TextInputComponent
          textInputType='roundedCorners'
          textContainerStyle = {styles.quantityInputField}
          placeholder={PLACEHOLDER}
          style = {styles.textInput}
          value={updatedQty}
          onChangeText={onChangeQunatity}
        />
        {renderButtonsComponent()}
      </View>
    )
  }

  return (
    <>
      {quantityModalComponent()}
    </>
  )
}