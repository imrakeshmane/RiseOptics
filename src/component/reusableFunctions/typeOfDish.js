import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Button, DataTable, RadioButton } from 'react-native-paper';
import Colors from '../../constant/Colors';



const TypeofDish = ({ filterDishWise, categoryList, setSelectedIndex, selectedIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    return (
        <ScrollView horizontal={true} >
            <View style={styles.radioGroup}>
                {
                    categoryList.map((c, ci) => {
                        console.log(c, 'c')
                        return <Button key={ci + '8'} style={styles.btnStyle} mode={selectedIndex === ci ? "contained" : "outlined"} onPress={() => {
                            setSelectedIndex(ci)
                        }}>

                            <Text style={[selectedIndex === ci ? styles.whiteColor : styles.blueColor]}>{c.ML}ml</Text>

                        </Button>
                    })
                }

            </View>

        </ScrollView >

    );
};

const styles = StyleSheet.create({
    radioGroup: {
        flexDirection: 'row', alignContent: 'center', padding: 15, marginVertical: 10, alignItems: 'center',
        width: '100%', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderBottomColor: Colors.primary,
        borderTopColor: Colors.primary

    },
    btnStyle: {
        marginRight: 5,
        padding: 5,
        borderRadius: 5,

    },
    title: {
        fontSize: 14,
        color: 'black',
        flex: 2
    },
    whiteColor: {
        color: Colors.whiteColor,
    },
    blueColor: {
        color: Colors.primary,
    },
    radioText: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
export default TypeofDish;