import React, { useCallback, useEffect, useState } from "react";
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
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShowDoctors } from "../../../Api/Doctors/ShowDoctors";
import { FetchPatients } from "../../../Api/Patient/FetchPatients";
import { DeletePatientRay } from "../../../Api/ProvideService/Ray/DeletePatientRay";
import { FetchPatientsRays } from "../../../Api/ProvideService/Ray/FetchPatientsRays";
const columns = [
  {
    field: "patient",
    headerName: "patient",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "type_ray",
    headerName: "Type_Ray",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "doctor",
    headerName: "Doctor",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "Read More",
    headerName: "Description",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
export default function ProvideRayList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const route = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    const fetchRays = async () => {
      try {
        const result = await FetchPatientsRays();
        console.log(result.data.data.data);
        setRows(result.data.data.data);
      } catch (error) {
        console.error("Error fetching Rays:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        setDoctors(result.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    const fetchPatients = async () => {
      try {
        const result = await FetchPatients();
        console.log(result.data.data.data);
        setPatient(result.data.data.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatients();
    fetchDoctors();
    fetchRays();
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
    const result = await DeletePatientRay(indexDelete);
    if (result) {
      handleCloseDelete();
      console.log("patient ray delete successfully!");
    } else {
      console.log("Failed to delete patient ray.");
    }
  };
  //handle with update
  const handleUpdate = (row) => {
    route(`/updatepatientray/${row.id}`);
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
                    <TableCell align="center">
                      {row.admission.patient.first_name +
                        " " +
                        row.admission.patient.last_name}
                    </TableCell>
                    <TableCell align="center">{row.ray.type}</TableCell>
                    <TableCell align="center">
                      {(() => {
                        const doctor = doctors.find(
                          (el) => el.id === row.doctor_id
                        );
                        return doctor
                          ? `${doctor.first_name} ${doctor.last_name}`
                          : "this doctor not available";
                      })()}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">
                      <Button
                        title="More Details"
                        onClick={() => route(`/readmoreray/${row.id}`)}
                        variant="contained"
                        sx={{ background: "#07E4DB" }}
                      >
                        More Details
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        title="Delete Test"
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
                        title="update Test"
                        onClick={() => handleUpdate(row)}
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
