import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { MessageProvider } from './context/MessageContext'
import * as ReactDOM from 'react-dom/client'
import App from './components/App'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </ChakraProvider>
  </React.StrictMode>
)