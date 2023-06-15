import { io } from 'socket.io-client'

const useSocket = () => io("http://localhost:3001/");

export default useSocket;