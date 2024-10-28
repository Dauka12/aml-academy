import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import base_url from '../../../../settings/base_url';

const EventRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getRequests`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            id: 1
                        }
                    }
                    );
                setRequests(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <Typography>Loading requests...</Typography>;
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Заявки на мероприятия</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID мероприятия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.eventId}</TableCell>
                                <TableCell>{request.username}</TableCell>
                                <TableCell>{request.phoneNumber}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EventRequestsTable;