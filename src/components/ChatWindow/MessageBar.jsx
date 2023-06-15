import React, { useState } from 'react';
import { Flex, Input, IconButton, Box } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { useMessage } from '../../context/MessageContext';

function MessageBar() {
    const [message, setMessage] = useState('');
    const { setMessages } = useMessage();

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return false;
        setMessages(msgs => [...msgs, { id: msgs[msgs.length - 1].id + 1, author: 'Yiğit', content: message }])
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
                        disabled={!message}
                    />
                </Flex>
            </form>
        </Box>
    );
}

export default MessageBar;