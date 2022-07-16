import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    USBPrinter,
    NetPrinter,
    BLEPrinter,
} from "react-native-thermal-receipt-printer";

import BleManager from 'react-native-ble-manager';


const SamplePrint = () => {

    const [printers, setPrinters] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState();

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
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // permissionForBluetoothOnOFF();
                console.log("You can use the BLUETOOTH_CONNECT");
            } else {
                console.log("BLUETOOTH_CONNECT permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // const permissionForBluetoothScan = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    //             {
    //                 title: "BLUETOOTH_SCAN Permission",
    //                 message:
    //                     "Cool Photo App needs access to your BLUETOOTH_SCAN " +
    //                     "so you can take awesome pictures.",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("You can use the BLUETOOTH_SCAN");
    //         } else {
    //             console.log("BLUETOOTH_CONNECT BLUETOOTH_SCAN denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    // useEffect(() => {
    //     permissionForBluetoothConnect();
    //     BleManager.enableBluetooth()

    //     BLEPrinter.init().then(() => {
    //         BLEPrinter.getDeviceList().then(setPrinters);
    //     });
    // }, []);
    // const [printers, setPrinters] = useState([]);
    // const [currentPrinter, setCurrentPrinter] = useState();

    useEffect(() => {
        permissionForBluetoothConnect()
        BLEPrinter.init().then(() => {
            BLEPrinter.getDeviceList().then(setPrinters);
        });
    }, []);

    const _connectPrinter = () => (printer) => {
        //connect printer
        BLEPrinter.connectPrinter(printer.inner_mac_address).then(
            setCurrentPrinter,
            (error) => console.warn(error)
        );
    };

    const printTextTest = () => {
        debugger
        // currentPrinter && BLEPrinter.printText("this is new print");

        // BLEPrinter.printText("<CD>Hotel Varad</CD>");
        BLEPrinter.printText("<CD>Hotel Varad</CD>\n<C>sample text bjhbfhjbdjhfbjfhdvfjdvhjdbfjbjhfdbghj \nfbgbhjfdgbjfdhbgbjhdfgbjhdfbghjdbghdbjgdhhb\ngghdjfhbgjdfbgbhjd</C>\n");
    };

    const printBillTest = () => {
        debugger

        currentPrinter && BLEPrinter.printBill("this is for bill testing");
    };
    return (
        <View >
            {
                printers.map(printer => (
                    <TouchableOpacity key={printer.inner_mac_address} style={{ margin: 5, backgroundColor: 'green', padding: 10 }} onPress={() => {
                        debugger
                        BLEPrinter.connectPrinter(printer.inner_mac_address).then(
                            setCurrentPrinter,
                            (error) => console.warn(error)
                        );
                    }}>
                        <Text style={{ color: 'white' }}>  {`device_name: ${printer.device_name}`}</Text>

                        {/* <Text style={{ color: 'white' }}>  {` inner_mac_address: ${printer.inner_mac_address}`}</Text> */}
                    </TouchableOpacity>
                ))
            }
            <TouchableOpacity onPress={printTextTest} style={{ margin: 20, backgroundColor: 'red', padding: 30 }}>
                <Text>Print Text</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={printBillTest} style={{ margin: 20, backgroundColor: 'red', padding: 30 }}>
                <Text>Print Bill Text</Text>
            </TouchableOpacity>
        </View>
    )

}

export default SamplePrint;
