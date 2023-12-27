import { createContext, useContext, useMemo, useEffect, useReducer } from 'react';
import { getProfile } from '../api/userApi';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketProvider';
import { produce } from 'immer';

const actionTypes = {
    SET_PROFILE: 'SET_PROFILE',
    NEW_FRIEND_REQUEST: 'NEW_FRIEND_REQUEST',
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_CHAT: 'NEW_CHAT'
};

const LOCAL_STORAGE_KEY = "profile";

const profileReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case actionTypes.NEW_FRIEND_REQUEST:
            return produce(state, draft => {
                draft.profile.messageRequests.push(action.payload);
            });
        case actionTypes.NEW_MESSAGE:
            const { chatId, message } = action.payload;
            return produce(state, draft => {
                const chatIndex = draft.profile.chats.findIndex(chat => chat.id === chatId);
                if (chatIndex !== -1) {
                    draft.profile.chats[chatIndex].messages.push(message);
                }
            });
        case actionTypes.NEW_CHAT:
            const chat = action.payload;
            return produce(state, draft => {
                draft.profile.chats.push(chat);
            });
        default:
            return state;
    }
};

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const { socket } = useSocket();

    const initialProfileState = () => {
        try {
            const data = localStorage.getItem(LOCAL_STORAGE_KEY);
            return { profile: data ? JSON.parse(data) : null };
        } catch (error) {
            console.error('Error retrieving data from localStorage:', error);
            return { profile: null };
        }
    };

    const [state, dispatch] = useReducer(profileReducer, undefined, initialProfileState);


    useEffect(() => {
        const handleNewMessage = ({ chatId, message }) => {
            dispatch({ type: actionTypes.NEW_MESSAGE, payload: { chatId, message } });
        };

        const handleNewChat = (chat) => {
            dispatch({ type: actionTypes.NEW_CHAT, payload: { chat } });
        };

        const eventHandlers = [
            { type: actionTypes.NEW_MESSAGE, handler: handleNewMessage },
            { type: actionTypes.NEW_CHAT, handler: handleNewChat }
        ];

        eventHandlers.forEach(({ type, handler }) => {
            socket.on(type, handler);
        });

        return () => {
            eventHandlers.forEach(({ type, handler }) => {
                socket.off(type, handler);
            });
        };
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (isAuthenticated) {
                    const response = await getProfile();
                    dispatch({ type: actionTypes.SET_PROFILE, payload: response.data });
                } else {
                    dispatch({ type: actionTypes.SET_PROFILE, payload: null });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [isAuthenticated, socket, dispatch]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.profile));
    }, [state.profile]);

    const profileContextValue = useMemo(() => {
        return {
            profile: state.profile,
        };
    }, [state.profile]);

    return (
        <ProfileContext.Provider value={profileContextValue}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const profileContext = useContext(ProfileContext);
    if (!profileContext) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return profileContext;
}