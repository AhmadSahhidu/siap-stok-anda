import React from "react";
import { StyleSheet, Text, View } from "react-native";


const MessageInfo = ({ open = false, status = 'success', message = '', onClose }) => {
    return (
        <View style={classes.container}>
            {
                open ?
                    <View style={classes[status]}>
                        <Text style={classes.text}>{message}</Text>
                        <Text style={classes.textX} onPress={onClose}>x</Text>
                    </View>
                    : null
            }
        </View>
    )
}

const classes = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    success: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#36AE7C',
        borderRadius: 10,

    },
    error: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(242, 133, 133, 0.9)',
        borderRadius: 10,

    },
    warning: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(246, 177, 122, 0.9)',
        borderRadius: 10,

    },
    text: {
        flex: 1,
        color: 'white'
    },
    textX: {
        paddingVertical: 2,
        textAlign: 'center',
        paddingHorizontal: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
    }
});

export default MessageInfo;