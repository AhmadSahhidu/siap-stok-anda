import React from "react";
import { StyleSheet } from "react-native";

const StyleProduct = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    tmpList: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        borderLeftWidth: 3,
        borderLeftColor: '#f0f',
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tmpListImage: {
        marginRight: 25,
        width: 30,
        height: 30,
    },
    tmpDesc: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 10
    },
    nameProduct: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    sizeProduct: {
        fontSize: 10,
        color: '#949494'
    },
    categori: {
        width: '100%',
        marginBottom: 20,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 13,
    },
    listCategory: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    btnSearch: {
        padding: 12,
        backgroundColor: '#265073',
        borderRadius: 10,
    },
    btnSearchModal: {
        padding: 13,
        backgroundColor: '#265073',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 32,
        alignItems: 'flex-start',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textSearch: {
        borderWidth: 1,
        borderColor: '#535C91',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    }
});

export default StyleProduct;