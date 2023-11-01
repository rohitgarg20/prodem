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
    return renderTitleWithDescripton('Updated Date :', date)
  }

  const renderProductColor = () => {
    return renderTitleWithDescripton('Color :', color)
  }

  const renderProductType = () => {
    return renderTitleWithDescripton('Type :', type)
  }

  const renderProductBrand = () => {
    return renderTitleWithDescripton('Brand :', brand)
  }

  const renderHeading = () => {
    return (
      <CustomText
        text={'Details'}
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