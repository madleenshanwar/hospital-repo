import { Box } from "@mui/joy";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import ReadMoreCard from "../../component/Patient/ReadMoreCard";

export default function ReadMore() {
  return (
    <Box>
      <img
        src="/assest/images/read-more.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <ReadMoreCard />
    </Box>
  );
}
