import React from "react";
import { StyleSheet } from "react-native";

const Styleinfo = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 30,
        position: 'relative',
    },
    formGroup: {
        marginBottom: 25
    },
    label: {
        fontSize: 12,
        color: '#474F7A',
    },
    textinput: {
        fontSize: 20,
        fontWeight: '900',
        paddingVertical: 10,
        paddingHorizontal: 0,
        fontFamily: 'NotoSans',
        borderRadius: 3,
        borderBottomWidth: 1,
        color: '#161A30',
        borderBottomColor: '#B6BBC4'
    },
    btnSave: {
        width: '100%',
        paddingVertical: 13,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#31304D',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 20,
        letterSpacing: 2,
        borderRadius: 3
    },
    tmpLoading: {
        alignContent: "end",
        justifyContent: 'start',
        display: 'flex',
        flexDirection: 'row',
        color: 'white'
    },
    alertTmp: {
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 25,
        width: '100%',
    }
});


export default Styleinfo;