import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const columns = [
  {
    field: "id",
    headerName: " ID",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "number",
    headerName: "Number",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "department",
    headerName: "Department-Name",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "bed_numbers",
    headerName: "Bed_numbers",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
const rows = [
  { id: 1, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 2, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 3, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 4, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 5, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 6, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 7, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 8, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
  { id: 9, number: "250", status: "Vacant", department: "", bed_numbers: "1" },
];
export default function RoomList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const route = useNavigate();
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //handle with delete
  //delete
  const [indexDelete, setIndexDelete] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (index) => {
    setOpenDelete(true);
    setIndexDelete(index);
    console.log(index);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  function handleDelete(row) {
    handleCloseDelete();
  }
  //handle with update
  const handleUpdate = (index) => {
    route(`/updatedroom/${index}`);
  };
  return (
    <Container>
      <Paper
        sx={{
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
          overflowX: "auto",
        }}
      >
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.department}</TableCell>
                    <TableCell align="center">{row.bed_numbers}</TableCell>
                    <TableCell align="center">
                      <Button
                        title="Delete Room"
                        onClick={() => handleOpenDelete(index)}
                      >
                        <DeleteIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                      <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            margin: "100px auto",
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
                            borderRadius: 8,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            border: "1px solid #00ACB1",
                            height: "200px",
                            maxWidth: "550px",
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Are You Sure You Won't To Delete This Room??
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ background: "#00ACB1" }}
                              onClick={() => handleDelete(row)}
                            >
                              Yes
                            </Button>
                            <Button
                              type="submit"
                              variant="outlined"
                              sx={{ color: "#00ACB1", ml: 1 }}
                              onClick={handleCloseDelete}
                            >
                              No
                            </Button>
                          </Typography>
                        </Box>
                      </Modal>
                      <Button
                        title="update Room"
                        onClick={() => handleUpdate(index)}
                      >
                        <EditIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
