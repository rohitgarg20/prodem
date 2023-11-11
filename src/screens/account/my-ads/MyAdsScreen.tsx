import React, { useCallback, useEffect,  useRef } from 'react'

import { FlashList } from '@shopify/flash-list'
import { isEmpty } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderComponent } from '../../../common/components/screens'
import { SellerProductItemCardComponent } from '../../../common/components/screens/my-ads/SellerProductCardComponent'
import { SCREEN_HEIGHT } from '../../../common/Constant'
import { IProductCardComponent } from '../../../common/Interfaces'
import { ScreenNames } from '../../../common/Screens'
import { editFormReducer } from '../../../redux/add-part/AddPartSlice'
import { resetProductListDataReducer } from '../../../redux/home/SellerAds'
import { deleteProduct, fetchSellerProductList } from '../../../redux/home/SellerAdsApi'
import { RootState } from '../../../store/DataStore'
import { navigateSimple } from '../../../utils/navigation-utils'
import { verticalScale } from '../../../utils/scaling'
import { productListStyles as styles } from  '../../Home/styles'
import { showAlert } from '../../../utils/app-utils'


export const MyAdsListScreen = ({ navigation  }) => {

  const dispatch = useDispatch()
  const sellerAdsReducer = useSelector((state: RootState) => state.sellerProductListReducer)
  const {  productList = {}, isFetching } = sellerAdsReducer
  let abortController: any = useRef(new AbortController()).current
  useEffect(() => {
    fetchSellerProductList({
      signal: abortController.signal
    })

    return () => {
      dispatch({
        type: resetProductListDataReducer.type
      })
      abortController.abort()
    }

  }, [dispatch, abortController])


  const onPressProductCard = useCallback((productId) => {
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.PRODUCT_DETAIL_SCREEN,
      params: {
        productId
      }
    })
  }, [navigation])

  const onPressEditBtn = useCallback((productData: IProductCardComponent) => {
    dispatch({ type: editFormReducer.type,
      payload: productData
    })
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.ADD_PART_SCREEN,
      params: {
        productId: productData.productId,
        isEditFlow: true
      }
    })
  }, [navigation, dispatch])

  const deleteProductApi = useCallback((productId) => {
    deleteProduct(productId)
  }, [])

  const onDeleteProduct = useCallback((productId) => {
    showAlert('Delete Product', 'Are you sure you want to delete this product ?', () => deleteProductApi(productId),  'Delete')
  }, [deleteProductApi])

  const renderProductItem = ({ item }: { item: string }) => {
    return (
      <SellerProductItemCardComponent
        sellerProductData={productList[item]}
        onDeleteBtnPress={onDeleteProduct}
        onPressProductCard={onPressProductCard}
        onEditBtnPress={onPressEditBtn}
      />
    )
  }

  const getKeyExtractor = (item: string, index) => `${item}_${index}`.toString()

  const renderItemSeperatorComponent = () => ( <View style={styles.productSeperator} />)

  //   const fetchProductListonReachedEnd = () => {
  //     if(productListPageNumber <= productListTotalPage) {
  //       fetchProductListData({
  //         categoryId,
  //         page: productListPageNumber,
  //         cancelToken: sourceRef,
  //         search: searchText.current,
  //         sortBy: selectedFilter?.id
  //       })
  //     }
  //   }

  //   const renderFooterComponent = () => {
  //     log('renderFooterComponent',productListPageNumber,  productListTotalPage)
  //     if(productListPageNumber > productListTotalPage || (productListTotalPage === 0)) return null
  //     return (
  //       <ActivityIndicator
  //         size={'large'}
  //         color={colors.primary}
  //       />
  //     )
  //   }

  const renderProductList = () => {
    return (
      <FlashList
        estimatedItemSize={verticalScale(170)}
        style={styles.productList}
        data={Object.keys(productList)}
        renderItem={renderProductItem}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        contentContainerStyle={styles.flatListContentContainer}
        // onEndReached={fetchProductListonReachedEnd}
        onEndReachedThreshold={0.01}
        // ListFooterComponent={renderFooterComponent}
        drawDistance={SCREEN_HEIGHT}
      />
    )
  }


  const renderContentContainer = () => {
    return (
      <View style={styles.contentContainer}>
        {renderProductList()}
      </View>
    )
  }


  return (
    <View style={styles.mainContainer}>
      <HeaderComponent
        title={'My Active Ads'}
        showBackBtn
      />
      {!isFetching && !isEmpty(productList) && renderContentContainer()}
    </View>
  )
}