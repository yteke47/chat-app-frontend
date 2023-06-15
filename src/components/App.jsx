import { Center, Container } from '@chakra-ui/react';
import ChatLayout from './ChatLayout';

function App() {
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
        <ChatLayout />
      </Container>
    </Center>
  );
}

export default App;