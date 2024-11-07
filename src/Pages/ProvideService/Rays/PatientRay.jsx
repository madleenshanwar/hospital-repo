import { Box } from "@mui/material";
import React from "react";
import RayService from "../../../Component/ProvideService/Rays/RayService";
import ProvideRayList from "../../../Component/ProvideService/Rays/ProvideRayList";

export default function PatientRay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <RayService />
      <ProvideRayList />
    </Box>
  );
}
