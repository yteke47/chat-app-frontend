import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000';

const getAuthToken = () => {
    try {
        const data = localStorage.getItem('user');
        return data ? JSON.parse(data).token || '' : '';
    } catch (error) {
        console.error('Error while parsing user data from LocalStorage:', error);
        return '';
    }
};
const httpClient = axios.create({
    baseURL: API_ENDPOINT,
    responseType: 'json'
});

httpClient.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${getAuthToken()}`;
    return config;
});

export default httpClient;