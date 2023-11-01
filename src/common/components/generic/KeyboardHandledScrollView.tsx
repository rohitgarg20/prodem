import React, { Component } from 'react'

import { ScrollView, ScrollViewProps } from 'react-native'

interface Props extends ScrollViewProps {
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled'
  children?: any
}

interface State {
}

const DEFAULT_PROPS = {
  showsVerticalScrollIndicator : false,
  enableOnAndroid : true
}

class KeyboardHandledScrollView extends Component<Props, State> {

  constructor(props: Props, state: State) {
    super(props, state)
  }

  render() {
    const { children, keyboardShouldPersistTaps } = this.props
    const finalProps =  {...DEFAULT_PROPS , ...this.props}
    const persistTaps = keyboardShouldPersistTaps ? keyboardShouldPersistTaps : 'handled'
    return <ScrollView
      {...finalProps}
      keyboardShouldPersistTaps = {persistTaps}
    >
      {children}
    </ScrollView>
  }
}

export { KeyboardHandledScrollView }