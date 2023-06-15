import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats([
            {
                userId: crypto.randomUUID(), chatId: crypto.randomUUID(), username: 'Ahmet'
            }
        ]);
    }, []);

    return (
        <ChatContext.Provider value={{ chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}

const useChats = () => useContext(ChatContext);

export { ChatProvider, useChats }