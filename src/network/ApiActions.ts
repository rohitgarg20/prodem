import { createAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

export const apiCallBegin = createAction('apiCallBegin')
export const apiCallSuccess = createAction<AxiosResponse>('apiCallSuccess')
export const apiCallFailure = createAction<AxiosError>('apiCallFailure')
