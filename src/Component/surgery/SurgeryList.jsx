import React, { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FetchSurgery } from "../../Api/Surgery/FetchSurgery";
import { DeleteSurgery } from "../../Api/Surgery/DeleteSurgery";
import { ChangeRoomStatus } from "../../Api/Room/ChangeRoomStatus";
const columns = [
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
export default function SurgeryList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const route = useNavigate();
  useEffect(() => {
    const fetchSurgery = async () => {
      try {
        const result = await FetchSurgery();
        console.log(result.data.data.data);
        setRows(result.data.data.data);
      } catch (error) {
        console.error("Error fetching surgery:", error);
      }
    };
    fetchSurgery();
  }, []);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  },[]);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  },[]);
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
    const result = await DeleteSurgery(indexDelete);
    if (result) {
      handleCloseDelete();
      console.log("Surgery delete successfully!");
    } else {
      console.log("Failed to delete surgery .");
    }
  };
  //handle with update
  const handleUpdate = (id) => {
    route(`/updatesurgery/${id}`);
  };
  //handle with empty room
  const status = "vacant";
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = (row) => {
    setOpen(true);
    setIndex(row.room_id);
    console.log(row.room_id);
  };
  const handleClose = () => setOpen(false);
  const handleEmptyRoom = async () => {
    const result = await ChangeRoomStatus(status, index);
    if (result) {
      handleClose();
      console.log("Empty Room successfully!");
    } else {
      console.log("Failed to empty room.");
    }
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
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.hour}</TableCell>
                    <TableCell align="center">
                      {row.admission.patient
                        ? `${row.admission.patient.first_name} ${row.admission.patient.last_name}`
                        : "unknown patient"}{" "}
                    </TableCell>
                    <TableCell align="center">{row.anesthesia_type}</TableCell>
                    <TableCell align="center">{row.room_id}</TableCell>
                    <TableCell align="center">
                      {row.doctors.map((doctor) => (
                        <li key={doctor.id}>
                          {doctor.first_name + " " + doctor.last_name}
                        </li>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        title="Delete Surgery"
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
                        title="update Surgery"
                        onClick={() => handleUpdate(row.id)}
                      >
                        <EditIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                      <Button
                        title="Empty the room"
                        onClick={() => handleOpen(row)}
                      >
                        <LogoutIcon sx={{ color: "#07E4DB" }} />
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
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
                            Are You Sure You Won't To Empty This Room??
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ background: "#00ACB1" }}
                              onClick={() => handleEmptyRoom()}
                            >
                              Yes
                            </Button>
                            <Button
                              type="submit"
                              variant="outlined"
                              sx={{ color: "#00ACB1", ml: 1 }}
                              onClick={handleClose}
                            >
                              No
                            </Button>
                          </Typography>
                        </Box>
                      </Modal>
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
