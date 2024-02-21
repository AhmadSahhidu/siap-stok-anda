import axios from "axios";

const client = axios.create({
    baseURL: 'https://siaptokoanda.com/api/',
    timeout: 10000
});

export default client;