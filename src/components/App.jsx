import { Center, Container, useToast } from '@chakra-ui/react';
import ChatLayout from './ChatLayout';
import { useAuth } from '../context/AuthContext';
import AuthContainer from './AuthContainer';
import { useEffect } from 'react';
import httpClient from '../api/httpClient';

function App() {
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleResponseError = (error) => {
      notifyError(error);
      return Promise.reject(error);
    };

    const responseInterceptor = httpClient.interceptors.response.use(
      (response) => response,
      handleResponseError
    );

    return () => {
      httpClient.interceptors.response.eject(responseInterceptor);
    };
  }, [isAuthenticated, user?.token, httpClient]);

  const notifyError = (error) => {
    let errorMessage = 'An error occurred.';

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorMessage = 'Invalid request.';
          break;
        case 401:
          errorMessage = 'Authorization error.';
          break;
        case 403:
          errorMessage = 'Access denied.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 409:
          errorMessage = 'User is already registered!';
          break;
        case 500:
          errorMessage = 'Server error.';
          break;
        default:
          errorMessage = 'An error occurred.';
          break;
      }

      if (data && (data.error || data.message)) {
        errorMessage = data.error || data.message;
      }
    }

    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Center h="100vh">
      <Container
        maxW={{ base: "100%", md: "900px" }}
        height={{ base: "100%", md: "600px" }}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        boxShadow="md"
      >
        {isAuthenticated ? <ChatLayout /> : <AuthContainer />}
      </Container>
    </Center>
  );
}

export default App;