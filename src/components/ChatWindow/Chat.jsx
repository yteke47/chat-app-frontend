import React, { useRef } from 'react';
import Message from './Message';
import { Container } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed'
import useUserProfile from '../../hooks/useUserProfile';

function Chat({messages}) {
    const { id: userId } = useUserProfile();
    const scrollableFeed = useRef(null);

    const handleLazyLoading = () => {
        const { scrollTop } = scrollableFeed.current.wrapperRef.current;

        if (scrollTop !== 0) return;

        performLazyLoading();
    };

    const performLazyLoading = () => {
        
    };

    return (
        <Container padding={0} width="100%" height="100%" overflowY="hidden">
            <ScrollableFeed ref={scrollableFeed} onScroll={handleLazyLoading} forceScroll={true}>
                {messages.map(({ id, senderUser, content }) => (
                    <Message key={id}
                        sender={senderUser.username}
                        content={content}
                        isSent={senderUser.id === userId} />
                ))}
            </ScrollableFeed>
        </Container>
    );
}

export default Chat;