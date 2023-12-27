import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import Sidebar from './Sidebar/Sidebar'
import ChatWindow from './ChatWindow'
import FriendRequest from './FriendRequest';
import { useChatRoom } from '../context/ChatRoomContext';

function ChatLayout() {
    const { activeChatId } = useChatRoom();
    
    return (
        <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={4} h={'100%'}>
            <Box
                display={{ base: 'none', md: 'block' }}
            >
                <Sidebar />
            </Box>
            {activeChatId ? <ChatWindow /> : <FriendRequest />}
        </Grid>
    )
}

export default ChatLayout