import httpClient from "./httpClient";

export const getProfile = () => {
    return httpClient.get("user/me");
}