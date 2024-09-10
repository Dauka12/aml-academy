import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import '../editCatalog.scss';

const RequestTable = ({requestData}) => {
    const getDate = (date) => {
        const _date = new Date(date);
        const day = String(_date.getDate()).padStart(2, '0');
        const month = String(_date.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-based
        const year = _date.getFullYear();
        const hour = (_date.getHours() - 6);
        const minutes = _date.getMinutes();
        const formattedDate = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")},  ${day}.${month}.${year}`;
        return formattedDate;
    };
    return (
        <div>
            <div className="tableDiv" style={{ width:'1200px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата и время</TableCell>
                                <TableCell>ФИО</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Номер телефона</TableCell>
                                <TableCell align="right">Название курса</TableCell>
                                <TableCell align="right">ID Курса</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requestData.map((course) => (
                                <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: '25px' }}>
                                    <TableCell>{getDate(course.payment_date)}</TableCell>
                                    <TableCell component="th" scope="course">
                                        {course.fio}
                                    </TableCell>
                                    <TableCell align="right">{course.email}</TableCell>
                                    <TableCell align="right">{course.phone_number}</TableCell>
                                    <TableCell align="right">{course.course.course_name}</TableCell>
                                    <TableCell align="right">{course.course.course_id}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default RequestTable
