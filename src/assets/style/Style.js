import React from "react";
import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
    container: {
        backgroundColor: "#2D3250",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between', // Adjusted to 'space-between'
        flexDirection: 'column',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center', // Center the logo vertically
    },
    logo: {
        width: 212,
        height: 85,
    }
});

export default Style;