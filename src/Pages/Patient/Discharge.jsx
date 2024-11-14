import { Box } from "@mui/material";
import React from "react";
import DischargeCard from "../../component/Patient/DischargeCard";

export default function Discharge() {
  return (
    <Box>
      <img
        src="/assest/images/discharge.svg"
        style={{ position: "absolute", zIndex: "-1", top: 0,bottom:0, height: "100%" }}
      />
      <DischargeCard />
    </Box>
  );
}
