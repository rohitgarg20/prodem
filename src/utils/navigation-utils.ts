import { CommonActions } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import { log } from '../common/config/log'
import { StackNames } from '../common/Screens'

let _navigator: any = null
let _parentStackName: string = ''

interface INavigation {
  screenToNavigate: string
  parentStackName?: string
  params?: any
  navigator?: any
  usePushNavigator?: boolean
}

export const setNavigator = (navigator) => {
  _navigator = navigator
  log('navigatornavigator', navigator)
}

export const setParentStackName = (parentStackName) => {
  _parentStackName = parentStackName
}

export const pushMainNavigator = (navigationParams: INavigation) => {
  const { parentStackName, screenToNavigate, params } = navigationParams
  if(parentStackName && _navigator) {
    _navigator.dispatch(CommonActions.navigate(parentStackName, {
      screen: screenToNavigate, params: params
    }))
  } else {
    _navigator.dispatch(CommonActions.navigate( screenToNavigate, params ))
  }
}

export const navigateSimple = (navigationParams: INavigation) => {
  const { screenToNavigate, params, parentStackName, navigator, usePushNavigator = false } = navigationParams
  log('navigateSimple', screenToNavigate, navigator, parentStackName)
  if(!isEmpty(navigator)) {
    if(parentStackName || _parentStackName) {
      navigator.navigate((parentStackName || _parentStackName), { screen: screenToNavigate, params })
    } else {
      navigator.navigate(screenToNavigate, params)
    }
    return
  }

  if(_navigator) {
    if(parentStackName) {
      _navigator.navigate(parentStackName, { screen: screenToNavigate, params })
    } else {
      _navigator.navigate(screenToNavigate, params)
    }
    return
  }

  if(usePushNavigator) {
    pushMainNavigator(navigationParams)
  }

}

export const replaceNavigation = (navigationParams: INavigation) => {
  const { screenToNavigate, params, parentStackName, navigator, usePushNavigator = false } = navigationParams
  log('navigateSimple', screenToNavigate, navigator, parentStackName)
  if(!isEmpty(navigator)) {
    if(parentStackName) {
      navigator.replace(parentStackName, { screen: screenToNavigate, params })
    } else {
      navigator.replace(screenToNavigate, params)
    }
    return
  }

  // if(_navigator) {
  //   log('inside if is called', _navigator, _parentStackName)
  //   if(parentStackName || _parentStackName) {
  //     _navigator.replace((parentStackName || _parentStackName), { screen: screenToNavigate, params })
  //   } else {
  //     _navigator.replace(screenToNavigate, params)
  //   }
  //   return
  // }

  if(usePushNavigator) {
    pushMainNavigator(navigationParams)
  }

}

export const goBack = (navigator: any = undefined) => {
  if(navigator) {
    navigator.goBack()
  } else {
    _navigator.goBack()
  }
}

export const logoutStack = () => {
  _navigator.resetRoot({
    index: 0,
    routes: [{ name: StackNames.LOGIN_STACK }]
  })
}

export const resetStackData = () => {
  _navigator = null
  _parentStackName = ''
}

