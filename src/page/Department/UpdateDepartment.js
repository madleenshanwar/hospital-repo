import React from "react";
import UpdateDepartmentCard from "../../component/Department/UpdateDepartmentCard";
import { Box } from "@mui/material";

export default function UpdateDepartment() {
  return (
    <Box>
      <img
        src="/assest/images/department.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%", top: 0 }}
      />
      <UpdateDepartmentCard />
    </Box>
  );
}
