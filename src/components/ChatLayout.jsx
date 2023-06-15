import React from 'react'
import { Box, Grid } from '@chakra-ui/react'
import Sidebar from './Sidebar/Sidebar'
import ChatWindow from './ChatWindow'

function ChatLayout() {
    return (
        <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={4} h={'100%'}>
            <Box
                display={{ base: 'none', md: 'block' }}
            >
                <Sidebar />
            </Box>
            <ChatWindow />
        </Grid>
    )
}

export default ChatLayout