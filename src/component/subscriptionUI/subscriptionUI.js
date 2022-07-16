

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ImageName } from "../../constant";
import Colors from "../../constant/Colors";

const SubscribeUser = () => (
    <>
        <View style={[styles.container, styles.horizontal]}>

            {/* <ActivityIndicator size="large" color="#1a73e8" /> */}
            <Image style={styles.Img} source={ImageName.scuscribe} />
            <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.accent }}>Please Contact to admin or subscribe</Text>
        </View>
        <View style={{ paddingBottom: 20, paddingHorizontal: 20, justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 12, fontWeight: "700", color: Colors.accent }}>Powered By <Text style={{ fontSize: 14, color: Colors.primary }}>RiseAvenue System</Text></Text>
            <Text style={{ fontSize: 12, fontWeight: "500", color: Colors.accent }}>Contact Us <Text style={{ fontSize: 14, color: Colors.primary }}>8668263690</Text></Text>
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    horizontal: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10,
    },
    Img: {
        height: 180,
        width: 150,
    }
});

export default SubscribeUser;