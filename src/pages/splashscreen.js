import React, { useEffect } from "react";
import { View, Text, Image } from 'react-native';
import Style from "../assets/style/Style";
import { Logo } from "../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {

        const loadData = async () => {
            let dataLogin = await AsyncStorage.getItem('user_id');
            setTimeout(() => {
                if (dataLogin !== null) {
                    navigation.replace('Dashboard');
                } else {
                    navigation.replace('Login');
                }
            }, 5000);
        }
        loadData();
    }, []);

    return (
        <View style={Style.container}>
            <View style={Style.logoContainer}>
                <Image source={Logo} style={Style.logo} />
            </View>
            {/* <Text style={Style.textFields}>Siap Toko Anda</Text> */}
        </View>
    )
}

export default SplashScreen;