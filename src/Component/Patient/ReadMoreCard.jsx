import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchOnePatient } from "../../Api/Patient/FetchOnePatient";
import { FetchOneAdmission } from "../../Api/Patient/FetchOneAdmission";
import { FetchAllInfoPatient } from "../../Api/InfoAboutPatient/FetchAllInfoPatient";
import { ShowRoom } from "../../Api/Room/ShowRoom";
import { FetchTest } from "../../Api/services/Test/FetchTest";
import { FetchLastAdmission } from "../../Api/Patient/FetchLastAdmission";
import { ShowDoctors } from "../../Api/Doctors/ShowDoctors";
import { FetchRays } from "../../Api/services/rays/FetchRays";
const admissionColumns = [
  {
    field: "admission_date",
    headerName: "Admission_Date",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "patient_complaint",
    headerName: "Patient_Complaint",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "discharge_date",
    headerName: "Discharge_Date",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "discharge_reason",
    headerName: "Discharge_Reason",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "doctor",
    headerName: "Doctor",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
const surgeryColumns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "anesthesia_type",
    headerName: "Anesthesia_Type",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "date",
    headerName: "Date",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "start_time",
    headerName: "Start Time",
    minWidth: 100,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "end_time",
    headerName: "End_Time",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "room",
    headerName: "Room",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
const rayColumns = [
  {
    field: "type",
    headerName: "Type",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "date",
    headerName: "Date",
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
    field: "result",
    headerName: "Result",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
const testColumns = [
  {
    field: "type",
    headerName: "Type",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "date",
    headerName: "Date",
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
    field: "result",
    headerName: "Result",
    minWidth: 200,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];
export default function ReadMoreCard() {
  const { index } = useParams();
  const route = useNavigate();
  const [patient, setPatient] = useState({});
  const [admission, setAdmission] = useState([]);
  const [surgery, setSurgery] = useState([]);
  const [room, setRoom] = useState([]);
  const [patientRays, setPatientRays] = useState([]);
  const [patientTest, setPatientTest] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [test, setTest] = useState([]);
  const [rays, setRays] = useState([]);
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const result = await FetchOnePatient(index);
        console.log(result.data.data);
        setPatient(result.data.data);
      } catch (error) {
        console.error("Error fetching one patient:", error);
      }
    };
    const fetchAdmission = async () => {
      try {
        const result = await FetchOneAdmission(index);
        console.log("admission", result.data.data);
        setAdmission(result.data.data);
      } catch (error) {
        console.error("Error fetching one admission:", error);
      }
    };
    const fetchAllInfoPatient = async () => {
      try {
        const response = await FetchLastAdmission(index);
        console.log("last admission Information", response.data.data.id);
        try {
          const result = await FetchAllInfoPatient(response.data.data.id);
          console.log("All Information", result.data.data);
          console.log("surgeries", result.data.data.surgeries);
          setSurgery(result.data.data.surgeries);
          setPatientRays(result.data.data.patient_rays);
          setPatientTest(result.data.data.patient_tests);
        } catch (error) {
          console.error("Error fetching all info about patient:", error);
        }
      } catch (error) {
        console.error("last admission Information:", error);
      }
    };
    const fetchRooms = async () => {
      try {
        const result = await ShowRoom();
        console.log(result.data.data);
        setRoom(result.data.data);
      } catch (error) {
        console.error("Error fetching Room:", error);
      }
    };
    const fetchTests = async () => {
      try {
        const result = await FetchTest();
        console.log("test", result.data.data.data);
        setTest(result.data.data.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    const fetchDoctors = async () => {
      try {
        const result = await ShowDoctors();
        console.log("doctor", result.data.data);
        setDoctors(result.data.data);
      } catch (error) {
        console.error("Error fetching Doctor:", error);
      }
    };
    const fetchRays = async () => {
      try {
        const result = await FetchRays();
        console.log("ray", result.data.data.data);
        setRays(result.data.data.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchRays();
    fetchDoctors();
    fetchTests();
    fetchRooms();
    fetchAllInfoPatient();
    fetchPatient();
    fetchAdmission();
  }, [index]);
  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = useCallback((_event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);
  return (
    <Box
      className="read-item "
      component="div"
      sx={{
        margin: "70px auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "fit-content",
      }}
    >
      <List sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
        <ListItem>
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="div"
                  variant="body2"
                  align="center"
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >
                  Information about{" "}
                  {patient.first_name && patient.last_name
                    ? `${patient.first_name} ${patient.last_name}`
                    : "Loading..."}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Number:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {" "}
                  {patient.number}
                </Typography>
                <br></br>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Birthday:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {" "}
                  {patient.birthday}
                </Typography>
                <br></br>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Address:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {" "}
                  {patient.address}
                </Typography>
                <br></br>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Allergies:{" "}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {patient.allergies}
                </Typography>
                <br></br>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Medical History:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {patient.medical_history}
                </Typography>
                <br />
                <Divider variant="fullWidth" component="li" />
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Typography
        component="div"
        variant="body2"
        align="center"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        Admission Info...
      </Typography>
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
                {admissionColumns.map((column) => (
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
              {admission.length > 0 ? (
                admission
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">
                          {row.admission_date}
                        </TableCell>
                        <TableCell align="center">
                          {row.patient_complaint}
                        </TableCell>
                        <TableCell align="center">
                          {row.discharge_date
                            ? row.discharge_date
                            : "Not out yet"}
                        </TableCell>
                        <TableCell align="center">
                          {row.discharge_reason
                            ? row.discharge_reason
                            : "Not out yet"}
                        </TableCell>
                        <TableCell align="center">
                          {row.doctor
                            ? row.doctor.first_name + " " + row.doctor.last_name
                            : "Not out yet"}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  This patient has not yet been admitted
                </Typography>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={admission.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      {/* info about surgeries */}
      <Typography
        component="div"
        variant="body2"
        align="center"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        Surgeries Info...
      </Typography>
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
                {surgeryColumns.map((column) => (
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
              {surgery.length > 0 ? (
                surgery
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          {row.anesthesia_type}
                        </TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.hour}</TableCell>
                        <TableCell align="center">
                          {row.end_hour ? row.end_hour : "Not finished yet"}
                        </TableCell>
                        <TableCell align="center">
                          {room.find((el) => el.id === row.room_id)?.number}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  This patient has not had any surgery yet
                </Typography>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={surgery.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      {/* Test Service */}
      <Typography
        component="div"
        variant="body2"
        align="center"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        Test Service Info...
      </Typography>
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
                {testColumns.map((column) => (
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
              {patientTest.length > 0 ? (
                patientTest
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">
                          {test.find((el) => el.id === row.test_id)?.type}
                        </TableCell>
                        <TableCell align="center">{row.date}</TableCell>
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
                        <TableCell align="center">
                          {row.result
                            ? row.result
                            : "the result is not out yet"}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  This patient has not had any Tests yet
                </Typography>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={patientTest.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      {/* ray serviec */}
      <Typography
        component="div"
        variant="body2"
        align="center"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        Ray Service Info...
      </Typography>
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
                {rayColumns.map((column) => (
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
              {patientRays.length > 0 ? (
                patientRays
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="center">
                          {rays.find((el) => el.id === row.ray_id)?.type}
                        </TableCell>
                        <TableCell align="center">{row.date}</TableCell>
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
                        <TableCell align="center">
                          {row.result
                            ? row.result
                            : "the result is not out yet"}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  This patient has not had any Rays yet
                </Typography>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={patientRays.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Button
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
        onClick={() => {
          route("/patient");
        }}
      >
        Back
      </Button>
    </Box>
  );
}
