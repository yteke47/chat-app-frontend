import React from 'react';
import { VStack } from '@chakra-ui/react';
import Chat from './Chat';

function Sidebar() {
    return (
        <VStack spacing={3} align='stretch'>
            <Chat user={'Ahmet'} message={'Başarılar!'}></Chat>
        </VStack>
    );
}

export default Sidebar;
