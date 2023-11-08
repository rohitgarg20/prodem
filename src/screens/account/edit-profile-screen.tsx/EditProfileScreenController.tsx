import { useCallback, useEffect, useReducer } from 'react'

import { ToastAndroid } from 'react-native'

import { ACTION_NAME, FIELD_TYPE, INITIAL_DATA_STATE, USER_INFO_KEYS } from './EditProfileConstant'
import { log } from '../../../common/config/log'
import { updateUserDetailsApi } from '../../../redux/profile/ProfileApi'
import { getUserDetailsSelector } from '../../../redux/profile/ProfileSelector'
import { useAppSelector } from '../../../store/DataStore'

const initialState: State = {
  dataList: [...INITIAL_DATA_STATE]
}

const reducer = (currentState: State, action: Dispatcher) => {
  const itemIndex = currentState.dataList.findIndex(
    item => action.type === item.actionName,
  )

  if (itemIndex >= 0) {
    const itemSelected = currentState.dataList[itemIndex]
    itemSelected.value = action.payload
    itemSelected.error = ''
    currentState.dataList[itemIndex] = itemSelected
    return { ...currentState }
  } else if (action.type === ACTION_NAME.UPDATE_LIST) {
    currentState.dataList = action.payload
    return { ...currentState }
  }
  return currentState
}

const useNewInsuranceTrackScreenViewController = () => {
  const [state, updateState]: [State, (value: Dispatcher) => void] = useReducer(
    reducer,
    initialState,
  )

  const userDetails = useAppSelector(getUserDetailsSelector)


  useEffect(() => {
    if (userDetails) {
      const newState = state.dataList?.map((item) => {
        item.value = userDetails[item.key] || ''
        return item
      })

      log('newState  : ', newState)

      updateState({ type: ACTION_NAME.UPDATE_LIST, payload: newState })
    }
  }, [])


  const validateForm = () => {
    const dataList = state.dataList
    let hasIssue = false
    dataList.forEach(item => {
      // TODO: implement regex
      if (!item.isRequired || item.value.toString().length > 1) {

      } else {
        hasIssue = true
        item.error = 'Please enter valid value'
      }
    })

    if (hasIssue) {
      updateState({
        type: ACTION_NAME.UPDATE_LIST,
        payload: dataList
      })
    }
    return !hasIssue
  }

  const getUserDataForApi = () => {
    const data = {}
    state.dataList?.map((item) => {
      if (item.key === USER_INFO_KEYS.COUNTRY ||
        item.key === USER_INFO_KEYS.LEGAL_ENTITY ||
        item.key === USER_INFO_KEYS.CIF_WHICH ||
        item.key === USER_INFO_KEYS.PREFERENCES) {
        // do nothing as they are not supported yet
      } else {
        const keyName = item.key
        data[keyName] = item.value
      }
    })
    return data
  }

  const onSubmit = async () => {
    const isValidForm = validateForm()
    if (isValidForm) {
      const userDetails = getUserDataForApi()
      updateUserDetailsApi(userDetails)
    } else {
      ToastAndroid.show('Please Fill Form Correctly', ToastAndroid.SHORT)

    }
  }

  const updateTextValue = useCallback((actionName: any, value: string) => {
    updateState({
      type: actionName,
      payload: value
    })
  }, [])


  const updateRadioButtonValue = useCallback((actionName: any, value: string) => {
    updateState({
      type: actionName,
      payload: value
    })
  }, [])

  return {
    dataList: state.dataList,
    updateState,
    onSubmit,
    updateTextValue,
    updateRadioButtonValue
  }
}

export default useNewInsuranceTrackScreenViewController
