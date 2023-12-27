import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children, socket }) => {
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        socket.connect();

        if (isAuthenticated) {
            socket.authenticate(user.token);
        }

        return () => {
            socket.disconnect();
        }
    }, [isAuthenticated, user, socket]);


    const value = {
        socket,
        status: socket.connected ? 'connected' : 'disconnected',
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};