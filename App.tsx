
import 'react-native-gesture-handler'
import React, { useEffect, useRef } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { map } from 'lodash'
import { LogBox, SafeAreaView, StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'

import { ScreenLoader } from './src/common/components/generic/ScreenLoader'
import { GenericDrawerComponent } from './src/common/components/ModalComponent/GenericDrawerComponent'
import { Router } from './src/navigator/Router'
import { store } from './src/store/DataStore'
import { resetNavigator, setNavigator } from './src/utils/navigation-utils'
import { colors } from './src/common/Colors'


function App(): JSX.Element {

  const drawerRef = useRef(null)


  const servicesContainer = [
    <ScreenLoader />,
    <GenericDrawerComponent ref = {drawerRef}/>
  ]

  useEffect(() => {
    LogBox.ignoreAllLogs(true)
    return () => {
      resetNavigator()
    }
  }, [])

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.lightOrange }} />
        <NavigationContainer ref={setNavigator}>
          <Router />
          {map(servicesContainer, (service) => <>{service}</>)}
        </NavigationContainer>
      </View>

    </Provider>
  )
}

export default App
