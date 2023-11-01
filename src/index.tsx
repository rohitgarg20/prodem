import React, { Component } from 'react'

import { Provider } from 'react-redux'

import { CustomText } from './common/components'
import { dataStore } from './store/DataStore'

export class App extends Component {

  render(): React.ReactNode {
    return (
      <Provider store={dataStore} >
        <CustomText text='djdnjfn'/>
      </Provider>
    )
  }
}