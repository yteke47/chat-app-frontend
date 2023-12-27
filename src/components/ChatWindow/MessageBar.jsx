import React, { useState } from 'react';
import { Flex, Input, IconButton, Box } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

function MessageBar({ handleSendMessage }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return false;
        handleSendMessage(message)
        setMessage('');
    };

    return (
        <Box w={'100%'}>
            <form onSubmit={handleSubmit}>
                <Flex align='center'>
                    <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleMessageChange}
                        type='text'
                        marginRight="2"
                    />
                    <IconButton
                        type="submit"
                        icon={<IoSend />}
                        aria-label="Send"
                        colorScheme="blue"
                        isDisabled={!message}
                    />
                </Flex>
            </form>
        </Box>
    );
}

export default MessageBar;