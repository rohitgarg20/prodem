import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { colors, textColor } from '../../Colors';
import { CustomText } from './CustomText';
import { SCREEN_WIDTH } from '../../Constant';


type ViewStyle = import('react-native').ViewStyle;
type IDataListMenuBar = {
    key: string;
    value: string;
};

type styleType = {
    outerViewStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
};

// Interface used by SingleSelectMenuBar to pass all data
interface ISingleSelectMenuBar {
    // arrayList to pass all data to be shown
    dataList: IDataListMenuBar[];
    // select given item key for initially
    initialSelectedKey?: string;
    // callback to get updated item
    onItemChanged: (key: string) => void;
    // for styling container
    style?: styleType;
}



const SingleSelectMenuBar: React.FunctionComponent<
    ISingleSelectMenuBar
> = ({
    dataList = [],
    initialSelectedKey,
    onItemChanged,
    style
}) => {
        const { outerViewStyle = {}, contentContainerStyle = {} } = style || {};
        const [selectedKey, updateSelectedKey] = useState(initialSelectedKey || dataList?.[0]?.key,);
        const flatListRef = useRef<FlatList>(null);
        const totalCount = dataList?.length || 0

        useEffect(() => {
            if (initialSelectedKey !== selectedKey)
                updateSelectedKey(initialSelectedKey || selectedKey);
        }, [initialSelectedKey]);


        const onItemPressed = useCallback((key: string, index: number) => {
            updateSelectedKey(key);

            if (index >= 0)
                flatListRef.current?.scrollToIndex({
                    index: index,
                    animated: true,
                });

            if (onItemChanged) {
                onItemChanged(key);
            }
        }, []);


        const renderMenuItem = ({
            item,
            index,
        }: {
            item: IDataListMenuBar;
            index: number;
        }) => {
            const { key = '', value = '' } = item;
            const isSelected = key === selectedKey;
            const minWidth = totalCount > 3 ? 'auto' : SCREEN_WIDTH / totalCount
            return (
                <Pressable style={{ ...styles.itemContainer,  minWidth: minWidth}} onPress={() => onItemPressed(key, index)}>
                    <View style={styles.menuItemContainer}>
                        <CustomText
                            fontSize={16}
                            color={textColor.white}
                            text={value}
                            textStyle={{
                                ...styles.textStyle,
                                color: isSelected ? colors.lightOrange : colors.lightBlack,  
                            }}
                        />
                    </View>
                    {isSelected ? <View style={styles.selectedItemUnderLine} /> : null}
                </Pressable>
            );
        };
        const childListKeyExtractor = useCallback((item: any) => `child-key-${item.key}`, [],);
        return (
            <View style={[styles.container, outerViewStyle]}>
                <FlatList
                    ref={flatListRef}
                    data={dataList}
                    renderItem={renderMenuItem}
                    horizontal={true}
                    keyExtractor={childListKeyExtractor}
                    contentContainerStyle={contentContainerStyle}
                    // initialNumToRender={dataList?.length || 4}
                    showsHorizontalScrollIndicator={false}
                    initialScrollIndex={0}
                />
            </View>
        );
    };

export default React.memo(SingleSelectMenuBar);


const styles = StyleSheet.create({
    container: {
        elevation: 2,
        shadowColor: colors.fuscosGrey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        // borderBottomWidth: 0.2
    },
    menuItemContainer: {
        paddingHorizontal: 20,
        marginRight: 10,
        alignItems: 'center',
    },
    itemContainer: { alignItems: 'center'},
    textStyle: {  textDecorationLine: 'underline',},
    selectedItemUnderLine:
    {
        width: '90%',
        height: 2,
        backgroundColor: colors.lightOrange,
        marginTop: 6
    },
    
})
