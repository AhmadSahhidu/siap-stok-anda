import React from "react";
import { StyleSheet } from "react-native";

const StyleDashboard = StyleSheet.create({
    container: {
        backgroundColor: "#EFECEC",
        flex: 1,
    },
    tmpHeader: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20
    },
    iconUsers: {
        width: 50,
        height: 50
    },
    textWelcome: {
        marginLeft: 20,
        color: '#474F7A',
    },
    textTitleQuest: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424769'
    },
    tmpNavigation: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 25,
    },
    listNav: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        color: '#000',
        shadowColor: '#f0f',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
        alignItems: 'center',
        gap: 20,
        marginBottom: 10
    },
    iconList: {
        width: 35,
        height: 35,
    },
    textList: {
        fontSize: 15,
        fontFamily: 'NotoSans-Bold',
        color: '#474F7A',
    },
    textUsers: {
        fontSize: 15,
        fontWeight: "900",
        fontFamily: 'NotoSans'
    },
});

export default StyleDashboard;