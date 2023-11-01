import { createSelector } from '@reduxjs/toolkit'
import { reduce } from 'lodash'

import { ISubCategories, IVehicles } from './HomeSliceInterface'
import { RootState } from '../../store/DataStore'

export const getCategoriesListSelector = (state: RootState) => state.homeReducer.categories || []

export const getBrandsListSelector = (state: RootState) => state.homeReducer.brand || []

export const getSubCategoriesList = createSelector(
  getCategoriesListSelector,
  (categories) => {
    const subCatoriesList =   reduce(categories, (subCategoriesList: ISubCategories[], categoryItem) => {
      const subCategories = categoryItem?.subcatgory
      if(subCategories?.length) {
        subCategoriesList = [...subCategoriesList, ...subCategories]
      }
      return subCategoriesList
    }, [])

    return subCatoriesList
  }
)

export const getVehiclesList = createSelector(
  getBrandsListSelector,
  (brandsList) => {
    const normalizedVehiclesList = reduce(brandsList, (vehiclesList: IVehicles[], brandItem) => {
      const vehiclesInBrand = brandItem?.vehicle
      if(vehiclesInBrand?.length) {
        vehiclesList = [...vehiclesList, ...vehiclesInBrand]
      }
      return vehiclesList
    }, [])
    return normalizedVehiclesList
  }
)