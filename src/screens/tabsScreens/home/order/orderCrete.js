import React, { useEffect, useState } from 'react';
import Button from 'react-native-button';
import { ActivityIndicator, Text, View, StyleSheet, TextInput } from 'react-native';
import { AppStyles } from '../../../../AppStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';



const OrderCreate = ({ navigation }) => {


    const [plusActive, setPlusActove] = useState(true);
    const [userDetails, setUserDetails] = useState({
        ClientName: "",
        clientPhone: "",
        clinetAddress: "",
        userId: "",
        employeeId: "",
        clientCreatedDate: "",
        ClientIsActive: "",
        ClientIsDeleted: "",
    });


    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Say hello to your new app</Text> */}
            <View style={styles.plusContainer}>
                <Button
                    containerStyle={plusActive ? styles.loginContainerSelcted : styles.loginContainer}
                    style={styles.loginText}
                    onPress={() => setPlusActove(true)}>
                    <IonicIcons name="add" style={styles.icon} size={30} color={plusActive ? 'white' : AppStyles.color.tint} />
                </Button>
                <Button
                    containerStyle={!plusActive ? styles.loginContainerSelcted : styles.loginContainer}
                    style={styles.loginText}
                    onPress={() => setPlusActove(false)}>
                    <IonicIcons name="remove" style={styles.icon} size={30} color={!plusActive ? 'white' : AppStyles.color.tint} />
                </Button>
            </View>
            <View style={styles.container}>
                <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
                <View style={styles.InputContainer}>
                    <TextInput
                        style={styles.body}
                        placeholder="Phone Number"
                        onChangeText={(value) => {
                            setUserDetails({ ...userDetails, email: value })
                        }}
                        value={userDetails.email}
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
                            setUserDetails({ ...userDetails, password: value })
                        }}
                        value={userDetails.password}
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
            {/* <Button
                containerStyle={styles.signupContainer}
                style={styles.signupText}
                onPress={() => navigation.navigate('Signup')}>
                Sign Up
            </Button> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 150,
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 10,
        flex: 1,
        height: 50,
        marginHorizontal: 10
    },
    loginContainerSelcted: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 10,
        flex: 1,
        height: 50,
        marginHorizontal: 10
    },
    loginText: {
        color: AppStyles.color.white,
    },
    signupContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 8,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop: 15,
    },
    signupText: {
        color: AppStyles.color.tint,
    },
    spinner: {
        marginTop: 200,
    },
    plusContainer: {
        marginHorizontal: 50,
        flex: 1,
        flexDirection: 'row'
    },
    icon: {

        alignSelf: 'center'
    }
});

export default OrderCreate;
