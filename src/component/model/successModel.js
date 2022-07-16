import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView, TouchableOpacity, PermissionsAndroid } from "react-native";
import { TextInput, Button, DataTable, RadioButton } from 'react-native-paper';
import Colors from "../../constant/Colors";
import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
} from "react-native-thermal-receipt-printer";
import useSession from "../../appContext/useSession";
import moment from "moment";
import IonicIcons from 'react-native-vector-icons/Ionicons';


const SuccessModel = (props) => {
    const { modalVisible, setModalVisible, onProceed, setPaymentType, paymentType, orderList, info
    } = props;
    console.log(orderList, 'orderList')
    const [currentIndex, setCurrentIndex] = useState(1);
    const [printers, setPrinters] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState();
    const { session } = useSession();

    const permissionForBluetoothConnect = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                {
                    title: "BLUETOOTH_CONNECT Permission",
                    message:
                        "Cool Photo App needs access to your BLUETOOTH_CONNECT " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            console.log(PermissionsAndroid.RESULTS);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // permissionForBluetoothOnOFF();
                console.log("You can use the BLUETOOTH_CONNECT");
                BLEPrinter.init().then(() => {
                    BLEPrinter.getDeviceList().then(setPrinters);
                });
            } else {
                requestLocationPermission();
                console.log("BLUETOOTH_CONNECT permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const permissionForBluetoothOnOFF = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                {
                    title: "BLUETOOTH_SCAN Permission",
                    message:
                        "Cool Photo App needs access to your BLUETOOTH_SCAN " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            console.log(PermissionsAndroid.RESULTS);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // permissionForBluetoothOnOFF();
                console.log("You can use the BLUETOOTH_CONNECT");
                // BLEPrinter.init().then(() => {
                //     BLEPrinter.getDeviceList().then(setPrinters);
                // });
            } else {
                console.log("BLUETOOTH_CONNECT permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        permissionForBluetoothConnect()

    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
                title: 'Location permission for bluetooth scanning',
                message: 'wahtever',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission for bluetooth scanning granted');
                BLEPrinter.init().then(() => {
                    BLEPrinter.getDeviceList().then(setPrinters);
                });
                return true;
            } else {
                console.log('Location permission for bluetooth scanning revoked');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    useEffect(() => {
        console.log('print', printers)
    }, [printers]);

    const _connectPrinter = () => (printer) => {
        //connect printer
        BLEPrinter.connectPrinter(printer.inner_mac_address).then(
            setCurrentPrinter,
            (error) => console.warn(error)
        );
    };


    const ContentBill = (left, right, size) => {
        console.log(info, 'info')        // let SPACE_DEFAULT = right === 'Que x Price' ? left === 'Total :' ? 30 : 24 : 32;
        let SPACE_DEFAULT = size ? size : 32;

        let contentLeft = left
        let contentRight = parseFloat(right).toFixed(4)

        let leftLen = contentLeft.length
        let rightLen = contentRight.length
        let spaceLen = SPACE_DEFAULT - leftLen - rightLen
        let space = ''
        for (let i = 0; i < spaceLen; i++) {
            space = space + ' '
        }
        let str1 = space.concat(right);
        let str2 = contentLeft.concat(str1);
        return str2;
    }

    const printTextTest = () => {

        let textOrder = '';
        orderList.map((e, i) => {
            let singleOrder = '';
            if (orderList?.length === i - 1) {
                singleOrder = `${ContentBill(e.name, `${e.price}'x'${e.selectedDish.dishPrice}`)}`
                textOrder = textOrder.concat(singleOrder)
            } else {
                singleOrder = `${ContentBill(e.name, e.price + 'x' + e.selectedDish.dishPrice)}\n`
                textOrder = textOrder.concat(singleOrder)
            }


        });
        let tableName = '';
        let table = info?.tableNumber;

        let digits = table.toString().split('');
        let realDigits = digits.map(Number);
        if (realDigits && realDigits.length === 2) {
            tableName = 'Table:' + realDigits[0] + '  Order:' + realDigits[1];
        } else if (realDigits && realDigits.length === 3) {
            tableName = 'Table:' + realDigits[0] + '  Order:' + realDigits[2];
        } else {
            tableName = 'Table:' + info?.tableNumber;
        }
        console.log(realDigits);

        if (currentPrinter) {
            setModalVisible(!modalVisible)
            onProceed()
            let dashLine = '<C>-------------------------------</C>\n';
            let dateTime = moment().format("DD-MM-YYYY hh:mm A");
            BLEPrinter.printText(`<CD>${session?.userInfo?.hotelName}</CD>\n<C>${session?.userInfo?.address}</C>\n<C>${session?.userInfo?.phone}</C>\n${dashLine}<D>${tableName}</D>\n${ContentBill('Name', 'Que x Price', 24)}\n${textOrder}\n<M>${ContentBill('Total :', info?.totle, 36)}</M>\n${dashLine}${ContentBill(dateTime, paymentType, paymentType === 'Google Pe' ? 25 : paymentType === 'Phone Pe' ? 26 : 30)}\n<C>Thank You Visit Again</C>`);
        } else {
            alert('Printer Not Connected  !')
        }

    };




    const PrintView = () => {

        return (
            <View style={{ width: '90%' }}>
                {!currentPrinter && <Text>Connect Printer</Text>}
                {!currentPrinter &&
                    printers.map((printer, idPrinter) => (
                        printer.device_name === "MPT-II" && <TouchableOpacity key={printer.inner_mac_address} style={{ margin: 5, backgroundColor: 'green', padding: 5, width: '95%', borderRadius: 5 }} onPress={() => {
                            BLEPrinter.connectPrinter(printer.inner_mac_address).then(
                                setCurrentPrinter,
                                (error) => console.warn(error)
                            );
                        }}>
                            <Text style={{ color: 'white' }}> AD-Printer : {idPrinter + 1}</Text>
                        </TouchableOpacity>
                    ))
                }
                <Button style={styles.btnStyle} mode={"outlined"}
                    onPress={printTextTest}>
                    <Text style={[styles.blueColor]}>
                        <IonicIcons name="print" style={styles.icon} size={18} color={Colors.primary} />
                        Print & Complete</Text>

                </Button>

            </View>

        );
    };


    const TypeOfPayment2 = ({ filterDishWise, dishDetails }) => {

        return (
            <ScrollView horizontal={true}>
                <View style={styles.radioGroup}>



                    <Button style={styles.btnStyle} mode={currentIndex === 3 ? "contained" : "outlined"} onPress={() => {
                        setCurrentIndex(3);
                        setPaymentType('Google Pe')
                    }}>

                        <Text style={[currentIndex === 3 ? styles.whiteColor : styles.blueColor]}>Google Pe</Text>
                    </Button>

                    <Button style={styles.btnStyle} mode={currentIndex === 2 ? "contained" : "outlined"} onPress={() => {
                        setCurrentIndex(2);
                        setPaymentType('Phone Pe')
                    }}>

                        <Text style={[currentIndex === 2 ? styles.whiteColor : styles.blueColor]}>Phone Pe</Text>
                    </Button>

                </View>
            </ScrollView >

        );
    };
    const TypeOfPayment = ({ filterDishWise, dishDetails }) => {

        return (
            <ScrollView horizontal={true}>
                <View style={styles.radioGroup}>
                    <Button style={styles.btnStyle} mode={currentIndex === 1 ? "contained" : "outlined"} onPress={() => {
                        setCurrentIndex(1);
                        // onChangeText('Cash', 'paymentType')
                        setPaymentType('Cash')
                    }}>

                        <Text style={[currentIndex === 1 ? styles.whiteColor : styles.blueColor]}>Cash</Text>
                    </Button>
                    <Button style={styles.btnStyle} mode={currentIndex === 4 ? "contained" : "outlined"} onPress={() => {
                        setCurrentIndex(4);
                        // onChangeText('Online', 'paymentType');
                        setPaymentType('PayTm')
                    }}>

                        <Text style={[currentIndex === 4 ? styles.whiteColor : styles.blueColor]}>PayTm</Text>
                    </Button>

                    <Button style={styles.btnStyle} mode={currentIndex === 5 ? "contained" : "outlined"} onPress={() => {
                        setCurrentIndex(5);
                        // onChangeText('All', 'paymentType');
                        setPaymentType('Other')
                    }}>
                        <Text style={[currentIndex === 5 ? styles.whiteColor : styles.blueColor]}>Other</Text>

                    </Button>
                </View>
            </ScrollView >

        );
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {'Thank you'}
                        </Text>
                        <Text style={styles.modalTextPrice}>
                            <Text style={styles.modalTextTotle}>{' Table ' + info?.tableNumber + ' : '}</Text>{info?.totle}
                        </Text>
                        <TypeOfPayment2 />

                        <TypeOfPayment />
                        <PrintView />
                        <View style={{ flexDirection: "row" }}>

                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.btn]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    // onProceed()
                                }}
                            >
                                <Text style={styles.textStyle}>{'Close'}</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.btn]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    onProceed()
                                }}
                            >
                                <Text style={styles.textStyle}>{'Complete'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    btn: { marginVertical: 10, height: 45, marginHorizontal: 18, alignItems: 'center', justifyContent: 'center', },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 20
    },
    modalText: {
        marginBottom: 10,
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold'
    },
    modalTextPrice: {
        marginBottom: 10,
        fontSize: 25,
        textAlign: "center",
        fontWeight: 'bold',
        color: 'green'
    },
    modalTextTotle: {
        marginBottom: 10,
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold',
        color: 'gray'
    },
    radioGroup: {
        flexDirection: 'row', alignContent: 'center', padding: 15, marginVertical: 10, alignItems: 'center',
        width: '100%', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderBottomColor: Colors.primary,
        borderTopColor: Colors.primary

    },
    btnStyle: {
        marginRight: 5,
        borderRadius: 5,
        margin: 5,

    },
    icon: {
        textAlign: 'right',
        marginRight: 10,
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
});


export default SuccessModel;