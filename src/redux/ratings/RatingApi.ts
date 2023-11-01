import { onRatingApiSuccessResponseReducer } from './RatingsSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { apiDispatch } from '../../network/DispatchApiCall'


export const getRatingListData = (ratingType: string) => {
  apiDispatch({
    endPoint: `${API_END_POINT.GET_RATINGS_DATA}/${ratingType}`,
    method: 'GET',
    showLoaderOnScreen: true,
    onSuccess: onRatingApiSuccessResponseReducer.type
  })
}