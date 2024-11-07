import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../../component/SideBar/SideBar";
import AddRaysCard from "../../../component/Services/Rays/AddRaysCard";

export default function AddRays() {
  return (
    <Box>
      <img
        src="/assest/images/rays.svg"
        style={{
          position: "absolute",
          zIndex: "-1",
          height: "89%",
          top: "70px",
        }}
      />
      <SideBar />
      <AddRaysCard />
    </Box>
  );
}
