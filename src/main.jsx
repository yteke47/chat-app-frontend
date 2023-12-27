import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './components/App'
import { AuthProvider } from './context/AuthContext'
import { ChatRoomProvider } from './context/ChatRoomContext'
import { ProfileProvider } from './context/ProfileContext'
import { SocketProvider } from './context/SocketProvider'
import SocketClient from './api/socketClient.js'

const socket = new SocketClient();

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <SocketProvider socket={socket}>
          <ProfileProvider>
            <ChatRoomProvider>
              <App />
            </ChatRoomProvider>
          </ProfileProvider>
        </SocketProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
)