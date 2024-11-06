import { Box, Button, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar/SideBar";
import PatientTest from "./Test/PatientTest";
import PatientRay from "./Rays/PatientRay";

export default function ProvideService() {
  const [service, setService] = useState("");
  useEffect(() => {
    setService(localStorage.getItem("serviceprovider"));
  }, [service]);
  return (
    <Box>
      <SideBar />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          marginTop: "80px",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-select-currency"
          select
          label="please select your service"
          onChange={(e) => {
            setService(e.target.value);
            localStorage.setItem("serviceprovider", e.target.value);
          }}
          value={service}
          name="service"
          sx={{ width: "250px" }}
        >
          <MenuItem value="rays">Rays Service</MenuItem>
          <MenuItem value="test">Test Service</MenuItem>
        </TextField>
        <Box>
          {service === "test" ? <PatientTest /> : ""}
          {service === "rays" ? <PatientRay /> : ""}
        </Box>
      </Box>
    </Box>
  );
}
