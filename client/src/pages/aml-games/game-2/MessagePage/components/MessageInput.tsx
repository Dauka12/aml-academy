import { Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import * as React from 'react';

import SendRoundedIcon from '@mui/icons-material/SendRounded';

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
  recipient: string;
};

export default function MessageInput(props: MessageInputProps) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 1, pb: 2 }}>
      <FormControl>
        <Textarea
          placeholder="Ваше сообщение …"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={""}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="right"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 1,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: 'center', borderRadius: 'sm' }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Отправить
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 36,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}