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
import { FetchSchedule } from "../../Api/Schedules/FetchSchedule";
import { ShowDepartments } from "../../api/Department/Show";
import { DeleteSchedule } from "../../Api/Schedules/DeleteSchedule";
const columns = [
  {
    field: "shift_type",
    headerName: "shift_type",
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
    field: "start_time",
    headerName: "Start_Time",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "end_time",
    headerName: "End_Time",
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
    field: "department",
    headerName: "Department",
    minWidth: 100,
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
export default function SchedulesList() {
  const [month, setMonth] = useState("");
  const [rows, setRows] = useState([]);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    setMonth(localStorage.getItem("month"));
    const fetchSchedule = async () => {
      try {
        const result = await FetchSchedule(month);
        console.log(result.data.data);
        setRows(result.data.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const result = await ShowDepartments();
        const departmentsData = result.data.data;
        const departmentsMap = {};
        departmentsData.forEach((department) => {
          departmentsMap[department.id] = department;
        });
        setDepartments(departmentsMap);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchSchedule();
    fetchDepartments();
  }, [month]);
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
  const handleOpenDelete = (row) => {
    setOpenDelete(true);
    setIndexDelete(row.id);
    console.log(row.id);
  };
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = async () => {
    const result = await DeleteSchedule(indexDelete);
    if (result) {
      handleCloseDelete();
      console.log("Schedule delete successfully!");
    } else {
      console.log("Failed to delete schedule.");
    }
  };
  //handle with update
  const handleUpdate = (id) => {
    route(`/updateshift/${id}}`);
  };
  return (
    <>
      <Box>
        <TextField
          id="outlined-select-currency"
          select
          label="please select your month"
          onChange={(e) => {
            setMonth(e.target.value);
            localStorage.setItem("month", e.target.value);
          }}
          value={month}
          name="month"
          sx={{ width: "250px" }}
        >
          <MenuItem value="01">Junuary</MenuItem>
          <MenuItem value="02">February</MenuItem>
          <MenuItem value="03">March</MenuItem>
          <MenuItem value="04">April</MenuItem>
          <MenuItem value="05">May</MenuItem>
          <MenuItem value="06">June</MenuItem>
          <MenuItem value="07">July</MenuItem>
          <MenuItem value="08">August</MenuItem>
          <MenuItem value="09">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </TextField>
      </Box>
      {rows.length > 0 ? (
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
                        <TableCell align="center">{row.shift_type}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.start_time}</TableCell>
                        <TableCell align="center">{row.end_time}</TableCell>
                        <TableCell align="center">
                          {row.doctors.map((doctor) => (
                            <li key={doctor.id}>
                              {doctor.first_name + " " + doctor.last_name}
                            </li>
                          ))}
                        </TableCell>
                        <TableCell align="center">
                          {departments[row.shiftable_id]?.name ||
                            "Unknown Department"}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            title="Delete Schedule"
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
                            title="update Schedule"
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
      ) : (
        ""
      )}
    </>
  );
}
