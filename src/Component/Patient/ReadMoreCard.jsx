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
export default function ReadMoreCard() {
  const { index } = useParams();
  const route=useNavigate();
  const [patient, setPatient] = useState({});
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const result = await FetchOnePatient(index);
        console.log(result.data.data)
        setPatient(result.data.data);
      } catch (error) {
        console.error("Error fetching one patient:", error);
      }
    };
    fetchPatient();
  }, [index]);
  // const handleSurgery=()=>{
  //   route(`/surgery/${index}`)
  // }
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
                  Patient_Complaint:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {/* {patient.patient_complaint} */}
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
