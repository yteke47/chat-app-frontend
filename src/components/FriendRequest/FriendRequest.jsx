import { useState } from 'react';
import { Box, Center, Text, Input, Button, Stack } from '@chakra-ui/react';
import { sendFriendRequest } from '../../api/chatApi';
import { useProfile } from '../../context/ProfileContext';

export default function FriendRequest() {
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { friendCode } = useProfile();

    const backgroundStyles = {
        content: '" "',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        backgroundImage: `url("https://img.freepik.com/premium-vector/social-networks-dating-apps-vector-seamless-pattern_341076-469.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 0',
        backgroundSize: 'cover',
    };

    const handleSearch = async () => {
        if (searchInput.length < 6) return;

        setIsLoading(true);

        try {
            await sendFriendRequest(searchInput);

            console.log('Friend request sent successfully!');
        } catch (error) {
            console.error('Error sending friend request:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Center
            position="relative"
            _before={backgroundStyles}
        >
            <Box position="relative">
                <Stack divider={<hr />} gap="8">
                    <Box>
                        <Text fontSize="lg" >Your Friend Code:</Text>
                        <Text fontSize="xl" fontWeight="bold">{friendCode}</Text>
                    </Box>
                    <Box >
                        <Text fontSize="lg">Find Other People</Text>
                        <Input
                            placeholder="Enter friend's code"
                            maxLength="6"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button colorScheme="teal" mt={4} onClick={handleSearch} isLoading={isLoading}>
                            Search
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Center>
    );
}