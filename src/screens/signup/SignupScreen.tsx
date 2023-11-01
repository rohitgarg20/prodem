import React, { useCallback, useEffect } from 'react'

import { get, map } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { signupStyles as styles } from './styles'
import { textColor } from '../../common/Colors'
import { ButtonComponent, CustomText, SpacerComponent, TextInputComponent } from '../../common/components'
import { KeyboardHandledScrollView } from '../../common/components/generic/KeyboardHandledScrollView'
import { FormTopSectionComponent } from '../../common/components/screens/form/FormTopSectionComponent'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { IUserFormItem } from '../../common/Interfaces'
import { ScreenNames } from '../../common/Screens'
import { BUTTONS, SIGNUP_SCREEN } from '../../common/strings'
import { isSignUpFormValid, onSignupUserReducer } from '../../redux/Signup/SignupApi'
import { onChangeUserInput, resetFormDataReducer } from '../../redux/Signup/SignupSlice'
import { Dispatch, RootState } from '../../store/DataStore'
import { navigateSimple } from '../../utils/navigation-utils'


const { SubHeading, AlreadyAccount } = SIGNUP_SCREEN
const { RegisterBtn, Login } = BUTTONS

export const SignUpScreen = ({ navigation }) => {

  const dispatch: Dispatch = useDispatch()
  const signupForm = useSelector((state: RootState) => state.signupReducer)

  const formData = signupForm.formData

  useEffect(() => {
    return () => {
      log('SignUpScreen dispatch is called')
      dispatch({ type: resetFormDataReducer.type })
    }
  }, [dispatch])


  const onChangeUserTextInput = (fieldKey, value) => {
    dispatch({ type: onChangeUserInput.type, payload: { textFieldKey: fieldKey, inputValue: value  } })
  }


  const renderTextField = ({
    label, inputValue, editable = true, secureTextEntry = false, key
  }) => {
    return (
      <TextInputComponent
        label={label}
        value={inputValue}
        editable={editable}
        onChangeUserInput={onChangeUserTextInput}
        secureTextEntry={secureTextEntry}
        textFieldKey={key}
      />
    )
  }

  const renderFormItem = (formKey) => {
    const formItem: IUserFormItem = formData[formKey]
    const { label, inputValue, editable = true, secureTextEntry = false, key } = formItem
    return renderTextField({ label, inputValue, editable, secureTextEntry, key })
  }

  const renderFormComponent = () => {
    return (
      <View style={styles.formContainer}>
        {
          map(Object.keys(formData), renderFormItem)
        }
      </View>
    )
  }

  const onRegisterBtnClicked = useCallback(() => {
    if (isSignUpFormValid(formData)) {
      onSignupUserReducer(formData).then((respData) => {
        log('respDatarespData', respData)
        navigateSimple({
          navigator: navigation,
          screenToNavigate: ScreenNames.EMAIL_VERIFICATION,
          params: {
            emailId: get(formData, 'email.inputValue', '')
          }
        })
      }).catch((err) => {
        log('errerrerr', err)
      })
    }
  }, [formData, navigation])

  const onLoginBtnClicked = useCallback(() => {
    navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.LOGIN_SCREEN })
  }, [navigation])

  const renderRegisterBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={RegisterBtn}
        onPress={onRegisterBtnClicked}
      />
    )
  }

  const renderAlreadyHaveAcnt = () => {
    return (
      <View style={styles.loginContainer}>
        <CustomText text={AlreadyAccount}
          fontSize={16}
          fontWeight='400'
          color={textColor.lightWhite}
          textStyle={styles.alreadyAccount}
        />
        <ButtonComponent
          buttonType={ButtonType.SIMPLE_BTN}
          text={Login}
          onPress={onLoginBtnClicked}
        />
      </View>
    )
  }

  return (
    <KeyboardHandledScrollView style={styles.mainContainer}
      contentContainerStyle = {styles.contentContainer}
    >
      <FormTopSectionComponent subHeading={SubHeading} />
      <SpacerComponent style={styles.formTopSeperator} />
      {renderFormComponent()}
      <SpacerComponent style={styles.formBottomSeperator} />
      {renderRegisterBtn()}
      {renderAlreadyHaveAcnt()}
    </KeyboardHandledScrollView>
  )
}