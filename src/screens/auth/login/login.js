import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Button from 'react-native-button';
import { AppStyles } from '../../../AppStyles';
import Api from '../../../utils/Api';




const Login = ({ navigation }) => {
    const [showLoader, setshowLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
    }, []);
    const loderTimer = async () => {
        setTimeout(() => {
            if (showLoader) {
                setshowLoader(false);
            }
        }, 20000);
    }


    const [loginParams, setLoginParums] = useState({
        email: '',
        password: ''
    });

    const [showErorMsg, setErrorMsg] = useState('');

    const onPressLogin = () => {

        setErrorMsg('');
        if (loginParams.email && loginParams.password) {
            setErrorMsg('');
            setshowLoader(true);
            loderTimer()
            let formDataText = {
                'email': loginParams.email,
                'password': loginParams.password
            }

            // return new Promise((resolve, reject) => {
            Api.getApi('userFunction.php?id=1', 'sjdhbckjhsdbv')
                .then(response => {
                    console.log(response, 'login')
                    if (response.status === 200 && response?.data?.length !== 0) {
                        AsyncStorage.setItem('UserInfo', JSON.stringify({
                            userInfo: response?.data[0],
                        }
                        ));

                        setshowLoader(false);

                    } else if (response?.data?.status === 422 && response?.data?.success === 0) {
                        setErrorMsg(response?.data?.message);
                    } else if (response?.data?.success === 0) {
                        setErrorMsg(response?.data?.message);
                    } else {
                        setErrorMsg('API Error');
                    }
                    setshowLoader(false);
                    // resolve(response)
                })
                .catch(error => {
                    setshowLoader(false);
                    console.log(error, 'login error.response.data')
                    if (error?.response?.data) {
                        setErrorMsg(error.response.data?.message);
                    }
                    //alert(JSON.stringify(error))
                });
            // });

        } else {
            if (!loginParams.email) {
                setErrorMsg('Please enter Email or Mobile..!')
            } else {
                setErrorMsg('Please enter Password..!')
            }
        }

    }


    return (<>

        {showLoader ?
            <View style={styles.container}>
                <ActivityIndicator
                    style={{ marginTop: 30 }}
                    size="large"
                    animating={showLoader}
                    color={AppStyles.color.tint}
                />
            </View> :
            <View style={styles.container}>
                <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.body}
                        placeholder="Phone Number"
                        onChangeText={(value) => {
                            setLoginParums({ ...loginParams, email: value })
                        }}
                        value={loginParams.email}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.body}
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(value) => {
                            setLoginParums({ ...loginParams, password: value })
                        }}
                        value={loginParams.password}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <Button
                    containerStyle={styles.loginContainer}
                    style={styles.loginText}
                    onPress={() => onPressLogin()}>
                    Log in
                </Button>

            </View>
        }

    </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    or: {
        color: 'black',
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 20,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
    },
    content: {
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'center',
        fontSize: AppStyles.fontSize.content,
        color: AppStyles.color.text,
    },
    loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        // width: '80%'
    },
    loginText: {
        color: AppStyles.color.white,
    },
    placeholder: {
        color: 'red',
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main,
        backgroundColor: AppStyles.color.white,
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    facebookContainer: {
        width: 192,
        backgroundColor: AppStyles.color.facebook,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    facebookText: {
        color: AppStyles.color.white,
    },
    googleContainer: {
        width: 192,
        height: 48,
        marginTop: 30,
    },
    googleText: {
        color: AppStyles.color.white,
    },
});

export default Login;
