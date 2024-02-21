import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../pages/splashscreen';
import Login from '../pages/login';
import Dashboard from '../pages/Dashboard';
import ScanStok from '../pages/Stok/scan';
import ViewStok from '../pages/Stok/info';


const Stack = createNativeStackNavigator();
const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} />
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
        </Stack.Navigator>
    )
}

export default Router