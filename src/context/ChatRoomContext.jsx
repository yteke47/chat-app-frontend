import React, { createContext, useContext, useState } from "react";

const ChatRoomContext = createContext();

const ChatRoomProvider = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <ChatRoomContext.Provider
      value={{
        activeChatId,
        setActiveChatId
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

const useChatRoom = () => useContext(ChatRoomContext);

export { ChatRoomProvider, useChatRoom };