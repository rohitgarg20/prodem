import { createSlice } from '@reduxjs/toolkit'
import { forEach, get, isEmpty, map } from 'lodash'

import { colors } from '../../common/Colors'
import { ReducerName } from '../../common/Constant'
import { ISubscriptionCard, ITopTabBarItem } from '../../common/Interfaces'
import { currencyCoverter } from '../../utils/app-utils'


interface ISubscriptionState {
  selectedSubscriptionType?: string
  subscriptionData?: Record<string, ISubscriptionCard[]>
  subscriptionTypeList?: ITopTabBarItem[]
}

const initialState: ISubscriptionState = {
  selectedSubscriptionType: '',
  subscriptionData: {},
  subscriptionTypeList: []
}

export const getBackgroundColorByPlanType = (plan) => {
  if(plan === 'basic') return colors.paleSkyBlue
  return colors.lightPink
}

const onChangeSubscriptionType = (state: ISubscriptionState, action) => {
  const { updatedSubscriptionType } = action.payload || {}
  state.selectedSubscriptionType = updatedSubscriptionType
}

const subscriptionApiSuccessResponse = (state: ISubscriptionState, { payload }) => {
  const respData = get(payload, 'responseData.data', {})
  if(!isEmpty(respData)) {
    const planTypes = Object.keys(respData)
    let formattedPlanTypes: any = []
    const formattedPlanData: any = {}
    forEach(planTypes, (planItemType) => {
      formattedPlanTypes.push({
        key: planItemType,
        label: `${planItemType.toUpperCase()} PLAN`
      })
      const planItemList = respData[planItemType]
      const formattedPlanList: ISubscriptionCard[] = map(planItemList, (planItem) => {
        return {
          subscriptionId: planItem?.subs_id,
          name: planItem?.subs_name,
          price: currencyCoverter(planItem?.subs_price)?.toString() || '',
          quantity: planItem?.subs_quantity?.toString() || '',
          validity: planItem?.subs_validity?.toString() || '',
          btnBackgroundColor: getBackgroundColorByPlanType(planItemType),
          multiSubscription: map(planItem?.multi_subscription || [], (multiSubscriptionItem, index) => {
            return {
              key: multiSubscriptionItem?.multi_key || '',
              value: multiSubscriptionItem?.multi_value || '',
              label: multiSubscriptionItem?.multi_key || index
            }
          })
        }
      })
      formattedPlanData[planItemType] = formattedPlanList
    })
    state.subscriptionData = formattedPlanData
    state.subscriptionTypeList = formattedPlanTypes
    state.selectedSubscriptionType = formattedPlanTypes?.[0]?.key || ''
  }
}


export const subscriptionSlice = createSlice({
  name: ReducerName.SUBSCRIPTION,
  initialState,
  reducers: {
    subscriptionApiSuccessResponseReducer: subscriptionApiSuccessResponse,
    onChangeSubscriptionTypeReducer: onChangeSubscriptionType
  }
})

export const {
  subscriptionApiSuccessResponseReducer, onChangeSubscriptionTypeReducer
} = subscriptionSlice.actions

export default subscriptionSlice.reducer