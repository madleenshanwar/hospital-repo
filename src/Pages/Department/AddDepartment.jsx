import React from "react";
import AddDepartmentCard from "../../component/Department/AddDepartmentCard";
import { Box } from "@mui/material";
import SideBar from "../../Component/SideBar/SideBar";

export default function AddDepartment() {
  return (
    <Box>
      <img
        src="/assest/images/department.svg"
        style={{ position: "absolute", zIndex: "-1", top: 0,bottom:0, height: "100%" }}
      />
      <SideBar />
      <AddDepartmentCard />
    </Box>
  );
}
