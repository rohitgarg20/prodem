import React, { useCallback, useState } from 'react'

import { get } from 'lodash'
import { View } from 'react-native'

import { styles } from './styles'
import { API_STATUS_CODE } from '../../common/ApiConstant'
import { textColor } from '../../common/Colors'
import { ButtonComponent, CustomText, SpacerComponent, TextInputComponent } from '../../common/components'
import { CrossButtonComponent } from '../../common/components/screens'
import { FormTopSectionComponent } from '../../common/components/screens/form/FormTopSectionComponent'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { ScreenNames } from '../../common/Screens'
import { checkUserExistanceApi } from '../../redux/CheckUserExistance/UserExistanceApis'
import { navigateSimple } from '../../utils/navigation-utils'
import { LanguagesDropdownComponent } from '../Home/LanguagesDropDownComponent'

export const CheckUserExistanceScreen = ({ navigation }) => {

  const [emailId, updateEmailId] = useState('')

  const onChangeEmailId = useCallback((userIp: string) => {
    updateEmailId(userIp)
  }, [])

  const renderEmailTextField = () => {
    return (
      <TextInputComponent
        label={'CHECK_USER_EXISTANCE_SCREEN.Email'}
        value={emailId}
        onChangeText={onChangeEmailId}
      />
    )
  }

  const navigateToTermsAndCondition = useCallback(() => {
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.TERMS_OF_CONDITION_SCREEN,
      params: {
        url: 'pages/terms-and-conditions',
        headerTitle: 'MultiLanguageString.TERMS_CONDITION'
      }
    })
  }, [navigation])

  const navigateToPrivacyPolicy = useCallback(() => {
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.TERMS_OF_CONDITION_SCREEN,
      params: {
        url: 'pages/privacy-policy',
        headerTitle: 'MultiLanguageString.PRIVACY_POLICY'
      }
    })
  }, [navigation])

  const renderTermsAndConditionButtton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={'CHECK_USER_EXISTANCE_SCREEN.TermsAndCondition'}
        onPress={navigateToTermsAndCondition}
        buttonContainerStyle={styles.simpleBtnBorder}
      />
    )
  }

  const renderPrivacyPolicyButtton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={'CHECK_USER_EXISTANCE_SCREEN.PrivacyPolicy'}
        onPress={navigateToPrivacyPolicy}
        buttonContainerStyle={styles.simpleBtnBorder}
      />
    )
  }

  const renderButtonsRow = () => {
    return (
      <View style={styles.buttonRowContainer}>
        {renderTermsAndConditionButtton()}
        <SpacerComponent style={styles.buttonSeperator} />
        {renderPrivacyPolicyButtton()}
      </View>
    )
  }

  const checkUserExistance = useCallback(() => {

    checkUserExistanceApi(emailId).then((response) => {
      log('responseresponse', response)
      const statusCode = get(response, 'code')
      if (statusCode === API_STATUS_CODE.SUCCESS) {
        navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.LOGIN_SCREEN })
      } else {
        navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.SIGNUP_SCREEN })
      }
    }).catch((err) => {
      log('errerr', err)
    })
  }, [emailId, navigation])


  const onCrossBtnClicked = useCallback(() => {
    navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.LOGIN_SCREEN })
  }, [navigation])

  const renderTopContainer = () => {
    return (
      <View>
        <CrossButtonComponent
          onPressIcon={onCrossBtnClicked}
          showLanguageDropDown
        />
        <SpacerComponent style={styles.titleSpacing} />
        <FormTopSectionComponent subHeading={'CHECK_USER_EXISTANCE_SCREEN.SubHeading'} />
        <SpacerComponent style={styles.formSpacing} />
        {renderEmailTextField()}
        {renderButtonsRow()}
      </View>
    )
  }

  const navigateToSignupScreen = useCallback(() => {
    navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.SIGNUP_SCREEN })
  }, [navigation])

  const renderBottomContainer = () => {
    return (
      <View>
        <ButtonComponent
          buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
          text={'BUTTONS.NextBtnText'}
          onPress={checkUserExistance}
        />
        <View style={styles.registerContainer}>
          <CustomText text={'CHECK_USER_EXISTANCE_SCREEN.SignupBtn'}
            fontSize={16}
            fontWeight='400'
            color={textColor.white}
            textStyle={styles.registerLabel}
          />
          <ButtonComponent
            buttonType={ButtonType.SIMPLE_BTN}
            text={'BUTTONS.RegisterBtn'}
            onPress={navigateToSignupScreen}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderTopContainer()}
      {renderBottomContainer()}
    </View>
  )
}