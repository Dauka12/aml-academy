import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import base_url from "../../../../settings/base_url";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    axios
      .get(base_url + "/api/aml/purchases", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        setPurchases(res.data);
        console.log("purchaseData:", res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredPurchases = purchases.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.email?.toLowerCase().includes(term) ||
      row.firstname?.toLowerCase().includes(term) ||
      row.lastname?.toLowerCase().includes(term) ||
      row.phoneNumber?.toLowerCase().includes(term) ||
      row.courseName?.toLowerCase().includes(term)
    );
  });
  const sortedPurchases = [...filteredPurchases].sort((a, b) => {
    const dateA = new Date(a.paymentDate);
    const dateB = new Date(b.paymentDate);
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
  const totalPages = Math.ceil(sortedPurchases.length / pageSize);
  const paginatedData = sortedPurchases.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(`${base_url}/api/aml/purchases/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      setPurchases((prev) => prev.filter((p) => p.id !== deleteId));
      setOpenDialog(false);
      setDeleteId(null);
    } catch (err) {
      alert("Ошибка при удалении");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <TextField
          label="Поиск"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{ width: 300 }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ height: 48 }}>
              <TableCell sx={{ width: 40 }}>№</TableCell>
              <TableCell
                sx={{
                  width: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  width: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Имя
              </TableCell>
              <TableCell
                sx={{
                  width: 120,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Фамилия
              </TableCell>
              <TableCell
                sx={{
                  width: 130,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                ИИН
              </TableCell>
              <TableCell
                sx={{
                  width: 350,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Телефон
              </TableCell>
              <TableCell
                sx={{
                  width: 350,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Курс
              </TableCell>
              <TableCell
                sx={{
                  width: 350,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Тип оплаты
              </TableCell>
              <TableCell
                sx={{
                  width: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Тип участника
              </TableCell>
              <TableCell
                sx={{
                  width: 150,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Участник системы
              </TableCell>
              <TableCell
                sx={{
                  width: 140,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  Дата оплаты
                  <IconButton
                    size="medium"
                    color="primary"
                    sx={{
                      ml: 1,
                      backgroundColor: "#f0f4ff",
                      "&:hover": { backgroundColor: "#e3e8f5" },
                      border: "1px solid #90caf9",
                      boxShadow: 1,
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    {sortOrder === "asc" ? (
                      <KeyboardArrowUpIcon fontSize="medium" color="primary" />
                    ) : (
                      <KeyboardArrowDownIcon
                        fontSize="medium"
                        color="primary"
                      />
                    )}
                  </IconButton>
                </span>
              </TableCell>
              <TableCell sx={{ width: 48 }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow key={idx} sx={{ height: 48 }}>
                <TableCell sx={{ width: 40 }}>
                  {(page - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell
                  sx={{
                    width: 200,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell
                  sx={{
                    width: 100,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.firstname}
                </TableCell>
                <TableCell
                  sx={{
                    width: 120,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.lastname}
                </TableCell>
                <TableCell
                  sx={{
                    width: 130,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.iin}
                </TableCell>
                <TableCell
                  sx={{
                    width: 130,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.phoneNumber}
                </TableCell>
                <TableCell
                  sx={{
                    width: 350,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.courseName}
                </TableCell>
                <TableCell
                  sx={{
                    width: 100,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.paymentType}
                </TableCell>
                <TableCell
                  sx={{
                    width: 100,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.type_of_member}
                </TableCell>
                <TableCell
                  sx={{
                    width: 150,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.member_of_the_system}
                </TableCell>
                <TableCell
                  sx={{
                    width: 140,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.paymentDate}
                </TableCell>
                <TableCell sx={{ width: 48 }} align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{ mt: 2 }}
        />
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить покупку?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loadingDelete}>
            Отмена
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            disabled={loadingDelete}
            autoFocus
          >
            {loadingDelete ? "Удаление..." : "Удалить"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Purchases;
