import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import useSession from "../../appContext/useSession";
import { AppStyles } from "../../AppStyles";
import { ImageName } from "../../constant";
import Colors from "../../constant/Colors";

const SplashScreen = () => {
    const [hotelName, setHotelname] = useState('')
    const getDataFromAsync = async () => {
        let user = await AsyncStorage.getItem('ProfileInfo');
        let data = JSON.parse(user);
        // const { userInfo } = data;
        // console.log(userInfo, 'ProfileInfo splas')
        if (data?.userInfo) {
            const { userInfo } = data;
            setHotelname(userInfo?.hotelName)
        }
    }
    useEffect(() => {
        getDataFromAsync()
    }, [])
    const { session, setSession } = useSession();


    return <View style={styles.container}>
        <ImageBackground
            style={{
                flex: 1,
                justifyContent: "center"
            }}
            source={ImageName.splashbackground}
        >
            <View style={{ flex: 1 }} >

                {
                    hotelName !== '' ? <View style={{ flex: 0.6, justifyContent: "flex-end", alignItems: "center" }}>
                        {/* <Image style={styles.Img} source={ImageName.splashsreen} /> */}
                        <Text style={styles.h1}>{hotelName}</Text>
                    </View>

                        : <View style={{ flex: 0.6, justifyContent: "flex-end", alignItems: "center" }}>
                            {/* <Image style={styles.Img} source={ImageName.splashsreen} /> */}
                            <Text style={styles.h1}>{'Rise Optics'}</Text>
                        </View>
                }


                <View style={{ flex: 0.4, padding: 20, justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 12, fontWeight: "700", color: Colors.accent }}>Powered By <Text style={{ fontSize: 14, color: AppStyles.color.tint, }}>RiseAvenue System</Text></Text>
                </View>
            </View>
        </ImageBackground>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    h1: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 16,
        color: AppStyles.color.tint,
    },
    horizontal: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
    },
    Img: {
        width: '50%',
        height: 100
    },
    Img2: {
        width: '80%',
        height: 140
    },
    creaditView: {

    },
    CreaditText: {

    }
});

export default SplashScreen;