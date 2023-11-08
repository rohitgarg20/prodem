type TInsuranceKeys = import('./EditProfileConstant').USER_INFO_KEYS
type TNewInsuranceActionName = import('./EditProfileConstant').ACTION_NAME
type TFieldType= import('./EditProfileConstant').FIELD_TYPE


interface State {
  dataList: IStateElement[]
}

interface IStateElement {
  key: TInsuranceKeys
  value: string | number
  fieldType: TFieldType
  defaultValue: string | number
  actionName: TNewInsuranceActionName
  label: string
  valueType: 'string' | 'number'
  isRequired: boolean
  regex: any
  error: string
  multiline?: boolean
  optionList?: any[]
}

interface Dispatcher {
  type: string
  payload?: any
}