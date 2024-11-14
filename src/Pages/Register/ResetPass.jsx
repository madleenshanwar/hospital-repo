import { Box } from "@mui/material";
import React from "react";
import ResetPassCard from "../../Component/Register/ResetPassCard";

export default function ResetPass() {
  return (
    <Box>
      <img
        src="/assest/images/reset_password.svg"
        style={{ position: "absolute", zIndex: "-1",  top: 0,bottom:0,height: "100%" }}
      />
      <ResetPassCard />
    </Box>
  );
}
