import { Box } from "@mui/material";
import React from "react";
import UpdatePatientRayCard from "../../../Component/ProvideService/Rays/UpdatePatientRayCard";

export default function UpdatePatientRay() {
  return (
    <Box>
      <img
        src="/assest/images/rays.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%", top: "0" }}
      />
      <UpdatePatientRayCard />
    </Box>
  );
}
