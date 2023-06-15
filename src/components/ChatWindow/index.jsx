import React from 'react'
import MessageBar from './MessageBar'
import UserStatus from './UserStatus'
import Chat from './Chat'

import { VStack } from '@chakra-ui/react'

function ChatWindow() {
    return (
        <VStack overflow='auto' justifyContent='space-between'>
            <UserStatus user={'Ahmet'} />
            <Chat />
            <MessageBar />
        </VStack>
    )
}

export default ChatWindow