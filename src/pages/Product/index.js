import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, ScrollViewBase, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import StyleProduct from "../../assets/style/StyleProduct";
import { getAllProductAPI, getDataCategoriAPI, getProductByCategory } from "../../api/ProductApi";
import { imgView } from "../../assets";
import DropdownSelect from "react-native-input-select";
import { SelectList } from "react-native-dropdown-select-list";
// import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const classes = StyleProduct;

const Product = () => {
    const [selected, setSelected] = useState("");
    const [master, setMaster] = useState({
        product: [],
        loading: false,
        categori: [
            {
                name: 'All',
            },
            {
                name: 'Aksesories',
            },
            {
                name: 'Bahan Bangunan',
            }
        ]
    });

    const [search, setSearch] = useState({
        modal: false,
        value: ''
    });

    useEffect(() => {
        const load = async () => {
            setMaster({
                ...master,
                loading: true,
            });

            let res = await getAllProductAPI();
            let dataCategory = await getDataCategoriAPI();

            setMaster({
                ...master,
                product: res.data.data,
                loading: false,
                categori: dataCategory.data.data
            })
        }

        load();
    }, []);

    const searchDisplay = () => {
        setSearch({
            ...search,
            modal: true
        })
    }

    const handleClosesearchDisplay = () => {
        setSearch({
            ...search,
            modal: false
        })
    }

    const handleCategoryProduct = async (idCategori) => {
        try {
            setMaster({
                ...master,
                loading: true
            });

            let dataProduct = await getProductByCategory(idCategori);
            setMaster({
                ...master,
                product: dataProduct.data.data,
                loading: false,
            })

        } catch (error) {
            alert(error);
        }
    }


    return (
        <ScrollView>
            <View style={classes.container}>
                {
                    master.loading ? <ActivityIndicator /> : null
                }
                <View style={classes.categori}>
                    <View style={{ flexDirection: 'column', width: '80%' }}>
                        <SelectList
                            setSelected={(val) => handleCategoryProduct(val)}
                            data={master.categori.map((item, index) => {
                                return { key: item.id, value: item.name }
                            })}
                            inputStyles={{
                                width: '90%',
                            }}
                            boxStyles={{
                                backgroundColor: '#fff',
                                borderWidth: 0,
                                paddingVertical: 15,
                                width: '100%'
                            }}
                            placeholder="Pilih Kategori Produk"
                            dropdownStyles={{
                                backgroundColor: '#fff',
                            }}
                            dropdownItemStyles={{
                                width: '80%'
                            }}
                        />
                    </View>
                    <TouchableOpacity style={classes.btnSearch} onPress={searchDisplay}>
                        <MagnifyingGlassIcon size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
                {master.product.map((items, index) => {
                    return (
                        <TouchableOpacity key={items.id} style={classes.tmpList}>
                            <Image source={imgView} style={classes.tmpListImage} width={50} height={50} />
                            <View>
                                <Text style={classes.nameProduct}>{items.name}</Text>
                                <View style={classes.tmpDesc}>
                                    <Text style={classes.sizeProduct}>{items.size}</Text>
                                    <Text style={classes.sizeProduct}>{items.brand.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={search.modal}
                >
                    <TouchableOpacity onPress={handleClosesearchDisplay} style={classes.centeredView}>
                        <TouchableWithoutFeedback>
                            <View style={classes.modalView}>
                                <TextInput style={classes.textSearch} placeholder="Search produk" />
                                <TouchableOpacity style={classes.btnSearchModal}>
                                    <MagnifyingGlassIcon size={24} color={'white'} />
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>

        </ScrollView>
    )
}

export default Product;