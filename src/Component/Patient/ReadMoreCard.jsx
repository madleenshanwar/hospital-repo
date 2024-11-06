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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchOnePatient } from "../../Api/Patient/FetchOnePatient";
import { FetchOneAdmission } from "../../Api/Patient/FetchOneAdmission";
import { FetchAllInfoPatient } from "../../Api/InfoAboutPatient/FetchAllInfoPatient";
const columns = [
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
export default function ReadMoreCard() {
  const { index } = useParams();
  const route = useNavigate();
  const [patient, setPatient] = useState({});
  const [admission, setAdmission] = useState([]);
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
        const result = await FetchAllInfoPatient(index);
        console.log("All Information",result.data.data);
        // setPatient(result.data.data);
      } catch (error) {
        console.error("Error fetching all info about patient:", error);
      }
    };
    fetchAllInfoPatient()
    fetchPatient();
    fetchAdmission();
  }, [index]);
  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
                          {row.discharge_date?row.discharge_date:"Not out yet"}
                        </TableCell>
                        <TableCell align="center">
                          {row.discharge_reason?row.discharge_reason:"Not out yet"}
                        </TableCell>
                        <TableCell align="center">
                          {row.doctor?row.doctor.first_name+" "+row.doctor.last_name:"Not out yet"}
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
