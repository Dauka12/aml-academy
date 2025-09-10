import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Fade
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import PublicIcon from '@mui/icons-material/Public';
import { t } from 'i18next';

const winners = [
  {
    university: 'МКТУ',
    firstName: 'Ислам',
    lastName: 'Абдулахадов',
    city: 'Туркестан',
    direction: 'ИБ',
  },
  {
    university: 'КарТУ им. Абылкаса Сагинова',
    firstName: 'Халил',
    lastName: 'Каландаров',
    city: 'Караганды',
    direction: 'ИБ',
  },
  {
    university: 'М.Әуезов',
    firstName: 'Батырхан',
    lastName: 'Нариманов',
    city: 'Шымкент',
    direction: 'ИБ',
  },
  {
    university: 'АРУ им. Жубанова',
    firstName: 'Альбина',
    lastName: 'Бухарбаева',
    city: 'Актобе',
    direction: 'ЭК',
  },
  {
    university: 'Атырауский университет имени Х. Досмухамедова',
    firstName: 'Данияр',
    lastName: 'Джумаш',
    city: 'Атырау',
    direction: 'ЭК',
  },
  {
    university: 'Университет Туран',
    firstName: 'Вадим',
    lastName: 'Тотьмянин',
    city: 'Алматы',
    direction: 'ЭК',
  },
  {
    university: 'КарУ им.Букетова',
    firstName: 'Алишер',
    lastName: 'Ким',
    city: 'Караганды',
    direction: 'ЮР',
  },
  {
    university: 'Maqsut Narikbaev University (MNU-KazGUU)',
    firstName: 'Куанышбек',
    lastName: 'Аманбаев',
    city: 'Астана',
    direction: 'ЮР',
  },
  {
    university: 'Maqsut Narikbaev University (MNU-KazGUU)',
    firstName: 'Максат',
    lastName: 'Тилектес',
    city: 'Астана',
    direction: 'МО',
  },
  {
    university: 'Каспийский государственный университет технологий и инжиниринга имени Ш. Есенова',
    firstName: 'Жасмина',
    lastName: 'Закария',
    city: 'Мангистауская обл.',
    direction: 'МО',
  },
];

const getChipColor = (direction: string) => {
  switch (direction) {
    case 'ИБ':
      return 'primary';
    case 'ЭК':
      return 'success';
    case 'ЮР':
      return 'warning';
    case 'МО':
      return 'secondary';
    default:
      return 'default';
  }
};

const getDirectionIcon = (direction: string) => {
  switch (direction) {
    case 'ИБ':
      return <SecurityIcon />;
    case 'ЭК':
      return <AccountBalanceIcon />;
    case 'ЮР':
      return <GavelIcon />;
    case 'МО':
      return <PublicIcon />;
    default:
      return <EmojiEventsIcon />;
  }
};
export const FinalResultsTable = () => {
  const theme = useTheme();
  return (
    <Fade in timeout={600}>
      <Box sx={{ mt: 8, px: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {t('olympiad.resultfinal')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          color="text.secondary"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          {t('olympiad.finaldescription')}
        </Typography>
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead sx={{background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`}}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Университет</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Имя</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Фамилия</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Город</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Направление</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {winners.map((winner, index) => (
                <TableRow key={index}>
                  <TableCell>{winner.university}</TableCell>
                  <TableCell>{winner.firstName}</TableCell>
                  <TableCell>{winner.lastName}</TableCell>
                  <TableCell>{winner.city}</TableCell>
                  <TableCell>
                    <Chip
                      label={winner.direction}
                      color={getChipColor(winner.direction)}
                      icon={getDirectionIcon(winner.direction)}
                      variant="filled"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
};
