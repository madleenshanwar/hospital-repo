import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FetchPatients } from "../../Api/Patient/FetchPatients";
import { DeletePatient } from "../../Api/Patient/DeletePatient";
import LoginIcon from "@mui/icons-material/Login";
const columns = [
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
    field: "gender",
    headerName: "Gender",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "blood_group",
    headerName: "blood_group",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "medical_history",
    headerName: "Medical_History",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "more_details",
    headerName: "More Details",
    minWidth: 150,
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
export default function PatientList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const route = useNavigate();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await FetchPatients();
        console.log(result.data.data.data);
        setRows(result.data.data.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatients();
  }, []);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);
  //handle with delete
  //delete
  const [indexDelete, setIndexDelete] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (row) => {
    setOpenDelete(true);
    setIndexDelete(row.id);
    console.log(row.id);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = async () => {
    const result = await DeletePatient(indexDelete);
    if (result) {
      handleCloseDelete();
      console.log("Patient delete successfully!");
    } else {
      console.log("Failed to delete patient.");
    }
  };
  //handle with update
  const handleUpdate = (row) => {
    route(`/updatePatient/${row.id}`);
  };
  //handle with Discharge patient
  const handleDischarge = async (id) => {
    route(`/discharge/${id}`);
  };
  //handle with book a room
  const handleBookRoom = (id) => {
    route(`/bookaroom/${id}`);
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
                    <TableCell align="center">{row.first_name} </TableCell>
                    <TableCell align="center">{row.last_name}</TableCell>
                    <TableCell align="center">{row.gender}</TableCell>
                    <TableCell align="center">{row.blood_group}</TableCell>
                    <TableCell align="center">{row.medical_history}</TableCell>
                    <TableCell align="center">
                      <Button
                        title="More Details"
                        onClick={() => route(`/readmore/${row.id}`)}
                        variant="contained"
                        sx={{ background: "#07E4DB" }}
                      >
                        More Details
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        title="admission patient"
                        onClick={() => route(`/admission/${row.id}`)}
                      >
                        <LoginIcon
                          sx={{ color: "#07E4DB", fontWeight: "bold" }}
                        />
                      </Button>
                      <Button
                        title="update Patient"
                        onClick={() => handleUpdate(row)}
                      >
                        <EditIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                      <Button
                        title="Delete Patient"
                        onClick={() => handleOpenDelete(row)}
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
                            Are You Sure You Won't To Delete This Patient??
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ background: "#00ACB1" }}
                              onClick={() => handleDelete()}
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
                        title="discharge Patient"
                        onClick={() => handleDischarge(row.id)}
                      >
                        <LogoutIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                      <Button
                        title="book a room"
                        onClick={() => handleBookRoom(row.id)}
                      >
                        <AddIcon
                          sx={{
                            color: "#07E4DB",
                            border: "1px solid #07E4DB",
                            fontWeight: "bold",
                            borderRadius: "50%",
                          }}
                        />
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
