import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContext = createContext();

const sampleData = [
    {
        userId: crypto.randomUUID(), chatId: crypto.randomUUID(), username: 'Ahmet'
    }
]

const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState(sampleData);

    return (
        <ChatContext.Provider value={{ chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

const useChats = () => useContext(ChatContext);

export { ChatProvider, useChats }