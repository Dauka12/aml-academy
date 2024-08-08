import Sheet from '@mui/joy/Sheet';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ChatProps } from '../types';
import ChatsPane from './ChatsPane.tsx';
import MessagesPane from './MessagesPane.tsx';

type MyMessagesProps = {
  image: string;
  chats: ChatProps[]
};

export default function MyProfile(props: MyMessagesProps) {
  const { image, chats } = props;
  const [selectedChat, setSelectedChat] = useState<ChatProps>(chats[0]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Fetch chats if necessary
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane key={selectedChat.id} chat={selectedChat} image={image} />
    </Sheet>
  );
}
