import { Box } from "@mui/material";
import React from "react";
import AddSchedulesCard from "../../Component/Schedules/AddSchedulesCard";
import SideBar from "../../component/SideBar/SideBar";

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
