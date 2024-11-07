import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../../Component/SideBar/SideBar";
import ProvideRayCard from "../../../Component/ProvideService/Rays/ProvideRayCard";

export default function ProvideRay() {
  return (
    <Box>
      <img
        src="/assest/images/rays.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <ProvideRayCard />
    </Box>
  );
}
