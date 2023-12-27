import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';

const AuthContext = createContext(undefined);


function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join(''));

    return JSON.parse(jsonPayload);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('user', null);

    const isAuthenticated = useMemo(() => {
        if (!user || !user.email || !user.token) {
            return false;
        }
        const { exp } = parseJwt(user.token) || {};

        return exp && new Date(exp * 1000) > new Date();
    }, [user]);

    useEffect(() => {
        if (!isAuthenticated) {
            setUser(null);
        }
    }, [isAuthenticated, setUser, user]);

    const authContextValue = useMemo(() => {
        return {
            isAuthenticated,
            user,
            setUser,
        };
    }, [isAuthenticated, user, setUser]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
}