import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Spacer, Text, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react';

const UserProfile = ({ userName, userAvatarUrl, onLogout }) => {
    return (
        <Flex align="center" p="4">
            <Avatar size="sm" src={userAvatarUrl} alt={userName} />
            <Box ml="4">
                <Text fontSize="md" fontWeight="bold">{userName}</Text>
            </Box>
            <Spacer />
            <Menu>
                <MenuButton as={Button} variant="link" color="red.500" ml="4">
                    <SettingsIcon />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
};

export default UserProfile;