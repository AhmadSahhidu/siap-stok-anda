import client from ".";

export const getDataProductAPI = (barcode) => {
    return client.get('/product/product/product-detail?barcode=' + barcode);
}

export const stokOpnameApi = (data) => {
    return client.post('product/product/stok-opname', data);
}

export const getAllProductAPI = () => {
    return client.get('product/product');
}

export const getDataCategoriAPI = () => {
    return client.get('product/product/categori-product');
}

export const getProductByCategory = (idCategori) => {
    return client.get(`product/product/product-category/${idCategori}`);
}

export const alldeliveryAPI = () => {
    return client.get('product/product/product-delivery');
}