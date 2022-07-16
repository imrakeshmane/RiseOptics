import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loader = () => (
    <View style={[styles.container, styles.horizontal]}>

        <ActivityIndicator size="large" color="#1a73e8" />
    </View>
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
    }
});

export default Loader;