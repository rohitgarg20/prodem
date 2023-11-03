import { Pressable, StyleSheet, View } from "react-native";
import { colors, textColor } from "../../Colors";
import { CustomText } from "./CustomText";
import { scale } from "../../../utils/scaling";

interface IRadioComponent {
    optionList: { key: string, value: string }[]
    selectedKey: string
    onValueChanged: (key: string) => void
    label?: string
}

const RadioButtonComponent = ({
    label,
    optionList,
    selectedKey,
    onValueChanged = () => { }
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

            {optionList.map(item => {
                const isSelected = item.key === selectedKey
                const { key, value } = item
                return <Pressable style={[radioStyle.buttonContainer, isSelected? radioStyle.selectedContainer:  {}]}
                 onPress={() => onValueChanged(key)} testID="radioButton">
                    <View
                        style={[
                            radioStyle.radioButton,
                            radioStyle.alignCenter,
                            radioStyle.justifyCenter,
                            isSelected && radioStyle.radioButtonSelected,
                        ]}>
                        {isSelected && <View style={radioStyle.radioButtonSelectedDot} />}
                    </View>
                    <CustomText text={value} fontSize={14} />
                </Pressable>
            })}
        </View>

    );
}

export default RadioButtonComponent

const radioStyle = StyleSheet.create({
    selectedContainer: {
        borderColor: colors.lightOrange,
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
        marginRight: 10,
    },
    radioButtonSelected: {
        height: 16,
        width: 16,
        borderRadius: 12,
        borderColor: colors.lightOrange,
        borderWidth: 1,
    },
    alignCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    radioButtonSelectedDot: {
        height: 10,
        width: 10,
        backgroundColor: colors.lightOrange,
        borderRadius: 8,
    },
})