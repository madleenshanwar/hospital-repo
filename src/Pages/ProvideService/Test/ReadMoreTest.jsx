import React from "react";
import SideBar from "../../../Component/SideBar/SideBar";
import { Box } from "@mui/material";
import ReadMoreTestCard from "../../../Component/ProvideService/Test/ReadMoreTestCard";

export default function ReadMoreTest() {
  return (
    <Box>
      <img
        src="/assest/images/result.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <ReadMoreTestCard />
    </Box>
  );
}
