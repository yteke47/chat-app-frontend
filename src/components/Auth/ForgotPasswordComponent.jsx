import { Stack, Input, Button, Text } from "@chakra-ui/react";

function ForgotPasswordComponent({ onCancel }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing="4">
                <Text fontSize="sm" color="gray.600" textAlign="center">
                    Enter your email address to reset your password.
                </Text>
                <Input type="email" placeholder="Email" />
                <Button type="submit" colorScheme="blue" variant="solid" width="full">
                    Reset Password
                </Button>
                <Button variant="link" color="blue.500" onClick={onCancel} width="full">
                    Cancel
                </Button>
            </Stack>
        </form>
    );
}

export default ForgotPasswordComponent;
