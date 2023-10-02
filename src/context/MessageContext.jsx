import React, { createContext, useContext, useEffect, useState } from 'react'

const MessageContext = createContext();

const sampleData = [
    { id: 1, author: 'Ahmet', content: 'Selam!' },
    { id: 2, author: 'Yiğit', content: 'Merhaba!' },
    { id: 3, author: 'Ahmet', content: 'Nasılsın?' },
    { id: 4, author: 'Yiğit', content: 'İyiyim, teşekkürler!' },
    { id: 5, author: 'Ahmet', content: 'Ne yapıyorsun?' },
    { id: 6, author: 'Yiğit', content: 'Çalışıyorum.' },
    { id: 7, author: 'Ahmet', content: 'Hangi projede?' },
    { id: 8, author: 'Yiğit', content: 'XYZ projesinde.' },
    { id: 9, author: 'Ahmet', content: 'Başarılar dilerim!' },
    { id: 10, author: 'Yiğit', content: 'Teşekkür ederim!' },
]

const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState(sampleData);

    return (
        <MessageContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessageContext.Provider>
    )
}

const useMessage = () => useContext(MessageContext);

export { MessageProvider, useMessage }