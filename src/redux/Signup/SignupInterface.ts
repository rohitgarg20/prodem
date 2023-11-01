import { FormKeys } from '../../common/Constant'
import { IUserFormItem } from '../../common/Interfaces'

export interface ISignupState {
  formData: Record<FormKeys, IUserFormItem>
}