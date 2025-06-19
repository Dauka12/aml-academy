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
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import base_url from "../../../../settings/base_url";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    axios
      .get(base_url + "/api/aml/purchases")
      .then((res) => {
        setPurchases(res.data);
        console.log("purchaseData:", res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const sortedPurchases = [...purchases].sort((a, b) => {
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

  return (
    <div>
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
                  width: 100,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Тип оплаты
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
                    width: 140,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.paymentDate}
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
    </div>
  );
};

export default Purchases;
