import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../constant/Colors';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = (props) => {
    const { lable, list, initial, onChangeValue, selectedvalue } = props;
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: Colors.primary }]}>
                    {lable}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                // activeColor={Colors.primary}
                containerStyle={{ borderColor: Colors.primary, color: Colors.primary }}
                style={[styles.dropdown, isFocus && { borderColor: Colors.primary }]}
                placeholderStyle={styles.placeholderStyle}

                selectedStyle={{ color: Colors.primary }}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                iconColor={Colors.primary}
                baseColor={Colors.primary}
                data={list}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={selectedvalue.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    // setValue(item.value);
                    setIsFocus(false);
                    onChangeValue(item)
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? Colors.primary : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 5
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 7,
        paddingHorizontal: 8,
        color: Colors.primary,

    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.primary,

    },
    selectedTextStyle: {
        color: Colors.accent,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: Colors.accent,
    },
});
export default DropdownComponent;