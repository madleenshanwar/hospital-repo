import React from "react";
import SideBar from "../../../Component/SideBar/SideBar";
import ReadMoreRayCard from "../../../Component/ProvideService/Rays/ReadMoreRayCard";
import { Box } from "@mui/material";

export default function ReadMoreRay() {
  return (
    <Box>
      <img
        src="/assest/images/result.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <ReadMoreRayCard />
    </Box>
  );
}
