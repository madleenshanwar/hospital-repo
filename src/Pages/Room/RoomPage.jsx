import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import Room from "../../component/Room/Room";
import RoomList from "../../component/Room/RoomList";

export default function RoomPage() {
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
        <Room />
        <RoomList />
      </Box>
    </Box>
  );
}
