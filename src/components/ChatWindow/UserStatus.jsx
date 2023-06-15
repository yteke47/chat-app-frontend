import { HStack, Tag, TagLabel, Box } from '@chakra-ui/react'
import React from 'react'

function UserStatus({ user, isOnline }) {
    return (
        <HStack bg={'gray.100'} w={'100%'}>
            <Tag size='lg' colorScheme='whiteAlpha' borderRadius='full'>
                <Box
                    boxSize='15'
                    bg={'green'}
                    borderRadius={'full'}
                />
                <TagLabel textColor={'black'}>{user}</TagLabel>
            </Tag>
        </HStack>
    )
}

export default UserStatus