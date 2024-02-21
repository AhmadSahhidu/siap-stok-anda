import React from "react";
import { StyleSheet } from "react-native";

const StyleLogin = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTmpLogin: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        flexDirection: 'column',
    },
    logo: {
        width: 75,
        height: 75,
        marginTop: 50,
    },
    txtTitle: {
        fontSize: 20,
        color: "#000",
        fontFamily: 'NotoSans-Bold',
        marginTop: 75
    },
    inputText: {
        width: '100%',
        backgroundColor: '#ebebed',
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: '100%',
        backgroundColor: '#2D3250',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default StyleLogin;