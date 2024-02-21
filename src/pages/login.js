import React, { useState } from "react";
import { Button, Image, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import StyleLogin from "../assets/style/StyleLogin";
import { BgLogin, LogoKotak } from "../assets";
import MessageInfo from "../components/MessageAlert/MessageInfo";
import axios from "axios";
import { login } from "../api/LoginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Style = StyleLogin;

const Login = ({ navigation }) => {

    const [fields, setFields] = useState({
        username: '',
        password: ''
    });

    const [alert, setAlert] = useState({
        message: '',
        status: false,
        open: false
    })

    const handleFields = (id, value) => {
        setFields({
            ...fields,
            [id]: value
        })
    }

    const handleLogin = async () => {
        if (fields.username === '' || fields.password === '') {
            setAlert({
                ...alert,
                open: true,
                status: 'error',
                message: 'Silahkan cek kembali username & password anda'
            })
        } else {
            try {
                let res = await login(fields);
                setAlert({
                    ...alert,
                    open: true,
                    status: res.data.status,
                    message: res.data.message
                });

                await AsyncStorage.setItem('users', res.data.user.name);
                await AsyncStorage.setItem('user_id', res.data.user.id);
                await AsyncStorage.setItem('user_role', res.data.user.role);

                navigation.navigate('Dashboard');
            } catch (error) {
                setAlert({
                    ...alert,
                    open: true,
                    status: 'error',
                    message: 'User tidak ditemukan'
                });
            }


        }

    }

    const handleAlertClose = () => {
        setAlert({
            ...alert,
            open: !alert.open
        })
    }

    return (
        <ImageBackground source={BgLogin} style={Style.container}>

            <View style={Style.containerTmpLogin}>
                <MessageInfo open={alert.open} status={alert.status} message={alert.message} onClose={handleAlertClose} />
                <Image source={LogoKotak} style={Style.logo} />
                <Text style={Style.txtTitle}>Form Login</Text>
                <TextInput placeholder="Username" onChangeText={(e) => handleFields('username', e)} style={Style.inputText} />
                <TextInput placeholder="Password" onChangeText={(e) => handleFields('password', e)} secureTextEntry={true} style={Style.inputText} />
                <Pressable style={Style.button} onPress={handleLogin}>
                    <Text style={Style.text}>Sign In</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

export default Login;