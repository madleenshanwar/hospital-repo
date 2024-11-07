import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import AddPatientCard from "../../component/Patient/AddPatientCard";

export default function AddPatient() {
  return (
    <Box>
      <img
        src="/assest/images/patient.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <AddPatientCard />
    </Box>
  );
}
