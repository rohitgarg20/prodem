import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import { debounce, get } from 'lodash'
import { ActivityIndicator, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { productListStyles as styles } from './styles'
import { dimissKeyboard } from '../../common/App-Utils'
import { colors, textColor } from '../../common/Colors'
import { ButtonComponent, CenterModalPopup, IconButtonWrapperComponent, SpacerComponent } from '../../common/components'
import { genericDrawerController } from '../../common/components/ModalComponent/GenericModalController'
import { HeaderComponent } from '../../common/components/screens'
import { DropDownListComponent } from '../../common/components/screens/dropdown/DropDownListComponent'
import { ProductItemCardComponent } from '../../common/components/screens/home/ProductItemCardComponent'
import { SearchBarComponent } from '../../common/components/screens/home/SearchBarComponent'
import { log } from '../../common/config/log'
import { SCREEN_HEIGHT, isIos, sortByFilters } from '../../common/Constant'
import { ButtonType } from '../../common/Enumerators'
import { bottomModal } from '../../common/GenericStyle'
import { icons } from '../../common/Icons'
import { IDropDownItem, IProductCardComponent } from '../../common/Interfaces'
import { ScreenNames } from '../../common/Screens'
import { fetchProductListData } from '../../redux/home/HomeApi'
import { resetProductListReducer } from '../../redux/home/HomeSlice'
import { RootState } from '../../store/DataStore'
import { goBack, navigateSimple } from '../../utils/navigation-utils'
import { verticalScale } from '../../utils/scaling'


export const ProductListScreen = ({ navigation  }) => {

  const routeParams = useRoute()
  const dispatch = useDispatch()
  const homeReducer = useSelector((state: RootState) => state.homeReducer)
  const [inputValue, updateSearchText] = useState('')
  let searchText = useRef('')
  const categoryId = get(routeParams, 'params.categoryId', '')
  const { productListPageNumber, productListTotalPage, productList, isFetching } = homeReducer
  let sourceRef = useRef(axios.CancelToken.source()).current
  let abortController = useRef(new AbortController())
  const [selectedFilter, updateSelectedFilter] = useState({ id: '', value: '' })

  useEffect(() => {
    if(categoryId) {
      fetchProductListData({
        categoryId,
        page: productListPageNumber,
        cancelToken: sourceRef,
        search: ''
      })
    }

    return () => {
      dispatch({
        type: resetProductListReducer.type
      })
      sourceRef.cancel('component unmounted')
      abortController.current.abort()
    }

  }, [routeParams, dispatch, categoryId])

  useEffect(() => {
    abortController.current = new AbortController()
    return () => {
      abortController.current.abort()
    }
  }, [inputValue])


  const onPressLeftArrowIcon = () => {
    goBack(navigation)
  }

  const renderLeftArrow = () => {
    return (
      <IconButtonWrapperComponent
        iconSource={icons.DOWN_ARROW}
        style={styles.leftArrow}
        iconHeight={20}
        iconWidth={20}
        onPressIcon={onPressLeftArrowIcon}
      />
    )
  }

  const getProductListApiOnFilter = useCallback((sortByFilter) => {
    if(productList.length) {
      dispatch({
        type: resetProductListReducer.type
      })
    }
    fetchProductListData({
      categoryId,
      page: 1,
      cancelToken: sourceRef,
      search: searchText.current,
      signal: abortController.current.signal,
      sortBy: sortByFilter
    })
  }, [dispatch, productList, categoryId, sourceRef])

  const fetchProductList = useCallback(debounce((searchValue) => {
    dispatch({
      type: resetProductListReducer.type
    })
    fetchProductListData({
      categoryId,
      page: 1,
      cancelToken: sourceRef,
      search: searchValue,
      signal: abortController.current.signal,
      sortBy: selectedFilter?.id
    })
  }, 1000), [selectedFilter])

  const onChangeText = (searchValue) => {
    searchText.current = searchValue
    fetchProductList.cancel()
    updateSearchText(searchValue)
    fetchProductList(searchValue)
  }

  const renderSearchBarWithArrow = () => {
    return (
      <View style={styles.rowContainer}>
        {renderLeftArrow()}
        <SearchBarComponent
          editable
          onChangeText={onChangeText}
          inputValue={inputValue}
        />
      </View>
    )
  }

  const onPressProductCard = (productId) => {
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.PRODUCT_DETAIL_SCREEN,
      params: {
        productId
      }
    })
  }

  const renderProductItem = ({ item }: { item: IProductCardComponent }) => {
    return (
      <ProductItemCardComponent
        {...item}
        onPressProductCard={onPressProductCard}
      />
    )
  }

  const getKeyExtractor = (item: IProductCardComponent) => item.productId.toString()

  const renderItemSeperatorComponent = () => ( <View style={styles.productSeperator} />)

  const fetchProductListonReachedEnd = () => {
    if(productListPageNumber <= productListTotalPage) {
      fetchProductListData({
        categoryId,
        page: productListPageNumber,
        cancelToken: sourceRef,
        search: searchText.current,
        sortBy: selectedFilter?.id
      })
    }
  }

  const renderFooterComponent = () => {
    log('renderFooterComponent',productListPageNumber,  productListTotalPage)
    if(productListPageNumber > productListTotalPage || (productListTotalPage === 0)) return null
    return (
      <ActivityIndicator
        size={'large'}
        color={colors.primary}
      />
    )
  }

  const renderProductList = () => {
    return (
      <FlashList
        estimatedItemSize={verticalScale(170)}
        style={styles.productList}
        data={productList}
        renderItem={renderProductItem}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        contentContainerStyle={styles.flatListContentContainer}
        onEndReached={fetchProductListonReachedEnd}
        onEndReachedThreshold={0.01}
        ListFooterComponent={renderFooterComponent}
        drawDistance={SCREEN_HEIGHT}
      />
    )
  }


  const onPressDropDownItem = useCallback((selectedDropdownItem: IDropDownItem) => {
    getProductListApiOnFilter(selectedDropdownItem.id)
    updateSelectedFilter({ id: (selectedDropdownItem.id || '').toString(), value: (selectedDropdownItem.value || '').toString() })
    genericDrawerController.closeGenericDrawerModal()
  }, [getProductListApiOnFilter])

  const renderDropdownListComponent = useCallback(() => {
    return (
      <DropDownListComponent
        dropdownList={sortByFilters}
        onPressDropDownItem={onPressDropDownItem}
        fieldKey={'sortBy'}
        flatlistContainer={styles.dropdownList}
        dropDownContainer={styles.dropdownContainer}
      />
    )
  }, [onPressDropDownItem])

  const renderCenterDropDown = useCallback(() => {
    return (
      <CenterModalPopup
        innerContent={() => renderDropdownListComponent()}
      />
    )
  }, [renderDropdownListComponent])

  const renderDropDownComponent = useCallback(() => {
    genericDrawerController.showGenericDrawerModal({
      renderingComponent: () => renderCenterDropDown(),
      closeDrawerOnOutsideTouch: isIos,
      modalPositionStyling: bottomModal
    })
  }, [renderCenterDropDown])


  const showDropDownMenu = useCallback(() => {
    renderDropDownComponent()
    genericDrawerController.openGenericDrawerModal()
    dimissKeyboard()
  }, [renderDropDownComponent])

  const renderFiltersOption = () => {
    let displayLabel = 'Sort By' + (selectedFilter?.value?.length ? ` - ${selectedFilter?.value}` : '')
    return (
      <ButtonComponent
        text={displayLabel}
        buttonType={ButtonType.SIMPLE_BTN}
        color={textColor.black}
        textStyle={styles.textSytle}
        onPress={showDropDownMenu}
        buttonContainerStyle={styles.sortByFilter}
      />
    )
  }


  const renderContentContainer = () => {
    return (
      <View style={styles.contentContainer}>
        {renderSearchBarWithArrow()}
        <SpacerComponent style={styles.seperator} />
        {!isFetching && renderFiltersOption()}
        <SpacerComponent style={styles.seperator} />
        {renderProductList()}
      </View>
    )
  }


  return (
    <View style={styles.mainContainer}>
      <HeaderComponent title={''}
        customHeaderStyle={styles.headerContainer}/>
      {renderContentContainer()}
    </View>
  )
}