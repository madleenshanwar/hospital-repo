import React, { useEffect, useState } from "react";
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
import { ShowDoctors } from "../../api/Doctors/ShowDoctors";
import { DeleteDoctor } from "../../Api/Doctors/DeleteDoctor";
import { ShowDepartments } from "../../api/Department/Show";
const columns = [
  {
    field: "full_name",
    headerName: "Full Name",
    minWidth: 120,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "Speciality",
    headerName: "speciality",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "address",
    headerName: "Address",
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
    field: "department",
    headerName: "Department",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "department_head",
    headerName: "is a head?",
    minWidth: 150,
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
export default function DoctorList() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const route = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        setRows(result.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const result = await ShowDepartments();
        const departmentsData = result.data.data;
        const departmentsMap = {};
        departmentsData.forEach(department => {
          departmentsMap[department.id] = department;
        });
        setDepartments(departmentsMap);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDoctors();
    fetchDepartments();
  }, []);

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
  const handleOpenDelete = (row) => {
    setOpenDelete(true);
    setIndexDelete(row.id);
    console.log(row.id);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = async () => {
    const result = await DeleteDoctor(indexDelete);
    if (result) {
      handleCloseDelete();
      console.log("Room delete successfully!");
    } else {
      console.log("Failed to delete room.");
    }
  };
  //handle with update
  const handleUpdate = (row) => {
    route(`/updatedoctor/${row.id}`);
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
                      {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell align="center">{row.speciality}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      {row.city}/{row.street}
                    </TableCell>
                    <TableCell align="center">{row.license_number}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                    {departments[row.department_id]?.name || 'Unknown Department'}
                    </TableCell>
                    <TableCell align="center">
                      {row.department_head ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        title="Delete Doctor"
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
                        title="update Doctor"
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
