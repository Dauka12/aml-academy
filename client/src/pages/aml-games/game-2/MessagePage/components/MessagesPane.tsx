import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChatProps, MessageProps } from '../types.tsx';
import AvatarWithStatus from './AvatarWithStatus.tsx';
import ChatBubble from './ChatBubble.tsx';
import MessageInput from './MessageInput.tsx';
import MessagesPaneHeader from './MessagesPaneHeader.tsx';

type MessagesPaneProps = {
  chat: ChatProps;
  image: string;
};

export default function MessagesPane(props: MessagesPaneProps) {
  const { chat, image } = props;
  const [chatMessages, setChatMessages] = useState<MessageProps[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [recipient, setRecipient] = useState('9umLzZWFyVSAagEU2xLcNikCqef1');
  const [typing, setTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  

  useEffect(() => {
    setChatMessages([]);
    setMessageIndex(0);
    console.log(messageIndex);
    setRecipient('9umLzZWFyVSAagEU2xLcNikCqef1')
    

    const timers = chat.messages.map((message, index) => {
      return setTimeout(() => {
        if (index % 2 !== 0) {
          setTyping(true);
          setTimeout(() => {
            setChatMessages(prevMessages => [...prevMessages, message]);
            setTyping(false);
            setMessageIndex(index + 1);
          }, 1000); // 5000ms typing animation
        } else {
          setChatMessages(prevMessages => [...prevMessages, message]);
          setMessageIndex(index + 1);
        }
      }, index * 2000); // Adjust this to have a consistent delay between messages
    });
    return () => {
      timers.forEach(clearTimeout); // Clean up timeouts on unmount or chat change
    };
  }, []);

  const handleSubmit = () => {
    const newId = chatMessages?.length + 1;
    const newIdString = newId.toString();
    const newMessage: MessageProps = {
      id: newIdString,
      sender: 'You',
      content: textAreaValue,
      timestamp: 'Just now',
    };
    setChatMessages([...chatMessages, newMessage]);
    setTextAreaValue('');
  };

  return (
    <Sheet
      sx={{
        height: image ? "931.5px" : "521.5px" ,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.level1',
      }}
    >
      <MessagesPaneHeader sender={chat.sender} image={image} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {message.sender !== 'You' && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
          {typing && (
            <Stack direction="row" spacing={2}>
              <AvatarWithStatus
                online={chat.sender.online}
                src={chat.sender.avatar}
              />
              <Box
                sx={{
                  backgroundColor: 'background.level2',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  color: 'text.secondary',
                }}
              >
                Печатает...
              </Box>
            </Stack>
          )}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={handleSubmit}
        recipient={recipient}
      />
    </Sheet>
  );
}
