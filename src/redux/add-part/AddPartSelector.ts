import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../store/DataStore'


export const getProductSlidesData = (state: RootState) => state.addPartReducer.formData.productSlides

export const getTotalImagesTakenCountSelector = createSelector(
  getProductSlidesData,
  (productSlides) => {
    return productSlides.selectedImages?.length || 0
  }
)