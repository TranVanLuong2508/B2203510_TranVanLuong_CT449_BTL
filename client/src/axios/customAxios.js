import axios from 'axios';

export const CustomAxios = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
});
