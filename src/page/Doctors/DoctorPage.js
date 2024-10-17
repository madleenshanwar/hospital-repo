import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import AddDoctorCard from "../../component/Doctors/AddDoctorCard";
import Doctor from "../../component/Doctors/Doctor";
import DoctorList from "../../component/Doctors/DoctorList";

export default function DoctorPage() {
  return (
    <Box>
      <SideBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Doctor />
        <DoctorList />
      </Box>
    </Box>
  );
}
