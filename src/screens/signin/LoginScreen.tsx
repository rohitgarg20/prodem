import React, { useCallback, useEffect } from 'react'

import { get, map } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { loginStyles as styles } from './styles'
import { ButtonComponent, SpacerComponent, TextInputComponent } from '../../common/components'
import { KeyboardHandledScrollView } from '../../common/components/generic/KeyboardHandledScrollView'
import { FormTopSectionComponent } from '../../common/components/screens/form/FormTopSectionComponent'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IUserFormItem } from '../../common/Interfaces'
import { ScreenNames, StackNames } from '../../common/Screens'
import { BUTTONS, LOGIN_SCREEN } from '../../common/strings'
import { showAndroidToastMessage } from '../../common/Toast'
import { onLoginUserReducer } from '../../redux/login/LoginApi'
import { onChangeUserInput, resetFormDataReducer } from '../../redux/login/LoginSlice'
import { Dispatch, RootState } from '../../store/DataStore'
import { navigateSimple, replaceNavigation } from '../../utils/navigation-utils'
import { setAuthToken } from '../../utils/auth-utils'


const { SubHeading, ForgetPassword } = LOGIN_SCREEN
const { Login } = BUTTONS

export const LoginScreen = ({ navigation }) => {
  log('LoginScreenLoginScreen is called')
  const dispatch: Dispatch = useDispatch()
  // // log('LoginScreenLoginScreen is called')
  const loginForm = useSelector((state: RootState) => state.loginReducer)

  const formData = loginForm.formData

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

  const onLoginBtnClicked = useCallback(() => {
    onLoginUserReducer(formData)!.then((apiResponse: any) => {
      const { message, data } =  apiResponse || {}
      showAndroidToastMessage(message)
      if(data?.token) {
        setAuthToken(data?.token)
        replaceNavigation({
          navigator: navigation,
          screenToNavigate: StackNames.PARENT_STACK,
        })
      } else {
        navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.EMAIL_VERIFICATION, params: { emailId: formData?.userName?.inputValue } })
      }
    }).catch(err => {
      showAndroidToastMessage(get(err, 'message', SOMETHING_WENT_WRONG))
    })
  }, [formData, navigation])

  const onForgetPswdBtnClicked = useCallback(() => {
    navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.FORGET_PASSWORD })
  }, [navigation])

  const renderLoginBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={Login}
        onPress={onLoginBtnClicked}
      />
    )
  }

  const renderForgetPassword = () => {
    return (
      <View style={styles.loginContainer}>
        <ButtonComponent
          buttonType={ButtonType.SIMPLE_BTN}
          text={ForgetPassword}
          onPress={onForgetPswdBtnClicked}
        />
      </View>
    )
  }

  return (
    <KeyboardHandledScrollView style={styles.mainContainer}
      contentContainerStyle = {styles.contentContainer}
      automaticallyAdjustKeyboardInsets={true}
    >
      <FormTopSectionComponent subHeading={SubHeading} />
      <SpacerComponent style={styles.formTopSeperator} />
      {renderFormComponent()}
      <SpacerComponent style={styles.formBottomSeperator} />
      {renderLoginBtn()}
      {renderForgetPassword()}
    </KeyboardHandledScrollView>
  )
}