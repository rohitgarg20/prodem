import React from 'react'

import { StyleSheet, View } from 'react-native'

import { colors, textColor } from '../../../Colors'
import { CustomText } from '../../generic'


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.lightBlack,
    paddingTop: 5
  },
  detailContainer: {
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 10
  }
})


export const ProductOtherDetailsComponent = ({
  date, color, type, brand
}: { date: string
  color: string
  type: string
  brand: string
}) => {

  const renderTitleWithDescripton = (title, description) => {
    return (
      <View style = {styles.rowContainer}>
        <CustomText
          text={title}
          fontSize={16}
          color = {textColor.midnightMoss}
        />
        <CustomText
          text={description}
          fontSize={16}
          color = {textColor.midnightMoss}
        />
      </View>
    )
  }

  const renderProductDate = () => {
    return renderTitleWithDescripton('MultiLanguageString.UPDATED_DT', date)
  }

  const renderProductColor = () => {
    return renderTitleWithDescripton('MultiLanguageString.COLOR', color)
  }

  const renderProductType = () => {
    return renderTitleWithDescripton('MultiLanguageString.TYPE', type)
  }

  const renderProductBrand = () => {
    return renderTitleWithDescripton('MultiLanguageString.BRAND', brand)
  }

  const renderHeading = () => {
    return (
      <CustomText
        text={'MultiLanguageString.Details'}
        fontSize={16}
        color = {textColor.black}
        fontWeight='bold'
      />
    )
  }

  return (
    <View style={styles.detailContainer}>
      {renderHeading()}
      {renderProductDate()}
      {renderProductColor()}
      {renderProductType()}
      {renderProductBrand()}
    </View>
  )
}