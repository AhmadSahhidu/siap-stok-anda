import client from ".";

export const getDataProductAPI = (barcode) => {
    return client.get('/product/product/product-detail?barcode=' + barcode);
}

export const stokOpnameApi = (data) => {
    return client.post('product/product/stok-opname', data);
}