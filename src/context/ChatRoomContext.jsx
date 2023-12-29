import React, { createContext, useContext, useState } from "react";

const ChatRoomContext = createContext();

const ChatRoomProvider = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState(null);

  const contextValue = { activeChatId, setActiveChatId };

  return (
    <ChatRoomContext.Provider value={contextValue}>
      {children}
    </ChatRoomContext.Provider>
  );
};

const useChatRoom = () => useContext(ChatRoomContext);

export { ChatRoomProvider, useChatRoom };