import { Box } from "@mui/material";
import React from "react";
import UpdateDoctorCard from "../../component/Doctors/UpdateDoctorCard";

export default function UpdateDoctor() {
  return (
    <Box>
      <img
        src="/assest/images/doctor.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%",  top: 0,bottom:0}}
      />
      <UpdateDoctorCard />
    </Box>
  );
}
