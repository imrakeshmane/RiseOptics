import React, { useEffect, useState } from 'react';
import Button from 'react-native-button';
import { ActivityIndicator, Text, View, StyleSheet, Alert } from 'react-native';
import { AppStyles } from '../../../AppStyles';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import { NavigationUrl } from '../../../strings/navigationUrl';
import Api from '../../../utils/Api';



const HomePage = ({ navigation }) => {
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        getuserList()
    }, [])
    const getuserList = () => {
        setLoader(true);
        Api.getApi('client.php?userId=1', 'test')
            .then(response => {
                console.log(response, 'client')
                if (response.status === 200 && response?.data?.length !== 0) {
                    setLoader(false);
                } else {
                }
                setLoader(false);
            })
            .catch(error => {
                setLoader(false);
            });
    }

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Say hello to your new app</Text> */}
            <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => navigation.navigate(NavigationUrl.creatUser)}>
                Create
            </Button>
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
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
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
});

export default HomePage;
