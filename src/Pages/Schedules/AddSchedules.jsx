import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../Component/SideBar/SideBar";
import AddSchedulesCard from "../../Component/Schedules/AddSchedulesCard";

export default function AddSchedules() {
  return (
    <Box>
      <img
        src="/assest/images/schedule.svg"
        style={{ position: "absolute", zIndex: "-1", height: "100%" }}
      />
      <SideBar />
      <AddSchedulesCard />
    </Box>
  );
}
