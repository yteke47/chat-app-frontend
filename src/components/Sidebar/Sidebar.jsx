import React, { useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import ChatHistory from './ChatHistory';
import { useChatRoom } from '../../context/ChatRoomContext';
import useUserProfile from '../../hooks/useUserProfile';
import { handleFriendRequest } from '../../api/chatApi';


function Sidebar() {
    const { chats, messageRequests } = useUserProfile();
    const { setActiveChatId, activeChatId } = useChatRoom();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleTabChange = (index) => {
        setSelectedTabIndex(index);
    };

    const handleChatSelect = (chatId) => {
        if (chatId === activeChatId)
            return setActiveChatId(null);

        setActiveChatId(chatId);
    };

    const handleAcceptRequest = async (messageRequestId) => {
        await handleFriendRequest("accept", messageRequestId);
    };

    const getLastMessageFromChat = (chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1]?.content;
        return lastMessage ? lastMessage : '';
    }

    return (
        <VStack spacing={3} align='stretch'>
            <Tabs index={selectedTabIndex} onChange={handleTabChange}>
                <TabList>
                    <Tab>Chats</Tab>
                    <Tab>Requests</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {chats.map((chat) => (
                            <Box key={chat.id} onClick={() => handleChatSelect(chat.id)}>
                                <ChatHistory user={chat.user.username} message={getLastMessageFromChat(chat)} />
                            </Box>
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {messageRequests.map((messageRequest) => (
                            <Box key={messageRequest.id} onClick={() => handleAcceptRequest(messageRequest.id)}>
                                <ChatHistory user={messageRequest.sender} />
                            </Box>
                        ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
}

export default Sidebar;
