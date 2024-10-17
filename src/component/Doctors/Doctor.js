import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
export default function Doctor() {
  const route = useNavigate();
  return (
    <Box sx={{ marginTop: "80px" }}>
      <Button
        variant="contained"
        sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
        onClick={() => route("/adddoctor")}
      >
        Add New Doctor{" "}
        <AddIcon
          sx={{
            border: "1px solid white",
            fontWeight: "bold",
            borderRadius: "50%",
            ml: 1,
          }}
        />
      </Button>
    </Box>
  );
}
