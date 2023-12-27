import React, { useMemo } from 'react'
import MessageBar from './MessageBar'
import UserStatus from './UserStatus'
import Chat from './Chat'

import { VStack } from '@chakra-ui/react'
import { useChatRoom } from '../../context/ChatRoomContext'
import { useSocket } from '../../context/SocketProvider'
import useUserProfile from '../../hooks/useUserProfile'

function ChatWindow() {
    const { activeChatId } = useChatRoom();
    const { chats } = useUserProfile();
    const { socket } = useSocket();
    const activeChat = chats.find(chat => chat.id === activeChatId);

    const messages = useMemo(() => {
        return activeChat.messages;
    }, [activeChat]);

    const handleSendMessage = (content) => {
        const chatId = activeChat.id;

        socket.emitEvent("SEND_MESSAGE", { chatId, content });
    }

    return (
        <VStack overflow='auto' justifyContent='space-between'>
            <UserStatus user={activeChat.user.username} />
            <Chat messages={messages} />
            <MessageBar handleSendMessage={handleSendMessage} />
        </VStack>
    )
}

export default ChatWindow