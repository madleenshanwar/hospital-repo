import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchOnePatient } from "../../Api/Patient/FetchOnePatient";
import { FetchOneAdmission } from "../../Api/Patient/FetchOneAdmission";
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
    fetchPatient();
    fetchAdmission();
  }, [index]);
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
                  Information about {patient.first_name && patient.last_name ? `${patient.first_name} ${patient.last_name}` : 'Loading...'}
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
                <br/>
                <Divider variant="inset" component="li" />
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
                {admission.length > 0 ? (
                  admission.map((el,index) => (
                    <Box key={index}>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "large",
                          color: "#07E4DB",
                        }}
                      >
                        Admission Date:
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary" ,mr:2}}
                      >
                        {el.admission_date}
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
                        Patient Complaint:
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {el.patient_complaint}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    No data found
                  </Typography>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
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
