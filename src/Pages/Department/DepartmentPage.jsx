import React from "react";
import Department from "../../component/Department/Department";
import { Box } from "@mui/material";
import DepartmentList from "../../Component/Department/DepartmentList";
import SideBar from "../../Component/SideBar/SideBar";

export default function DepartmentPage() {
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
        <Department />
        <DepartmentList />
      </Box>
    </Box>
  );
}
