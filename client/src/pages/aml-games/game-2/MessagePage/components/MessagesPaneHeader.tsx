import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CircleIcon from '@mui/icons-material/Circle';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { UserProps } from '../types.tsx';
import { toggleMessagesPane } from '../utils.tsx';

type MessagesPaneHeaderProps = {
  sender: UserProps;
  image: string;
};

export default function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
  const { sender, image } = props;
  return (
    <>
        <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.body',
        }}
        py={{ xs: 2, md: 2 }}
        px={{ xs: 1, md: 2 }}
      >
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            onClick={() => toggleMessagesPane()}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Avatar size="lg" src={sender.avatar} />
          <div>
            <Typography
              fontWeight="lg"
              fontSize="lg"
              component="h2"
              noWrap
              endDecorator={
                sender.online ? (
                  <Chip
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    sx={{
                      borderRadius: 'sm',
                    }}
                    startDecorator={
                      <CircleIcon sx={{ fontSize: 8 }} color="success" />
                    }
                    slotProps={{ root: { component: 'span' } }}
                  >
                    Online
                  </Chip>
                ) : undefined
              }
            >
              {sender.name}
            </Typography>
            <Typography level="body-sm">{sender.username}</Typography>
          </div>
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton size="sm" variant="plain" color="neutral">
            <MoreVertRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
      {image ?  (<img src={image} style={{width:"100%"}} alt="image1 header" />) : null}
    </>
  );
}