import { Box, Center, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import { login, register } from "../api/authApi";

function AuthContainer() {
    const { setUser } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(true);

    const handleSubmit = async (values) => {
        try {
            const user = showLoginForm ? await login(values) : await register(values);
            setUser(user.data);
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    const toggleForm = () => {
        setShowLoginForm(prevState => !prevState);
    };

    return (
        <Flex bg="white" p="8" borderRadius="xl" justify="center" align="center" w="full" h="full">
            <Stack w="50%">
                <Center>
                    <Text as="h1" fontWeight="semibold" fontSize="2xl">
                        {showLoginForm ? "Login" : "Register"}
                    </Text>
                </Center>
                <Box>
                    {showLoginForm ? (
                        <LoginForm onSubmit={handleSubmit} />
                    ) : (
                        <RegisterForm onSubmit={handleSubmit} />
                    )}
                </Box>
                <Center>
                    <Link fontSize="sm" color="blue.500" cursor="pointer" onClick={toggleForm}>
                        {showLoginForm ? "Create an account" : "Already have an account? Login"}
                    </Link>
                </Center>
            </Stack>
        </Flex>
    );
}

export default AuthContainer;