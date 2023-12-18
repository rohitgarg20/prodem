/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useCallback, useEffect, useReducer } from 'react'

import { Keyboard, ToastAndroid } from 'react-native'

import { ACTION_NAME, INITIAL_DATA_STATE, USER_INFO_KEYS } from './EditProfileConstant'
import { genericDrawerController } from '../../../common/components/ModalComponent/GenericModalController'
import { IDropDownItem } from '../../../common/Interfaces'
import { showAndroidToastMessage } from '../../../common/Toast'
import { fetchCityApi, fetchCountryApi, updateUserDetailsApi, updateUserNameApi } from '../../../redux/profile/ProfileApi'
import { getUserDetailsSelector } from '../../../redux/profile/ProfileSelector'
import { useAppSelector } from '../../../store/DataStore'
import { tString } from '../../../utils/app-utils'
import { goBack } from '../../../utils/navigation-utils'

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

const useNewInsuranceTrackScreenViewController = (navigation) => {
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

      updateState({ type: ACTION_NAME.UPDATE_LIST, payload: newState })
    }
  }, [])


  const fetchCountryCityData = async() => {
    Promise.all([fetchCountryApi(), fetchCityApi()]).then((responseArray: any[]) => {
      const cityList = responseArray?.[1]?.data?.cityList || []
      const countryList = responseArray[0]?.data?.country?.map(item => {
        return {
          id: item?.country_id || '',
          value: item?.country_name || ''
        }
      }) || []

      const newState = state.dataList?.map((item) => {
        if(item.key === USER_INFO_KEYS.COUNTRY) {
          return {
            ...item,
            optionList: countryList
          }
        }

        if(item.key === USER_INFO_KEYS.CITY) {
          return {
            ...item,
            optionList: cityList
          }
        }
        return item
      })
      updateState({ type: ACTION_NAME.UPDATE_LIST, payload: newState })
    })

  }

  useEffect(() => {
    fetchCountryCityData()
  }, [])


  const validateForm = () => {
    const dataList = state.dataList
    let hasIssue = false
    dataList.forEach(item => {
      // TODO: implement regex
      if (!item.isRequired || item.value.toString().length > 1) {

      } else {
        hasIssue = true
        item.error = tString('MultiLanguageString.PLEASE_ENTER_VALID')
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
      const keyName = item.key
      data[keyName] = item.value
    })
    return data
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    const isValidForm = validateForm()
    if (isValidForm) {
      const userDetailsForApi: any = getUserDataForApi()
      updateUserNameApi((userDetailsForApi?.p_user_name || ''))
      updateUserDetailsApi(userDetailsForApi).then(() => {
        showAndroidToastMessage('MultiLanguageString.PROFILE_UPDATED')
        goBack(navigation)
      }).catch(() => {
        showAndroidToastMessage('MultiLanguageString.ERROR_IN_UPDATING')
      })
    } else {
      showAndroidToastMessage('MultiLanguageString.PLEASE_FILL_CORRECTLY', ToastAndroid.SHORT)

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

  const updateDropDownValue = useCallback((dropDownItem: IDropDownItem, actionName: string) => {
    genericDrawerController.closeGenericDrawerModal()

    if(actionName === ACTION_NAME.UPDATE_COUNTRY) {
      const currentValue = state.dataList.find(item => item?.key === USER_INFO_KEYS.COUNTRY)?.value
      const newValue = dropDownItem.id
      if(currentValue != newValue) {
        // reset city also
      }
    }

    updateState({
      type: actionName,
      payload: dropDownItem.id
    })
  }, [])

  return {
    dataList: state.dataList,
    updateState,
    onSubmit,
    updateTextValue,
    updateRadioButtonValue,
    updateDropDownValue
  }
}

export default useNewInsuranceTrackScreenViewController
