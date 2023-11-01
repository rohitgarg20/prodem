import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store/DataStore'


export const getProductSlidesData = (state: RootState) => state.askPartSliceReducer.formData.productSlides

export const getAskPartTotalImagesTakenCountSelector = createSelector(
  getProductSlidesData,
  (productSlides) => {
    return productSlides.selectedImages?.length || 0
  }
)