import { Box } from "@mui/material";
import React from "react";
import SignUpCard from "../../component/Register/SignUpCard";
export default function SignUp() {
  return (
    <Box>
      <img
        src="/assest/images/signup.svg"
        style={{ position: "absolute", zIndex: "-1", top: 0,bottom:0, height: "100%", top: 0 }}
      />
      <SignUpCard />
    </Box>
  );
}
