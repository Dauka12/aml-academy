import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { ChatProps, MessageProps, UserProps } from '../types.tsx';
import { toggleMessagesPane } from '../utils.tsx';
import AvatarWithStatus from './AvatarWithStatus.tsx';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: UserProps;
  messages: MessageProps[];
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem(props: ChatListItemProps) {
  const { id, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, sender, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={sender.online} src={sender.avatar} sx={{height:"45px", width:"45px"}}/>
            <Box className="chat-user-name" sx={{ flex: 1, display:'flex', justifyContent:"left", alignItems:"center" }}>
              <Typography level="title-sm">{sender.name}</Typography>
              <Typography level="body-sm">{sender.username}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
            </Box>
          </Stack>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}