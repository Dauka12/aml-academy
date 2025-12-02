import React, { useEffect, useState } from 'react';
import axios from 'axios';
import base_url from '../../../../settings/base_url';
import { Box, Card, Typography, TextField, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const FormRequests = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');

  const load = async () => {
    try {
      const res = await axios.get(`${base_url}/api/aml/auth/messages`, { params: { q, page: page - 1, size: 10 } });
      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, [q, page]);

  return (
    <Box>
      <Card sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Заявки с формы</Typography>
        <TextField label="Поиск (имя/email/телефон)" size="small" value={q} onChange={e => setQ(e.target.value)} />
      </Card>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Подписка</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{new Date(i.createdAt).toLocaleString('ru-RU')}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.email}</TableCell>
                <TableCell>{i.phoneNumber}</TableCell>
                <TableCell>{i.comment}</TableCell>
                <TableCell>{i.isNews ? 'Да' : 'Нет'}</TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">Нет данных</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={Math.max(1, Math.ceil(total / 10))} page={page} onChange={(_, v) => setPage(v)} />
      </Stack>
    </Box>
  );
};

export default FormRequests;
