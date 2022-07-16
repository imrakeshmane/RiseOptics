

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
// import Loader from '../../components/Loader/Loader'
// import Colors from '../../utils/Colors';
// import Api from '../../../utils/Api';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../../component/loader/loader';
import Toaster from '../../../component/toaster/toaster';
import { ImageName } from '../../../constant';
import Colors from '../../../constant/Colors';
import Api from '../../../utils/Api';
// import ToastComponent from '../../../components/ToastComponent/Toaster';
import validation from '../../../utils/validation';
// import Validation from '../../../components/validations/validation';


const SignUp = (props) => {

    const [registerParams, setRegisterParams] = useState({
        "address": "",
        "email": "",
        "firstName": "",
        "hotelType": "",
        "isActivated": 'true',
        "isDeleted": 'false',
        "isSub": 'false',
        "lastName": "",
        "paidAmount": "",
        "password": "",
        "phone": "",
        "pincode": "",
        "subDate": "",
        "cPassword": '',
        "hotelName": '',
        "tableNumber": 10
    });
    const [showErorMsg, setErrorMsg] = useState('test');
    const [isOTPSend, setIsOTP] = useState(false);
    const { navigation } = props;
    const [showLoader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        setErrorMsg('');
    }, []);

    const setSyncNull = async () => {
        AsyncStorage.setItem('orderInfo', null);
    }
    const RegisterAPI = () => {
        if (registerParams.firstName !== "" && (registerParams.email && registerParams.phone)) {
            if (!validation.validateEmail(registerParams.email) && registerParams.email) {
                setErrorMsg('Invalid Email..!');
                Toaster('Invalid Email..!');

                return
            }
            if (registerParams.phone) {
                var Value = registerParams.phone.length;
                if (Value !== 10) {
                    setErrorMsg('Please Enter Valid Mobile Number..!');
                    Toaster('Please Enter Valid Mobile Number..!');

                    return
                }

            }
            if (registerParams.password !== registerParams.cPassword) {
                setErrorMsg('Password Not Match');
                Toaster('Password Not Match');

                return

            }
            setErrorMsg('');
            setLoader(true);
            console.log(registerParams, 'register.php')

            return new Promise((resolve, reject) => {
                Api.postApi(registerParams, 'register.php')
                    .then(response => {
                        console.log(response, 'register.php')
                        if (response.status === 200 && response?.data?.success === 1) {

                            setRegisterParams({
                                "address": "",
                                "email": "",
                                "firstName": "",
                                "hotelType": "",
                                "isActivated": 'true',
                                "isDeleted": 'false',
                                "isSub": 'false',
                                "lastName": "",
                                "paidAmount": "",
                                "password": "",
                                "phone": "",
                                "pincode": "",
                                "subDate": "",
                                "cPassword": '',
                                "hotelName": '',
                                tableNumber: 10
                            });
                            Toaster(response?.data?.message);
                            setSyncNull()
                            navigation.goBack();
                        } else if (response?.data?.status === 422 && response?.data?.success === 0) {
                            setErrorMsg(response?.data?.message);
                            Toaster(response?.data?.message);

                        } else {
                            setErrorMsg('API Error');
                            Toaster('System Error');
                        }
                        setLoader(false)
                        resolve(response);
                    })
                    .catch(error => {
                        setLoader(false);
                        console.log(error, 'login error.response.data')
                        if (error?.response?.data) {
                            setErrorMsg(error.response.data?.message);
                        }
                    })
            });
        } else {
            if (!registerParams.email) {
                Toaster('Please enter Filds!')
            } else {
                Toaster('Please enter Password..!')
            }
        }
    }
    const [viewPass, setViewPass] = useState(true);
    const [viewPassC, setViewPassC] = useState(true);


    return (
        <>
            {showLoader ? <Loader /> :
                <ScrollView style={styles.safearea}>
                    <View style={styles.container}>

                        <View>
                            <View style={{ width: "100%", height: 200, justifyContent: "center", alignItems: "center" }}>
                                <Image style={styles.Img} source={ImageName.splashsreen} />
                                <Text style={{ fontSize: 26, fontWeight: 'bold', color: Colors.primary }}>Apala-Dhaba</Text>

                            </View>
                            <Text style={styles.errorText}>{showErorMsg}</Text>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>First Name</Text>
                                <TextInput
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, firstName: value })
                                    }}
                                    value={registerParams.firstName}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Last Name</Text>
                                <TextInput
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, lastName: value })
                                    }}
                                    value={registerParams.lastName}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Email</Text>
                                <TextInput
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, email: value })
                                    }}
                                    value={registerParams.email}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>

                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Phone</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, phone: value })
                                    }}
                                    value={registerParams.phone}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Hotel Name</Text>
                                <TextInput
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, hotelName: value })
                                    }}
                                    value={registerParams.hotelName}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>

                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Hotel Table Number</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, tableNumber: value })
                                    }}
                                    value={registerParams.tableNumber}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Address</Text>
                                <TextInput
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, address: value })
                                    }}
                                    value={registerParams.address}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>

                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Pincode</Text>
                                <TextInput
                                    keyboardType='numeric'
                                    onChangeText={value => {
                                        setRegisterParams({ ...registerParams, pincode: value })
                                    }}
                                    value={registerParams.pincode}
                                    style={{ height: 45, color: 'black', borderColor: 'lightgray', borderWidth: 1, borderRadius: 4 }}
                                />
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Password</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 1, }}>
                                    <TextInput
                                        style={{ height: 45, color: 'black', width: '90%', borderRadius: 4 }}
                                        secureTextEntry={viewPass}
                                        onChangeText={value => {
                                            setRegisterParams({ ...registerParams, password: value })
                                        }}
                                        value={registerParams.password}
                                    />
                                    <TouchableOpacity style={{ width: '10%' }} onPress={() => {
                                        setViewPass(!viewPass)
                                    }} >
                                        <Icon name={!viewPass ? "ios-eye" : 'ios-eye-off'} size={30} color={'black'} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={styles.input_div}>
                                <Text style={styles.lable}>Confirm Password</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 1, }}>
                                    <TextInput
                                        style={{ height: 45, color: 'black', width: '90%', borderRadius: 4 }}
                                        secureTextEntry={viewPassC}
                                        onChangeText={value => {
                                            setRegisterParams({ ...registerParams, cPassword: value })
                                        }}
                                        value={registerParams.cPassword}
                                    />
                                </View>
                            </View>
                        </View>

                        <View>
                            <View style={{ marginVertical: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    RegisterAPI()
                                }} style={styles.appButtonContainer} activeOpacity={0.8}>
                                    <Text style={styles.appButtonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                                <View>
                                    <Text style={{ textAlign: 'center', color: 'black' }}> OR </Text>
                                </View>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                            </View>

                        </View>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
                            navigation.navigate('Login');
                        }}>
                            <Text style={{ color: 'black' }}>Already have Account ? <Text style={{ color: Colors.primary }}>Sign In</Text></Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }</>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    Img: {
        width: 180,
        height: 120
    },
    appButtonContainer: {
        elevation: 2,
        backgroundColor: Colors.primary,
        borderRadius: 7,
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    input_div: {
        marginBottom: 5,
    },
    lable: {
        color: '#6c757d',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 6,
    },
    social_icn: {
        borderWidth: 1,
        paddingVertical: 12,
        textAlign: 'center',
        borderColor: 'lightgray',
        width: 150,
        alignItems: "center",
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center'

    },
})


export default SignUp;