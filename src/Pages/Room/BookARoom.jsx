import { Box } from "@mui/material";
import React from "react";
import BookARoomCard from "../../Component/Room/BookARoomCard";

export default function BookARoom() {
  return (
    <Box>
      <img
        src="/assest/images/book_room.svg"
        style={{
          position: "absolute",
          zIndex: "-1",
          height: "89%",
          top: "70px",
        }}
      />
      <BookARoomCard />
    </Box>
  );
}
