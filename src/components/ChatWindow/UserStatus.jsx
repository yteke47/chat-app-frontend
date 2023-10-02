import React from 'react';
import { HStack, Tag, TagLabel, Box, Center } from '@chakra-ui/react';

function UserStatus({ user, isOnline }) {
    const tagColor = isOnline ? 'green' : 'gray';

    const tagStyles = {
        size: 'lg',
        colorScheme: 'whiteAlpha',
        borderRadius: 'full',
    };

    const boxStyles = {
        marginRight: "5px",
        boxSize: '15px',
        bg: tagColor,
        borderRadius: 'full',
    };

    return (
        <HStack width="100%">
            <Tag  {...tagStyles}>
                <Center>
                    <Box {...boxStyles} />
                    <TagLabel color="black">{user}</TagLabel>
                </Center>
            </Tag>
        </HStack>
    );
}

export default UserStatus;