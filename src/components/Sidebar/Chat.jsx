import React from 'react';
import { HStack, VStack, Avatar, Box, Text } from '@chakra-ui/react';
import { IoTrashBinSharp } from 'react-icons/io5';

function Chat({ user, message }) {
    return (
        <HStack
            h="50px"
            bg="gray.100"
            borderRadius="md"
            px={2}
            border="1px solid"
            borderColor="gray.200"
            borderWidth={2}
            justifyContent="space-between"
            _hover={{ borderColor: 'gray.300' }}
            _focus={{ borderColor: 'gray.300', boxShadow: 'outline' }}
        >
            <Box>
                <Avatar name={user} size="sm" />
            </Box>
            <Box flex={1} overflow="hidden">
                <VStack align='left' spacing={0} overflow="hidden">
                    <Text fontSize="sm" fontWeight="bold" isTruncated>
                        {user}
                    </Text>
                    <Text fontSize="xs" fontWeight="light" isTruncated>
                        {message}
                    </Text>
                </VStack>
            </Box>
            <Box bg="red" p={1} borderRadius="full">
                <IoTrashBinSharp color="white" size="15px" />
            </Box>
        </HStack>
    );
}

export default Chat;
