import React from 'react';
import { Wrap, WrapItem, Avatar, Box, Text } from '@chakra-ui/react';

function Message({ sender, content, isSent }) {
    const messageAlignment = isSent ? 'flex-end' : 'flex-start';
    const messageBgColor = isSent ? 'blue.400' : 'gray.100';
    const textColor = isSent ? 'white' : 'black';

    return (
        <Wrap marginBottom="10px" align="center" justify={messageAlignment} spacing={2}>
            {!isSent && (
                <WrapItem>
                    <Avatar name={sender} size="sm" />
                </WrapItem>
            )}
            <WrapItem>
                <Box
                    bg={messageBgColor}
                    borderRadius="lg"
                    px={4}
                    py={2}
                    display="inline-block"
                    color={textColor}
                >
                    <Text maxW={{ base: '200', 'md': '300' }} fontSize="md">{content}</Text>
                </Box>
            </WrapItem>
            {isSent && (
                <WrapItem>
                    <Avatar name={sender} size="sm" />
                </WrapItem>
            )}
        </Wrap>
    );
}

export default Message;