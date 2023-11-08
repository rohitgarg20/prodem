// import MMKV from 'react-native-mmkv'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'


export const reactotron = Reactotron
  .configure({
    name: 'Prodem'
  })
  .use(reactotronRedux())
  // .setAsyncStorageHandler(MMKV)
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: false, // there are more options to editor
    errors: {veto: () => false}, // or turn it off with false
    overlay: false // just turning off overlay
  })
  .connect()

