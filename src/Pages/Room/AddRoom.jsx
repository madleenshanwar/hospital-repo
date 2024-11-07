import { Box } from "@mui/material";
import React from "react";
import SideBar from "../../component/SideBar/SideBar";
import AddRoomCard from "../../component/Room/AddRoomCard";

export default function AddRoom() {
  return (
    <Box>
      <img
        src="/assest/images/room.svg"
        style={{
          position: "absolute",
          zIndex: "-1",
          height: "89%",
          top: "70px",
        }}
      />
      <SideBar />
      <AddRoomCard />
    </Box>
  );
}
