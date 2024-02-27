import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { ArchiveBoxXMarkIcon, InformationCircleIcon, TruckIcon, UsersIcon } from "react-native-heroicons/outline";
import { getAllCarsAPI, getAllDriversAPI, getListAntrianDeliveriAPI, selectDriversAPI } from "../../api/Delivery";
import { ConvertUTCTimeToDateTime, FormatDateTime } from "../../components/Date/FormatDate";
import SelectFields from "../../components/FieldSelect";

const ListAntrianDeveloper = () => {
    const [master, setMaster] = useState({
        data: [],
        driver: [],
        car: [],
        btnLoading: false
    });
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [fields, setFields] = useState({
        nota: '',
        delivery_id: '',
        driver_id: '',
        car_id: '',
    })
    const loadData = async () => {
        try {
            setLoading(true)
            let resData = await getListAntrianDeliveriAPI();
            resData = resData.data.data;
            let resDriver = await getAllDriversAPI();
            resDriver = resDriver.data.data;
            let resCar = await getAllCarsAPI();
            resCar = resCar.data.data;
            setMaster({
                ...master,
                data: resData,
                driver: resDriver,
                car: resCar
            });
            setLoading(false);
        } catch (error) {
            alert('Ada kesalahan koneksi');
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const a = false;

    const handleCloseModal = () => {
        setModal(false);
    }
    const handleSelectDriver = ({ nota, delivery_id }) => {
        setFields({
            ...fields,
            nota: nota,
            delivery_id: delivery_id
        })
        setModal(true);
    }

    const handleFields = (id, value) => {
        setFields({
            ...fields,
            [id]: value
        })
    }

    const handleSaveDataDriver = async () => {
        try {
            setMaster({
                ...master,
                btnLoading: true
            });
            let query = {
                delivery_id: fields.delivery_id,
                driver_id: fields.driver_id,
                car_id: fields.car_id,
            }
            let res = await selectDriversAPI(query);
            res = res.data;
            loadData();
            alert(res.message)
            setMaster({
                ...master,
                btnLoading: false
            });
            setModal(false);
        } catch (error) {
            alert('Ada kesalahan jaringan');
            setMaster({
                ...master,
                btnLoading: false
            });
        }

    }

    const isScheduledTimeValid = (scheduledTime) => {
        const scheduledDateTime = new Date(scheduledTime);
        const currentDateTime = new Date();
        return scheduledDateTime < currentDateTime;
    };

    return (
        <ScrollView>
            <View style={classes.constainer}>
                <Text style={classes.textHeader}>List Antrian</Text>
                {
                    loading ?
                        <ActivityIndicator />
                        : null
                }
                {
                    master.data.length > 0 ?
                        master.data.map((items, index) => {
                            return (
                                <View key={items.id} style={classes.tmpList}>
                                    <View style={[classes.card, classes.shadowProp]}>
                                        {isScheduledTimeValid(items.jadwal) ?
                                            <View style={classes.tmpInfo}>
                                                <InformationCircleIcon width={24} height={24} color={'white'} />
                                                <Text style={classes.textInfoStatus}>Nota ini telah melebihi waktu yang sudah dijadwalkan</Text>
                                            </View>
                                            : null}
                                        <Text style={classes.textTitleList}>#Delivery {items.sale_number}</Text>
                                        <Text style={classes.textDateTime}>{FormatDateTime(items.jadwal)}</Text>
                                        <Text style={classes.textStatus}>Dalam Antrian</Text>
                                    </View>
                                    <View style={classes.lineDashed}></View>
                                    {
                                        items.driver_id === null ?
                                            <View style={[classes.card2, classes.shadowProp]}>
                                                <TouchableOpacity onPress={() => handleSelectDriver({ nota: items.sale_number, delivery_id: items.id })} style={classes.selectDriver}>
                                                    <TruckIcon style={classes.iconsTruck} />
                                                    <Text style={classes.textDriver}>Pilih Driver</Text>
                                                </TouchableOpacity>
                                            </View>
                                            : <View style={[classes.card2, classes.shadowProp]}>
                                                <View style={classes.selectCar}>
                                                    <TruckIcon style={classes.iconsTruck} />
                                                    <Text style={classes.textDriver}>{items.car_name}</Text>
                                                </View>
                                                <View style={classes.selectDriver}>
                                                    <UsersIcon style={classes.iconsTruck} />
                                                    <Text style={classes.textDriver}>{items.driver_name}</Text>
                                                </View>
                                            </View>
                                    }
                                </View>
                            )
                        })
                        :
                        <View style={classes.tmpNota}>
                            <ArchiveBoxXMarkIcon width={150} height={150} style={classes.iconEmpty} />
                            <Text style={classes.textNotFound}>Tidak ada nota antrian</Text>
                        </View>
                }
                <Modal transparent={true} visible={modal}>
                    <TouchableOpacity onPress={handleCloseModal} style={classes.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={classes.tmpContentModal}>
                                <Text style={classes.txtTitleModal}>Pilih Driver</Text>
                                <Text style={classes.textlabelForm}>Nota Pengiriman</Text>
                                <Text style={classes.textForm}>{fields.nota}</Text>
                                <Text style={classes.textlabelForm}>Driver / Supir</Text>
                                <SelectFields dataList={master.driver} handleChange={handleFields} id="driver_id" placeholder={'Pilih driver / supir'} />
                                <Text style={classes.textlabelForm}>Car / Mobil</Text>
                                <SelectFields dataList={master.car} handleChange={handleFields} id="car_id" placeholder={'Pilih Car / Mobil'} />
                                {
                                    master.btnLoading ?
                                        <View style={classes.btnConfirmLoading}>
                                            <ActivityIndicator color={'white'} />
                                            <Text style={classes.textBtnConfirm}>Loading.....</Text>
                                        </View> : <TouchableOpacity style={classes.btnConfirm} onPress={handleSaveDataDriver}>
                                            <Text style={classes.textBtnConfirm}>Simpan Data Diver</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        </ScrollView>
    )
}

const classes = StyleSheet.create({
    constainer: {
        paddingHorizontal: 25,
        paddingBottom: 25
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#40679E',
        fontFamily: 'NotoSans',
    },
    tmpList: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: 15
    },
    tmpInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF8080',
        marginBottom: 15,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 15,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: '100%',
    },
    lineDashed: {
        borderWidth: 2,
        borderColor: '#C9D7DD',
        borderStyle: 'dashed',
        width: '90%',
    },
    card2: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    shadowProp: {
        shadowColor: '#52006A',
        elevation: 10,
    },
    textTitleList: {
        fontFamily: 'NotoSans',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#607274'
    },
    textDateTime: {
        fontSize: 12,
        color: '#535C91'
    },
    textStatus: {
        fontSize: 12,
        paddingHorizontal: 25,
        paddingVertical: 4,
        borderRadius: 20,
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#FDBF60',
        marginTop: 10,
        fontWeight: 'bold',
        width: '50%'
    },
    textInfoStatus: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    selectDriver: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10,
        paddingVertical: 15,
        width: '50%',
        borderLeftColor: '#ddd',
        borderLeftWidth: 1
    },
    iconsTruck: {
        color: '#387ADF'
    },
    textDriver: {
        color: '#387ADF',
        fontWeight: 'bold'
    },
    selectCar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10,
        paddingVertical: 10,
        width: '50%',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 25
    },
    tmpContentModal: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10
    },
    txtTitleModal: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#053B50',
        borderBottomWidth: 1,
        paddingBottom: 15,
        fontSize: 18,
        borderBottomColor: '#B6BBC4',
    },
    textlabelForm: {
        fontSize: 12,
        marginTop: 15,
        color: '#2D3250'
    },
    textForm: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#424769',
        marginTop: 5,
    },
    btnConfirm: {
        paddingVertical: 10,
        backgroundColor: '#3887BE',
        fontSize: 16,
        marginTop: 20,
        borderRadius: 5,
    },
    btnConfirmLoading: {
        paddingVertical: 10,
        backgroundColor: '#86B6F6',
        fontSize: 16,
        marginTop: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
    },
    textBtnConfirm: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    tmpNota: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        height: 'auto',
        paddingVertical: 50,
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
    },
    iconEmpty: {
        color: '#B5C0D0'
    },
    textNotFound: {
        fontSize: 20,
    }
});

export default ListAntrianDeveloper;