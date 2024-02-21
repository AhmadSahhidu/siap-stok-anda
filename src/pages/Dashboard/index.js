import React, { useEffect, useState } from "react";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import StyleDashboard from "../../assets/style/StyleDashboard";
import { BoxIcons, StockIcons, Users } from "../../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

const classes = StyleDashboard;

const Dashboard = ({ navigation }) => {

    useEffect(() => {
        const getUserData = async () => {
            let name = await AsyncStorage.getItem('users');
            let user_id = await AsyncStorage.getItem('user_id');
            let role = await AsyncStorage.getItem('user_role');
            setUsers({
                ...users,
                name: name,
                id: user_id,
                role: role
            })
        }
        getUserData()
    }, [])

    const [users, setUsers] = useState({
        name: '',
        id: '',
        role: '',
    });

    const goToStok = () => {
        navigation.navigate('Scan Stok');
    }


    return (
        <View style={classes.container}>
            <View style={classes.tmpHeader}>
                <Image source={Users} style={classes.iconUsers} />
                <Text style={classes.textWelcome}>Welcome, <Text style={classes.textUsers}>{users.name}</Text></Text>
            </View>
            <Text style={classes.textTitleQuest}>What do you want to do ?</Text>
            <View style={classes.tmpNavigation}>
                <TouchableOpacity style={classes.listNav} onPress={goToStok}>
                    <Image source={StockIcons} style={classes.iconList} />
                    <Text style={classes.textList}>Stok Opname</Text>
                </TouchableOpacity>
                <View style={classes.listNav}>
                    <Image source={BoxIcons} style={classes.iconList} />
                    <Text style={classes.textList}>Produk</Text>
                </View>
            </View>
        </View>
    )
}

export default Dashboard;