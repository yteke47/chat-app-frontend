import React from 'react';
import Message from './Message';
import { Container } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed'
import { useMessage } from '../../context/MessageContext';

function Chat() {
    const { messages } = useMessage();

    return (
        <Container padding={0} width="100%" height="100%" overflowY="hidden">
            <ScrollableFeed forceScroll={true}>
                {messages.map(({ id, author, content }) => (
                    <Message key={id}
                        sender={author}
                        content={content}
                        isSent={author === 'Yiğit'} />
                ))}
            </ScrollableFeed>
        </Container>
    );
}

export default Chat;