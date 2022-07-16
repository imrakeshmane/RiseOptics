import React, { useEffect, useState } from 'react';
import Button from 'react-native-button';
import { ActivityIndicator, Text, View, StyleSheet, TextInput } from 'react-native';
import { AppStyles } from '../../../../AppStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import useSession from '../../../../appContext/useSession';
import Api from '../../../../utils/Api';
import Toaster from '../../../../component/toaster/toaster';



const CreateUser = ({ navigation }) => {
    const { session, setSession } = useSession();
    console.log(session, 'session')

    const [userDetails, setUserDetails] = useState({
        ClientName: "",
        clientPhone: "",
        clinetAddress: "",
        userId: session?.id,
        employeeId: "",
        clientCreatedDate: "",
        ClientIsActive: "1",
        ClientIsDeleted: "",
    });
    const [showLoader, setLoader] = useState(false);

    const onPressSubmit = () => {
        if (userDetails.ClientName !== "" && userDetails.clientPhone !== "" && userDetails.clinetAddress !== "") {

            setLoader(true);
            console.log(userDetails, 'userDetails')
            debugger
            Api.postApi(userDetails, 'client.php')
                .then(response => {
                    console.log(response, 'response')
                    if (response.status === 200 && response?.data?.status === 200) {
                        Toaster(response?.data?.message);
                        setUserDetails({
                            ClientName: "",
                            clientPhone: "",
                            clinetAddress: "",
                            userId: session?.id,
                            employeeId: "",
                            clientCreatedDate: "",
                            ClientIsActive: "1",
                            ClientIsDeleted: "",
                        });
                    } else {
                        Toaster('System Error');
                    }
                    setLoader(false)
                })
                .catch(error => {
                    setLoader(false);
                    console.log(error, 'login error.response.data')
                    if (error?.response?.data) {
                        setErrorMsg(error.response.data?.message);
                    }
                })
        } else {
            if (!userDetails.clientPhone) {
                Toaster('Please enter!')
            } else {
                Toaster('Please enter..!')
            }
        }
        // riseoptics.riseavenuesystems.com/OpticsAPI/client.php?id=1
    }

    return (

        <View style={styles.container}>
            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.body}
                    placeholder="User Name"
                    onChangeText={(value) => {
                        setUserDetails({ ...userDetails, ClientName: value })
                    }}
                    value={userDetails.ClientName}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.body}
                    placeholder="Phone Number"
                    onChangeText={(value) => {
                        setUserDetails({ ...userDetails, clientPhone: value })
                    }}
                    keyboardType='numeric'
                    value={userDetails.clientPhone}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={styles.InputContainer}>
                <TextInput
                    style={styles.bodyaddress}
                    placeholder="Address"
                    multiline={true}
                    onChangeText={(value) => {
                        setUserDetails({ ...userDetails, clinetAddress: value })
                    }}
                    value={userDetails.clinetAddress}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                />
            </View>

            <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => onPressSubmit()}>
                {showLoader === false ? "Submit" : <ActivityIndicator
                    // style={}
                    // size="large"
                    animating={showLoader}
                    color={AppStyles.color.white}
                />}
            </Button>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
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
    bodyaddress: {
        height: 100,
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

export default CreateUser;
