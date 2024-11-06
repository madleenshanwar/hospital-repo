import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import SurgeryList from "../../Component/surgery/SurgeryList";
import Surgery from "../../Component/surgery/Surgery";

export default function SurgeryPage() {
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
        <Surgery />
        <SurgeryList />
      </Box>
    </Box>
  );
}
