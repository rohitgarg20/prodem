import React, { useEffect } from 'react'

import { useRoute } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import { get } from 'lodash'
import { ActivityIndicator, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { productListStyles as styles } from './styles'
import { colors } from '../../common/Colors'
import { IconButtonWrapperComponent, SpacerComponent } from '../../common/components'
import { HeaderComponent } from '../../common/components/screens'
import { ProductItemCardComponent } from '../../common/components/screens/home/ProductItemCardComponent'
import { SearchBarComponent } from '../../common/components/screens/home/SearchBarComponent'
import { log } from '../../common/config/log'
import { SCREEN_HEIGHT } from '../../common/Constant'
import { icons } from '../../common/Icons'
import { IProductCardComponent } from '../../common/Interfaces'
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
  const categoryId = get(routeParams, 'params.categoryId', '')
  const { productListPageNumber, productListTotalPage, productList } = homeReducer
  let source = axios.CancelToken.source()

  useEffect(() => {
    if(categoryId) {
      fetchProductListData({
        categoryId,
        page: productListPageNumber,
        cancelToken: source
      })
    }

    return () => {
      dispatch({
        type: resetProductListReducer.type
      })
      source.cancel('component unmounted')
    }

  }, [routeParams, dispatch, categoryId, source])


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

  const renderSearchBarWithArrow = () => {
    return (
      <View style={styles.rowContainer}>
        {renderLeftArrow()}
        <SearchBarComponent />
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
        cancelToken: source
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


  const renderContentContainer = () => {
    return (
      <View style={styles.contentContainer}>
        {renderSearchBarWithArrow()}
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