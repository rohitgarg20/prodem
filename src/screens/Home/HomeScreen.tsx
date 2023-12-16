import React, { useEffect } from 'react'

import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { homeStyles } from './styles'
import { textColor } from '../../common/Colors'
import { CustomText } from '../../common/components'
import { HeaderComponent } from '../../common/components/screens'
import { CategoryCardComponent } from '../../common/components/screens/home/CategoryCardComponent'
import { SearchBarComponent } from '../../common/components/screens/home/SearchBarComponent'
import { ICategoryCardComponent } from '../../common/Interfaces'
import { ScreenNames } from '../../common/Screens'
import { HOME_SCREEN } from '../../common/strings'
import { fetchCategoriesAndBrandData } from '../../redux/home/HomeApi'
import { RootState } from '../../store/DataStore'
import { navigateSimple } from '../../utils/navigation-utils'


const { HEADER_TITLE, CATEGORIES, SUBHEADING } = HOME_SCREEN


export const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    fetchCategoriesAndBrandData()
  }, [])


  const dispatch = useDispatch()
  const categoriesList = useSelector((state: RootState) => state.homeReducer.categories)


  const renderScreenHeadingComponent = () => {
    return (
      <View>
        <CustomText
          text={CATEGORIES}
          fontSize={16}
          lineHeight={20}
          color={textColor.black}
          fontWeight="bold"
          textStyle={homeStyles.titleSeperator}
        />
        <CustomText
          text={SUBHEADING}
          fontSize={12}
          color={textColor.midnightMoss}
        />
      </View>
    )
  }

  const onPressCategoryCard = (categoryId = undefined) => {
    navigateSimple({
      navigator: navigation,
      screenToNavigate: ScreenNames.PRODUCT_LIST_SCREEN,
      params: {
        categoryId
      }
    })
  }

  const renderCategoryItem = ({ item }: { item: ICategoryCardComponent }) => {
    const { categoryName, categoryImage, categoryId } = item
    return (
      <CategoryCardComponent
        categoryId={categoryId}
        categoryName={categoryName}
        categoryImage={categoryImage}
        onPress={onPressCategoryCard}
      />
    )
  }

  const getKeyExtractor = (item: ICategoryCardComponent) => item.categoryId.toString()

  const renderItemSeperatorComponent = () => ( <View style={homeStyles.categorySeperator} />)

  const renderCategoriesList = () => {
    return (
      <FlatList
        style={homeStyles.categoryList}
        data={categoriesList}
        renderItem={renderCategoryItem}
        keyExtractor={getKeyExtractor}
        ItemSeparatorComponent={renderItemSeperatorComponent}
        contentContainerStyle={homeStyles.flatListContentContainer}
      />
    )
  }

  const renderContentContainer = () => {
    return (
      <View style={homeStyles.contentContainer}>
        <SearchBarComponent onPressSearchBar={onPressCategoryCard}/>
        {renderScreenHeadingComponent()}
        {renderCategoriesList()}
      </View>
    )
  }

  return (
    <View style={homeStyles.mainContainer}>
      <HeaderComponent title={HEADER_TITLE} />
      {renderContentContainer()}
    </View>
  )
}