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
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "first_name",
    headerName: " First_Name",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "last_name",
    headerName: "Last_Name",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "address",
    headerName: "Address",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "specialty",
    headerName: "Specialty",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "phone",
    headerName: "Phone Number",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "LicenseNumber",
    headerName: "LicenseNumber",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "status",
    headerName: "status",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "department_head",
    headerName: "department_head",
    minWidth: 50,
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
  {
    id: 1,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    specialty: "surgeon",
    phone: "0967677464",
    LicenseNumber: "21430",
    status: "active",
    department_head: "No",
  },
];
export default function DoctorList() {
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
    route(`/updatedoctor/${index}`);
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
                    <TableCell align="center">{row.first_name}</TableCell>
                    <TableCell align="center">{row.last_name}</TableCell>
                    <TableCell align="center">{row.address}</TableCell>
                    <TableCell align="center">{row.specialty}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.LicenseNumber}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.department_head}</TableCell>
                    <TableCell align="center">
                      <Button
                        title="Delete Doctor"
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
                            Are You Sure You Won't To Delete This Doctor??
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
                        title="update Doctor"
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
