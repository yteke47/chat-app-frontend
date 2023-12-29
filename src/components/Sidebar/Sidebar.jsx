import React, { useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, VStack } from '@chakra-ui/react';
import ChatHistory from './ChatHistory';
import { useChatRoom } from '../../context/ChatRoomContext';
import { handleFriendRequest } from '../../api/chatApi';
import { useProfile } from '../../context/ProfileContext';
import UserProfile from './UserProfile';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
    const { chats, messageRequests, username } = useProfile();
    const { setActiveChatId, activeChatId } = useChatRoom();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const { setUser } = useAuth();

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
            <UserProfile userName={username} onLogout={() => setUser(null)} />
            <Tabs index={selectedTabIndex} onChange={handleTabChange}>
                <TabList>
                    <Tab>
                        Chats
                    </Tab>
                    <Tab>
                        Requests {!!messageRequests.length && (
                            <Tag ml="2" size='sm' colorScheme='red' borderRadius='full'>
                                {messageRequests.length}
                            </Tag>
                        )}
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {chats.map((chat) => (
                            <Box key={chat.id} onClick={() => handleChatSelect(chat.id)}>
                                <ChatHistory isActive={activeChatId === chat.id} user={chat.user.username} message={getLastMessageFromChat(chat)} />
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
