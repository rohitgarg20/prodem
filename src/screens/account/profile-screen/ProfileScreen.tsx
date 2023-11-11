import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import styles from './styles'
import { textColor } from '../../../common/Colors'
import { ButtonComponent, CustomText, IconWrapper } from '../../../common/components'
import { HeaderComponent } from '../../../common/components/screens'
import { ButtonType } from '../../../common/Enumerators'
import { icons } from '../../../common/Icons'
import { ScreenNames } from '../../../common/Screens'
import { PROFILE_SCREEN } from '../../../common/strings'
import { fetchUserProfileData } from '../../../redux/profile/ProfileApi'
import { getUserDetailsSelector } from '../../../redux/profile/ProfileSelector'
import { useAppSelector } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'
import { scale } from '../../../utils/scaling'


const { HEADER_TITLE, NAME_LABEL, ADDRESS_LABEL, BANK_LABEL, COMPANY_LABEL, LAST_LOGIN_LABEL, TAX_CODE_LABEL, EDIT_INFO } = PROFILE_SCREEN

const ProfileScreen = () => {
  const userDetails = useAppSelector(getUserDetailsSelector)
  const navigation = useNavigation()

  const onRefreshButtonPressed = () => {
    fetchUserProfileData(true)
  }

  const onEditInfoPressed = () => {
    navigateSimple({ screenToNavigate:  ScreenNames.EDIT_NAME_PROFILE_SCREEN, navigator:  navigation})
  }

  const LabelComponent = ({
    keyLabel,
    valueLabel
  }) => {

    return <View>
      <View style={styles.labelCard}>
        <CustomText
          text={keyLabel}
          fontSize={16}
          color={textColor.black}
          fontWeight={'800'}
        />
        <CustomText
          text={valueLabel}
          fontSize={14}
          color={textColor.cinder}
        />
      </View>
      <View style={styles.line} />

    </View>
  }
  return <View style={styles.container}>
    <HeaderComponent
      showBackBtn
      title={HEADER_TITLE}
      showRefreshButton
      onPressRefreshButton={onRefreshButtonPressed}
    />
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.infoCard}>
        <LabelComponent keyLabel={NAME_LABEL}
          valueLabel={userDetails?.p_user_name} />
        <LabelComponent keyLabel={ADDRESS_LABEL}
          valueLabel={userDetails?.p_user_address} />
        <LabelComponent keyLabel={BANK_LABEL}
          valueLabel={userDetails?.p_user_bank} />
        <LabelComponent keyLabel={COMPANY_LABEL}
          valueLabel={userDetails?.p_user_company_name} />
        <LabelComponent keyLabel={LAST_LOGIN_LABEL}
          valueLabel={userDetails?.p_user_lastlogin} />
        <LabelComponent keyLabel={TAX_CODE_LABEL}
          valueLabel={userDetails?.p_user_tax_registration_code} />
      </View>

      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        buttonContainerStyle={styles.buttonContainer}
        text={EDIT_INFO}
        onPress={onEditInfoPressed}
        rightContainer={<IconWrapper
          iconHeight={scale(20)}
          iconWidth={scale(20)}
          iconSource={icons.EDIT_ICON}
          tintColor={textColor.white}/>}
      />
    </ScrollView>
  </View>

}

export default ProfileScreen