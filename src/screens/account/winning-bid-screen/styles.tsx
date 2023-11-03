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
    flex: 1
  },
  flatListContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginTop: 6  
  }
})

export default styles