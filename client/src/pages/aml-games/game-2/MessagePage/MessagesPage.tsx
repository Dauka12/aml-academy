import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import * as React from 'react';
import MyMessages from './components/MyMessages.tsx';
import { ChatProps } from './types.tsx';

type MessagesJoyProps = {
    image: string,
    chats: ChatProps[]
}
export default function MessagesComponent(props: MessagesJoyProps) {
  const { image, chats } = props;
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', border:"0.5px solid gray", borderRadius:"8px", overflow:"hidden", height: image ? 'fit-content': '825px'}}>
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages image={image} chats={chats} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}