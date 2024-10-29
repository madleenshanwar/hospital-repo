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
const rows = [
  {
    id: 1,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    birthday: "10/10/2010",
    gender: "Female",
    blood_group: "O-",
    allergies: "",
    medical_history: "",
    patient_complaint: "",
  },
  {
    id: 2,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    birthday: "10/10/2010",
    gender: "Female",
    blood_group: "O-",
    allergies: "",
    medical_history: "",
    patient_complaint: "",
  },
  {
    id: 3,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    birthday: "10/10/2010",
    gender: "Female",
    blood_group: "O-",
    allergies: "",
    medical_history: "",
    patient_complaint: "",
  },
  {
    id: 4,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    birthday: "10/10/2010",
    gender: "Female",
    blood_group: "O-",
    allergies: "",
    medical_history: "",
    patient_complaint: "",
  },
  {
    id: 5,
    first_name: "Sara",
    last_name: "Gamal",
    address: "Homs/syria",
    birthday: "10/10/2010",
    gender: "Female",
    blood_group: "O-",
    allergies: "",
    medical_history: "",
    patient_complaint: "",
  },
];
export default function ReadMoreCard() {
  const { index } = useParams();
  const route=useNavigate();
  const [patient, setPatient] = useState({});
  useEffect(() => {
    setPatient(rows.find((el) => el.id === parseInt(index)));
    console.log(rows.find((el) => el.id === parseInt(index)));
  }, []);
  const handleSurgery=()=>{
    route(`/surgery/${index}`)
  }
  return (
    <Box
      component="div"
      sx={{
        margin: "70px auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "600px",
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
                  sx={{
                    color: "text.primary",
                    fontWeight: "bold",
                    fontSize: "x-large",
                  }}
                >
                  Information about{" "}
                  {patient.first_name + " " + patient.last_name}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "text.primary",
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
                    color: "text.primary",
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
                    color: "text.primary",
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
                    color: "text.primary",
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Patient_Complaint:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {patient.patient_complaint}
                </Typography>
                <br></br>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "text.primary",
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
            route('/patient');
          }}
        >
          Back
        </Button>
    </Box>
  );
}
