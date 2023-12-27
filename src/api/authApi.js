import httpClient from "./httpClient";

export const login = (values) => {
    return httpClient.post(`/auth/login`, values);
};

export const register = (values) => {
    return httpClient.post(`/auth/register`, values);
};