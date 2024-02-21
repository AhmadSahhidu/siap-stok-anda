import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styleinfo from "../../assets/style/StyleInfo";
import DropdownSelect from "react-native-input-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageInfo from "../../components/MessageAlert/MessageInfo";
import { stokOpnameApi } from "../../api/ProductApi";

const classes = Styleinfo;

const ViewStok = ({ route, navigation }) => {

    const { product } = route.params;

    const [master, setMaster] = useState({
        dataProduct: product?.product || {},
        loading: false,
    });
    const [users, setUsers] = useState({
        id: '',
    });
    const [fields, setFields] = useState({
        name: '',
        type: '',
        jumlah: '',
        stok_update: master.dataProduct.stock,
    });

    const [alert, setAlert] = useState({
        message: '',
        status: false,
        open: false
    })

    useEffect(() => {
        const getUserData = async () => {
            let user_id = await AsyncStorage.getItem('user_id');
            setUsers({
                ...users,
                id: user_id,
            })
        }
        getUserData()
    }, [])

    const handleFields = (id, value) => {
        if (id === 'jumlah') {
            if (value !== "") {
                if (fields.type === 'addition') {
                    setFields({
                        ...fields,
                        [id]: value,
                        stok_update: master.dataProduct.stock + parseInt(value)
                    })
                } else if (fields.type === 'subtraction') {
                    setFields({
                        ...fields,
                        [id]: value,
                        stok_update: master.dataProduct.stock - parseInt(value)
                    });
                } else {
                    setFields({
                        ...fields,
                        [id]: '',
                    });
                    setAlert({
                        ...alert,
                        open: true,
                        status: 'error',
                        message: 'Silahkan masukkan type stok dahulu'
                    });
                }

            } else {
                setFields({
                    ...fields,
                    [id]: value,
                    stok_update: master.dataProduct.stock
                })
            }

        } else {
            setFields({
                ...fields,
                [id]: value,
                jumlah: '',
                stok_update: master.dataProduct.stock
            })
        }
    }

    const handleSaveStok = async () => {
        try {
            setMaster({
                ...master,
                loading: !master.loading,
            })

            if (fields.jumlah === "" || fields.type === '') {
                setAlert({
                    ...alert,
                    open: true,
                    status: 'error',
                    message: 'Silahkan cek data stok yang ingin diopnam'
                });
                setMaster({
                    ...master,
                    loading: false,
                })
            } else {
                let data = {
                    product_id: master.dataProduct.id,
                    type: fields.type,
                    new_stock: fields.jumlah,
                    user_id: users.id,
                }
                let resUpdate = await stokOpnameApi(data);
                setAlert({
                    ...alert,
                    open: true,
                    status: resUpdate.data.status,
                    message: resUpdate.data.message
                });
                setMaster({
                    ...master,
                    loading: false,
                });

                navigation.navigate('Scan Stok');
            }
        } catch (error) {
            setAlert({
                ...alert,
                open: true,
                status: 'error',
                message: 'Terjadi kesalahan koneksi'
            });
            setMaster({
                ...master,
                loading: false,
            })
        }

    }

    const handleAlertClose = () => {
        setAlert({
            ...alert,
            open: !alert.open
        })
    }


    return (
        <View style={classes.container}>
            <View style={classes.alertTmp}>
                <MessageInfo open={alert.open} status={alert.status} message={alert.message} onClose={handleAlertClose} />
            </View>
            <View style={classes.formGroup}>
                <Text style={classes.label}>Nama Barang</Text>
                <TextInput placeholder="Nama barang" readOnly value={master.dataProduct.name} style={classes.textinput} />
            </View>
            <View style={classes.formGroup}>
                <Text style={classes.label}>Stok Terkini</Text>
                <Text style={classes.textinput}>{master.dataProduct.stock} </Text>
            </View>
            <View>
                <Text style={classes.label}>Type Stok</Text>
                <DropdownSelect
                    placeholder="Select an option..."
                    dropdownStyle={{
                        borderWidth: 0,
                        borderColor: '#B6BBC4',
                        backgroundColor: '#EEEEEE',
                        paddingHorizontal: 5,
                        paddingVertical: 0.1,
                        borderBottomWidth: 1,
                        marginBottom: 10,
                    }}
                    selectedItemStyle={{
                        fontSize: 17,
                        fontWeight: '900',
                        color: '#31304D',
                        fontFamily: 'NotoSans',
                        paddingHorizontal: 0,
                    }}
                    options={[
                        { label: 'Stok Masuk', value: 'addition' },
                        { label: 'Stok Keluar', value: 'subtraction' },
                    ]}
                    checkboxLabelStyle={{ color: '#474F7A' }}
                    selectedValue={fields.type}
                    onValueChange={(value) => handleFields('type', value)}
                    multipleSelectedItemStyle={{ color: 'red' }}

                />

            </View>
            <View style={classes.formGroup}>
                <Text style={classes.label}>Jumlah</Text>
                <TextInput placeholder="Qty"
                    keyboardType="numeric" value={fields.jumlah} onChangeText={(e) => handleFields('jumlah', e)} style={classes.textinput} />
            </View>
            <View style={classes.formGroup}>
                <Text style={classes.label}>Stok Terbaru</Text>
                <Text style={classes.textinput}>{fields.stok_update} </Text>
            </View>

            <View style={classes.formGroup}>
                <TouchableOpacity disabled={master.loading ? true : false} onPress={handleSaveStok}>
                    <Text style={classes.btnSave}>{master.loading ? <React.Fragment>
                        <View style={classes.tmpLoading}>
                            <ActivityIndicator size="small" color="#ffffff" />
                            <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold' }}>Loading....</Text>
                        </View>
                    </React.Fragment> : "Save"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ViewStok;