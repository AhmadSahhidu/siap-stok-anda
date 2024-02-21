import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import { getDataProductAPI } from "../../api/ProductApi";

const ScanStok = ({ navigation }) => {

    const [info, setInfo] = useState('');

    const handleScanProduck = async (data) => {
        try {
            let product = await getDataProductAPI(data);

            navigation.navigate('View Stok', { product: product.data });
        } catch (error) {
            setInfo('Ada kesalahan saat scan silahkan periksa barcode anda atau koneksi anda');
        }

    }

    return (
        <QRCodeScanner
            onRead={({ data }) => handleScanProduck(data)}
            reactivate={true}
            showMarker={true}
            topContent={
                <Text>{info}</Text>
            }
            bottomContent={
                <TouchableOpacity onPress={() => handleScanProduck('041168040224NDURS')}>
                    <Text>OK. Got it!</Text>
                </TouchableOpacity>
            }
            reactivateTimeout={500}
        />
    )
}

export default ScanStok;