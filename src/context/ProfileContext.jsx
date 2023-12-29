import { createContext, useContext, useMemo, useEffect, useReducer } from 'react';
import { getProfile } from '../api/userApi';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketProvider';
import { produce } from 'immer';

const ACTION_TYPES = {
    SET_PROFILE: 'SET_PROFILE',
    NEW_FRIEND_REQUEST: 'NEW_FRIEND_REQUEST',
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_CHAT: 'NEW_CHAT'
};

const DEFAULT_PROFILE = {
    id: null,
    username: null,
    email: null,
    registeredAt: null,
    friendCode: null,
    chats: [],
    messageRequests: [],
};

const PROFILE_LOCAL_STORAGE_KEY = "profile";

const profileReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case ACTION_TYPES.NEW_FRIEND_REQUEST:
            return produce(state, draft => {
                draft.profile.messageRequests.push(action.payload);
            });
        case ACTION_TYPES.NEW_MESSAGE:
            const { chatId, message } = action.payload;
            return produce(state, draft => {
                const chatIndex = draft.profile.chats.findIndex(chat => chat.id === chatId);
                if (chatIndex !== -1) {
                    draft.profile.chats[chatIndex].messages.push(message);
                }
            });
        case ACTION_TYPES.NEW_CHAT:
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
    const { isAuthenticated, user } = useAuth();
    const { socket } = useSocket();

    const initialProfileState = () => {
        try {
            const data = localStorage.getItem(PROFILE_LOCAL_STORAGE_KEY);
            return { profile: data ? JSON.parse(data) : DEFAULT_PROFILE };
        } catch (error) {
            console.error('Error retrieving data from localStorage:', error);
        }

        return { profile: DEFAULT_PROFILE };
    };

    const [state, dispatch] = useReducer(profileReducer, undefined, initialProfileState);


    useEffect(() => {
        const handleNewMessage = ({ chatId, message }) => {
            dispatch({ type: ACTION_TYPES.NEW_MESSAGE, payload: { chatId, message } });
        };

        const handleNewChat = (chat) => {
            dispatch({ type: ACTION_TYPES.NEW_CHAT, payload: { chat } });
        };

        const eventHandlers = [
            { type: ACTION_TYPES.NEW_MESSAGE, handler: handleNewMessage },
            { type: ACTION_TYPES.NEW_CHAT, handler: handleNewChat }
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

    const fetchProfile = async () => {
        try {
            if (isAuthenticated) {
                const response = await getProfile();
                dispatch({ type: ACTION_TYPES.SET_PROFILE, payload: response.data });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [isAuthenticated, user]);

    useEffect(() => {
        localStorage.setItem(PROFILE_LOCAL_STORAGE_KEY, JSON.stringify(state.profile));
    }, [state.profile]);

    const profileContextValue = useMemo(() => ({
        ...state.profile
    }), [state.profile]);

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