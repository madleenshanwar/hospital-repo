import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import AddDoctorCard from "../../component/Doctors/AddDoctorCard";

export default function AddDoctor() {
  return (
    <Box>
      <img
        src="/assest/images/doctor.svg"
        style={{
          position: "absolute",
          zIndex: "-1",
          height: "90%",
          top: "10%",
        }}
      />
      <SideBar />
      <AddDoctorCard />
    </Box>
  );
}
