
import { ButtonComponent, CustomText, TextInputComponent } from "../../../common/components"
import { textColor } from "../../../common/Colors"
import { HeaderComponent } from "../../../common/components/screens"
import { EDIT_NAME_PROFILE_SCREEN } from "../../../common/strings"
import styles from './styles'
import { ScrollView } from "react-native-gesture-handler"
import { useRef, useState } from "react"
import { useAppSelector } from "../../../store/DataStore"
import { getUserNameSelector } from "../../../redux/profile/ProfileSelector"
import { View } from "react-native"
import { ButtonType } from "../../../common/Enumerators"
import { updateUserNameApi, updateUserPasswordApi } from "../../../redux/profile/ProfileApi"
import { showAndroidToastMessage } from "../../../common/Toast"
import { NAME_MIN_LENGTH_INVALID, PASSWORD_EMPTY } from "../../../common/ErrorMessages"

const {
  HEADER_TITLE, EDIT_PERSONAL_INFO_HEADER, NAME_LABEL, SAVE_BUTTON, CHANGE_PASSWORD_HEADER,
  CHANGE_PASSWORD_SUBHEADER, CURRENT_PASSWORD_LABEL, NEW_PASSWORD_LABEL, RESET_BUTTON } = EDIT_NAME_PROFILE_SCREEN

const TextBox = ({
  label,
  value,
  onChangeText,
  defaultValue = ''
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
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      textInputType='roundedCorners'
      style={styles.textInputContainer}
    />
  </View>
}

const ProfileNameEditScreen = () => {
  const defaultUserName = useAppSelector(getUserNameSelector)
  const [userName, updateUserName] = useState(defaultUserName)
  const [oldPassword, updateOldPassword] = useState('')
  const [newPassword, updateNewPassword] = useState('')

  const onChangeUserName = (value) => {
    updateUserName(value)
  }

  const onChangeOldPassword = (value) => {
    updateOldPassword(value)
  }

  const onChangeNewPassword = (value) => {
    updateNewPassword(value)
  }

  const onSaveUserNamePressed = () => {
    if(userName) {
      updateUserNameApi(userName)
    } else {
      showAndroidToastMessage(NAME_MIN_LENGTH_INVALID)
    }
  }

  const onChangePasswordPressed = () => {
    if(oldPassword && newPassword) {
      updateUserPasswordApi({
        currentPassword: oldPassword,
        newPassword: newPassword
      })
    } else {
      showAndroidToastMessage(PASSWORD_EMPTY)
    }
   
  }

  const ActionButton = ({
    text,
    onActionPressed
  }) => {
    return <ButtonComponent
      buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
      text={text}
      onPress={onActionPressed}
      buttonContainerStyle={styles.buttonContainer}
    />
  }

  const Header = ({
    header,
    subHeader = ''
  }) => {
    return <View style={{ paddingBottom: 20 }}>
      <CustomText
        text={header}
        fontSize={18}
        color={textColor.black}
        fontWeight="700"
        textStyle={{ textAlign: 'center', textTransform: 'uppercase' }}
      />
      {subHeader ? <CustomText
        text={subHeader}
        fontSize={14}
        color={textColor.stormGrey}
        textStyle={{ textAlign: 'center' }}
      /> : null}
    </View>
  }




  return <View style={styles.container}>
    <HeaderComponent
      showBackBtn
      title={HEADER_TITLE}
    />
    <ScrollView style={styles.mainContainer}>
      {/** Info Section */}
      <Header header={EDIT_PERSONAL_INFO_HEADER} />
      <TextBox label={NAME_LABEL} value={userName} onChangeText={onChangeUserName} />
      <ActionButton text={SAVE_BUTTON} onActionPressed={onSaveUserNamePressed} />

      {/** Change Password Section */}
      <View style={styles.headerSpacing} />
      <Header header={CHANGE_PASSWORD_HEADER} subHeader={CHANGE_PASSWORD_SUBHEADER} />
      <TextBox label={CURRENT_PASSWORD_LABEL} value={oldPassword} onChangeText={onChangeOldPassword} />
      <TextBox label={NEW_PASSWORD_LABEL} value={newPassword} onChangeText={onChangeNewPassword} />
      <ActionButton text={RESET_BUTTON} onActionPressed={onChangePasswordPressed} />
    </ScrollView>
  </View>

}

export default ProfileNameEditScreen

