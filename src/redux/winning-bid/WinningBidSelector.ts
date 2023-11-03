import { createSelector } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { RootState, store } from '../../store/DataStore'


export const getWinningBidDataFetchingStatusSelector = (type: string) => createSelector(
    (state: RootState) => state.winningBidReducer?.[type],
    (winningBidStore: IWinningBidStore['id']) => !isEmpty(winningBidStore) ? winningBidStore.isFetchingData : false
)

export const getWinningBidDataApiStatusSelector  = (type: string) => createSelector(
    (state: RootState) => state.winningBidReducer?.[type],
    (winningBidStore: IWinningBidStore['id']) => !isEmpty(winningBidStore) ? winningBidStore.hasApiError : false
)

export const getWinningBidDataListSelector  = (type: string) => createSelector(
    (state: RootState) => state.winningBidReducer?.[type],
    (winningBidStore: IWinningBidStore['id']) =>  winningBidStore?.list || []
)

export const getWinningBidDataCountSelector  = (type: string) => createSelector(
    (state: RootState) => state.winningBidReducer?.[type],
    (winningBidStore: IWinningBidStore['id']) =>  winningBidStore?.list?.length || 0
)



