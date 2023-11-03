import { StyleSheet } from 'react-native'

import { colors } from '../../../common/Colors'
import { scale } from '../../../utils/scaling'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: scale(10),
    flexGrow: 1
  },
  infoCard: {
    borderRadius: 10,
    paddingHorizontal: scale(10),
    paddingBottom: scale(40),
    paddingTop: scale(10),
    marginTop: scale(10),
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: colors.fuscosGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
  },
  labelCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(20)
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.lightBlack,
    marginTop: 2
  },
  buttonContainer: {
    marginTop: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(30),
    alignItems: 'center'
  }
})

export default styles