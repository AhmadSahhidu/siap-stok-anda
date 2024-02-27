import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AntrianIcons, DeliveredIcons, DeliveryIcons, ProsesDeliveryIcons, imgView } from "../../assets";
import { alldeliveryAPI } from "../../api/ProductApi";
import { ConvertUTCTimeToDateTime, FormatDate } from "../../components/Date/FormatDate";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDaysIcon, ClockIcon } from "react-native-heroicons/outline";
import { setConfirmDeliveryAPI } from "../../api/Delivery";

const Delivery = ({ navigation }) => {
    const [master, setMaster] = useState({
        data: [],
        loading: false,
        btnLoading: false,
        modal: false,
    });

    const [fieldsConfirm, setFieldsConfirm] = useState({
        nota: '',
        tujuan: '',
        id_delivery: ''
    });

    const loadData = async () => {
        setMaster({
            ...master,
            loading: true
        })
        let dataList = await alldeliveryAPI();
        setMaster({
            ...master,
            data: dataList.data.data,
            loading: false
        })
    }

    useEffect(() => {
        loadData();
    }, []);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleDetailKonfirm = ({ nota, tujuan, id }) => {

        setFieldsConfirm({
            ...fieldsConfirm,
            nota: nota,
            tujuan: tujuan,
            id_delivery: id
        });
        setMaster({
            ...master,
            modal: true
        });
        // alert(nota);

    }

    const handleCloseModal = () => {
        setMaster({
            ...master,
            modal: false
        })
    }

    const handleConfirmationDelivery = async () => {
        setMaster({
            ...master,
            btnLoading: true
        })
        const query = {
            id_delivery: fieldsConfirm.id_delivery,
            jadwal: ConvertUTCTimeToDateTime(date)
        }
        let res = await setConfirmDeliveryAPI(query);
        if (res.data.status === 'success') {
            loadData();
            alert(res.data.message);
            setMaster({
                ...master,
                btnLoading: false,
                modal: false,
            });
        } else {
            alert(res.data.message);
        }
    }

    return (
        <View style={classes.container}>
            <View>
                <View style={classes.nav}>
                    <TouchableOpacity onPress={() => navigation.navigate('Delivery Queue')} style={classes.listNav}>
                        <Image source={AntrianIcons} style={classes.iconNav} />
                        <Text style={classes.textNav}>Dalam Antrian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={classes.listNav}>
                        <Image source={ProsesDeliveryIcons} style={classes.iconNav} />
                        <Text style={classes.textNav}>Dikirim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={classes.listNav}>
                        <Image source={DeliveredIcons} style={classes.iconNav} />
                        <Text style={classes.textNav}>Diterima</Text>
                    </TouchableOpacity>
                </View>
                <Text style={classes.textInfo}>Delivery List</Text>
                {master.loading ? <View><ActivityIndicator /><Text>Loading ....</Text></View> : null}
                <ScrollView>
                    {
                        master.data.map((items, index) => {
                            return (
                                <View key={items.id} style={classes.tmpList}>
                                    <View style={classes.tmpImageList}>
                                        <Image source={DeliveryIcons} style={classes.imgList} />
                                    </View>
                                    <TouchableOpacity style={classes.tempDesc} onPress={() => handleDetailKonfirm({ nota: items.sale_number, tujuan: `${items.name_address} - ${items.address}`, id: items.id })}>
                                        <Text style={classes.textTitleList}>#Delivery {items.sale_number}</Text>
                                        <Text style={classes.textDateList}>{FormatDate(items.created_at)}</Text>
                                        <Text style={classes.statusList}>Menunggu konfirmasi</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }

                </ScrollView>
                <Modal transparent visible={master.modal}>
                    <TouchableOpacity onPress={handleCloseModal} style={classes.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={classes.tmpContentModal}>
                                <Text style={classes.txtTitleModal}>Konfirmasi Pengiriman</Text>
                                <Text style={classes.textlabelForm}>Nota Pengiriman</Text>
                                <Text style={classes.textForm}>{fieldsConfirm.nota}</Text>
                                <Text style={classes.textlabelForm}>Tujuan Pengiriman</Text>
                                <Text style={classes.textForm}>{fieldsConfirm.tujuan}</Text>
                                <View style={classes.tmpSetdatetime}>
                                    <Text style={classes.textlabelForm}>Atur tanggal & waktu</Text>
                                    <View style={classes.setDateTime}>
                                        <Text style={classes.textSelected}>{date.toLocaleString()}</Text>
                                        <TouchableOpacity onPress={showDatepicker} style={classes.btndatetime}>
                                            <CalendarDaysIcon style={classes.iconCalender} width={20} height={20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={showTimepicker} style={classes.btndatetime}>
                                            <ClockIcon style={classes.iconCalender} width={20} height={20} />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        master.btnLoading ?
                                            <View style={classes.btnConfirmLoading}>
                                                <ActivityIndicator color={'white'} />
                                                <Text style={classes.textBtnConfirm}>Loading.....</Text>
                                            </View> : <TouchableOpacity style={classes.btnConfirm} onPress={handleConfirmationDelivery}>
                                                <Text style={classes.textBtnConfirm}>Konfirmasi Pengiriman</Text>
                                            </TouchableOpacity>
                                    }
                                </View>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        </View>
    )
}

const classes = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1
    },
    textInfo: {
        fontFamily: 'NotoSans',
        fontWeight: 'bold',
        color: '#1B1A55',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        fontSize: 16,
        paddingBottom: 10,
    },
    tmpList: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    tmpImageList: {
        padding: 15,
        backgroundColor: '#EEEDEB',
        borderRadius: 40,
        justifyContent: 'center',
        alignContent: 'center'
    },
    imgList: {
        width: 40,
        height: 40,
    },
    tempDesc: {
        fontSize: 17,
    },
    textTitleList: {
        fontFamily: 'NotoSans',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#607274'
    },
    textDateList: {
        fontSize: 12,
        color: '#607274'
    },
    statusList: {
        paddingVertical: 3,
        paddingHorizontal: 20,
        backgroundColor: '#96B6C5',
        textAlign: 'center',
        borderRadius: 100,
        marginTop: 10,
        color: 'white'
    },
    nav: {
        gap: 15,
        flexDirection: 'row',
        marginBottom: 20,
    },
    listNav: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#4F709C',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 10,
    },
    iconNav: {
        width: 45,
        height: 45,
    },
    textNav: {
        color: 'white',
        fontSize: 10,
        marginTop: 15,
        fontWeight: 'bold'
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
    tmpSetdatetime: {

    },
    setDateTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    textSelected: {
        flex: 1,
        padding: 10,
        backgroundColor: '#EEF5FF',
        fontWeight: 'bold',
        color: '#3D3B40',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    iconCalender: {
        color: 'white'
    },
    btndatetime: {
        paddingVertical: 10,
        backgroundColor: '#3887BE',
        paddingHorizontal: 10,
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
    }
})

export default Delivery;