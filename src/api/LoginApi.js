import client from ".";

export const login = (data) => {
    return client.post('/auth/login', data);
}