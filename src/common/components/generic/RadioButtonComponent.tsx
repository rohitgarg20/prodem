import React from 'react'

import { Pressable, StyleSheet, View } from 'react-native'

import { CustomText } from './CustomText'
import { IconWrapper } from './IconWrapper'
import { scale } from '../../../utils/scaling'
import { colors, textColor } from '../../Colors'

const radioStyle = StyleSheet.create({
  selectedContainer: {
    borderColor: colors.lightOrange
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.ashGrey,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 6
  },
  labelText: {
    marginBottom: scale(4)
  },
  radioButton: {
    height: 16,
    width: 16,
    borderRadius: 12,
    borderColor: colors.lightestGrey,
    borderWidth: 1,
    marginRight: 10
  },
  radioButtonSelected: {
    height: 16,
    width: 16,
    borderRadius: 12,
    borderColor: colors.lightOrange,
    borderWidth: 1
  },
  alignCenter: {
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  radioButtonSelectedDot: {
    height: 10,
    width: 10,
    backgroundColor: colors.lightOrange,
    borderRadius: 8
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

interface IRadioComponent {
  optionList: { key: string | number; value: string; icon?: number; tintColor?: string }[]
  selectedKey: string | number
  onValueChanged: (key: string | number) => void
  label?: string
  showInRow?: boolean
}

const RadioButtonComponent = ({
  label,
  optionList,
  selectedKey,
  onValueChanged = () => { },
  showInRow = false
}: IRadioComponent) => {

  return (
    <View>
      {label ? <CustomText
        text={label}
        fontSize={16}
        color={textColor.black}
        fontWeight='400'
        textStyle={radioStyle.labelText}
      /> : null}
      <View style={showInRow ? radioStyle.rowContainer: {}}>
        {optionList.map(item => {
          const isSelected = item.key === selectedKey
          const { key, value, icon, tintColor } = item
          return <Pressable style={[radioStyle.buttonContainer, isSelected? radioStyle.selectedContainer:  {}]}
            onPress={() => onValueChanged(key)}
            testID="radioButton">
            <View
              style={[
                radioStyle.radioButton,
                radioStyle.alignCenter,
                radioStyle.justifyCenter,
                isSelected && radioStyle.radioButtonSelected
              ]}>
              {isSelected && <View style={radioStyle.radioButtonSelectedDot} />}
            </View>
            <CustomText text={value}
              fontSize={14} />
            {
              !!icon && (
                <IconWrapper
                  iconSource={icon}
                  iconHeight={30}
                  iconWidth={30}
                  tintColor={tintColor}
                />
              )
            }
          </Pressable>
        })}
      </View>
    </View>

  )
}

export default RadioButtonComponent
