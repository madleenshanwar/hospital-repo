import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FetchPatients } from "../../../Api/Patient/FetchPatients";
import { FetchOnePatientTest } from "../../../Api/ProvideService/Test/FetchOnePatientTest";

export default function ReadMoreTestCard() {
  const { id } = useParams();
  const [patientTest, setPatientTest] = useState({});
  const route = useNavigate();
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    const fetchPatientRay = async () => {
      try {
        const result = await FetchOnePatientTest(id);
        console.log("patienttest", result.data.data);
        setPatientTest(result.data.data);
      } catch (error) {
        console.error("Error fetching patient tests:", error);
      }
    };
    fetchPatientRay();
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
  }, [id]);
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
                  Information about the Test service for patient{" "}
                  {patient.find((el) => el.id === patientTest.patient_id)
                    ?.first_name +
                    " " +
                    patient.find((el) => el.id === patientTest.patient_id)
                      ?.last_name || "...loading"}
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
                  Result:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {" "}
                  {patientTest.result
                    ? patientTest.result
                    : "The result has not been released yet"}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "large",
                    color: "#07E4DB",
                  }}
                >
                  Description:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary" }}
                >
                  {" "}
                  {patientTest.description
                    ? patientTest.description
                    : "The result has not been released yet"}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Button
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
        onClick={() => {
          route("/provideservice");
        }}
      >
        Back
      </Button>
    </Box>
  );
}
