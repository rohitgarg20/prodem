import React, { useCallback, useState } from 'react'

import { StyleSheet, View } from 'react-native'

import { scale } from '../../../../utils/scaling'
import { colors, textColor } from '../../../Colors'
import { log } from '../../../config/log'
import { SCREEN_WIDTH } from '../../../Constant'
import { ButtonType } from '../../../Enumerators'
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
          text={'BUTTONS.CANCEL'}
          buttonType={ButtonType.SIMPLE_BTN}
          onPress={dismissQuantityModal}
        />
        <ButtonComponent
          text={'BUTTONS.APPLY'}
          buttonType={ButtonType.SIMPLE_BTN}
          onPress={updateProductQuantity}
          disabled={isApplyBtnDisabled}
          buttonContainerStyle = {isApplyBtnDisabled ? styles.disabledBtn : styles.activeBtn}
        />
      </View>
    )
  }

  const onChangeQunatity = useCallback((updatedValue) => {
    setProductQuantity(updatedValue)
  }, [])

  const quantityModalComponent = () => {
    return (
      <View style={styles.quantityModalContainer}>
        <CustomText
          text={'CART_COMPONENT.ENTER_QUANTITY'}
          fontSize={16}
          color={textColor.cinder}
        />
        <TextInputComponent
          textInputType='roundedCorners'
          textContainerStyle = {styles.quantityInputField}
          placeholder={'CART_COMPONENT.PLACEHOLDER'}
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