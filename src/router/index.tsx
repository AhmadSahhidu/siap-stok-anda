import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../pages/splashscreen';
import Login from '../pages/login';
import Dashboard from '../pages/Dashboard';
import ScanStok from '../pages/Stok/scan';
import ViewStok from '../pages/Stok/info';
import Product from '../pages/Product';
import Delivery from '../pages/Delivery';
import ListAntrianDeveloper from '../pages/Delivery/list-antrian';
import { AdjustmentsVerticalIcon, BarsArrowDownIcon, SwatchIcon } from 'react-native-heroicons/outline';
import HistoryDelivery from '../pages/Delivery/history';


const Stack = createNativeStackNavigator();
const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false, statusBarHidden: true }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Scan Stok" component={ScanStok} options={{ headerShown: false }} />
            <Stack.Screen name="View Stok" component={ViewStok} options={{
                headerBackButtonMenuEnabled: true,
                headerTitle: 'COLLECTION STOK',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 15,
                    fontFamily: 'NotoSans-Bold',
                    fontWeight: "900",
                    color: '#0A1D56'
                },
                statusBarColor: '#EEEEEE',
                headerStyle: {
                    backgroundColor: '#EEEEEE',
                },
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: '#EEEEEE',
                }
            }} />
            <Stack.Screen name='Product' component={Product} options={{
                headerTitleStyle: {
                    fontFamily: 'NotoSans',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerTitle: 'List Product',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Delivery' component={Delivery} options={{
                headerTitleStyle: {
                    fontFamily: 'NotoSans',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerTitle: 'Delivery List',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Delivery Queue' component={ListAntrianDeveloper} options={({ navigation }) => ({
                headerTitleStyle: {
                    fontFamily: 'NotoSans',
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerTitle: ' ',
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: '#fff',
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('History Delivery')} style={classes.tmpHistory}>
                        <BarsArrowDownIcon width={20} height={20} color={'#474F7A'} /><Text>History</Text>
                    </TouchableOpacity>
                ),
            })} />
            <Stack.Screen name='History Delivery' component={HistoryDelivery} options={{
                headerTitleStyle: {
                    fontFamily: 'NotoSans',
                    fontWeight: 'bold',
                },
                headerTitle: 'History',
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: '#fff',
                },
            }} />
        </Stack.Navigator>
    )
}

const classes = StyleSheet.create({
    tmpHistory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
})

export default Router