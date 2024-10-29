import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
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
    field: "name",
    headerName: "Name",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "date",
    headerName: "Date",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "time",
    headerName: "Time",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "patient_id",
    headerName: "Patient_Id",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "anesthesia_type",
    headerName: "Anesthesia_Yype",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "room_id",
    headerName: "Room_Id",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "doctors",
    headerName: "Doctors",
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
    name: "evening",
    date: "11/11/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 2,
    name: "evening",
    date: "12/11/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 3,
    name: "evening",
    date: "13/11/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 4,
    name: "evening",
    date: "14/11/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 5,
    name: "evening",
    date: "11/12/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 6,
    name: "evening",
    date: "12/12/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 7,
    name: "evening",
    date: "13/12/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
  {
    id: 8,
    name: "evening",
    date: "14/12/2020",
    time: "12",
    patient_id: "2",
    anesthesia_type: "general anesthesia",
    room_id: "15",
    doctors: ["sara", "khaled", "rose"],
  },
];
export default function SurgeryList() {
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
    route(`/updatesurgery/${index}`);
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">{row.patient_id}</TableCell>
                        <TableCell align="center">{row.anesthesia_type}</TableCell>
                        <TableCell align="center">{row.room_id}</TableCell>
                        <TableCell align="center">{row.doctors}</TableCell>
                        <TableCell align="center">
                          <Button
                            title="Delete Surgery"
                            onClick={() => handleOpenDelete(row.id)}
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
                                Are You Sure You Won't To Delete This Row??
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
                            title="update Surgery"
                            onClick={() => handleUpdate(row.id)}
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
