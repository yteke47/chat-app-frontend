import httpClient from "./httpClient";

export const sendFriendRequest = (friendCode) => {
    return httpClient.post(`chat/messageRequest`, { friendCode });
}

export const handleFriendRequest = (action, friendRequestId) => {
    if (!["accept", "reject"].includes(action)) {
        throw new Error("Invalid action. Accepted values are 'accept' or 'reject'.");
    }

    return httpClient.post(`chat/${action}/${friendRequestId}`, { /* Ek veri eklemek isterseniz buraya ekleyebilirsiniz */ });
};