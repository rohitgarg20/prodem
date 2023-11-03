import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'
import { scale } from '../../../utils/scaling'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  mainContainer: {
    paddingHorizontal: scale(10),
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: scale(10)
  },
  buttonContainer: {
    marginTop: scale(25),
    paddingHorizontal: scale(30),
    alignItems: 'center',
    height: scale(35)
  },
  labelText: {
    marginBottom: scale(4)
  },
  textInputContainer: {
    paddingVertical: scale(6)
  },
  headerSpacing: {
    marginTop: scale(30)
  }
})

export default styles