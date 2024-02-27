import client from ".";

export const setConfirmDeliveryAPI = (data) => {
    return client.post('delivery/confirm-delivery', data);
}

export const getListAntrianDeliveriAPI = () => {
    return client.get('delivery/list-antrian');
}

export const getAllDriversAPI = () => {
    return client.get('delivery/drivers');
}

export const getAllCarsAPI = () => {
    return client.get('delivery/cars');
}

export const selectDriversAPI = (data) => {
    return client.post('delivery/select-driver', data);
}

export const getHistoryDelivery = () => {
    return client.get('delivery/list-history-delivery');
}