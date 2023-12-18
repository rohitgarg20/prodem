import { StyleSheet, View } from 'react-native'

import { CustomText } from './CustomText'
import { IconWrapper } from './IconWrapper'
import { scale } from '../../../utils/scaling'
import { colors, textColor } from '../../Colors'
import { icons } from '../../Icons'

const EmptyScreenComponent = ({
  icon = icons.EMPTY_SCREEN_ICON,
  emptyStateMsg = 'MultiLanguageString.DEFAULT_NO_DATA',
  containerStyle = {}
}) => {
  return (
    <View style={[styles.emptyViewContainer, containerStyle]}>
      <IconWrapper
        iconHeight={scale(200)}
        iconWidth={scale(200)}
        iconSource={icon}
      />
      <CustomText
        fontSize={20}
        color={textColor.primary}
        text={emptyStateMsg}
        fontWeight="700"
        textStyle={styles.emptyMessageLabel}
      />

    </View>
  )
}
export default EmptyScreenComponent

const styles = StyleSheet.create({
  emptyViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  emptyMessageLabel: {
    maxWidth: 250,
    textAlign: 'center',
    paddingTop: 10
  }
})