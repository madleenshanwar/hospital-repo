import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { UpdateRoom } from "../../Api/Room/UpdateRoom";
import { ShowDepartments } from "../../Api/Department/Show";
import { FetchOneRoom } from "../../Api/Room/FetchOneRoom";
const validationSchema = Yup.object().shape({
  number: Yup.string()
    .required("Number is required")
    .matches(/[0-9]/, "must contain numbers"),
  department_id: Yup.string().required("This Feild is required"),
  status: Yup.string().required("You must select an option"),
  bed_numbers: Yup.string().required("You must select an option"),
});
export default function UpdateRoomCard() {
  const { index } = useParams();
  const [room, setRoom] = useState({
    number: "",
    status: "",
    department_id: "",
    bed_numbers: "",
  });
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const result = await ShowDepartments();
        setDepartments(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
    const fetchRoom = async () => {
      try {
        const result = await FetchOneRoom(index);
        setRoom(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [index]);
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setRoom((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(room);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...room };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Room Info:", values);
      setErrors({});
      const result = await UpdateRoom(room, room.id);
      if (result) {
        setIsSubmitted(true);
        console.log("Room update successfully!");
      } else {
        console.log("Failed to update room.");
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };
  useEffect(() => {
    if (isSubmitted === true) {
      route("/room");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="update-item"
      sx={{
        margin: "50px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #00ACB1",
        height: "500px",
        maxWidth: "550px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        UPdate Room
      </Typography>

      <TextField
        placeholder="Room Number"
        name="number"
        fullWidth
        variant="outlined"
        value={room.number}
        onChange={handleChange}
        error={Boolean(errors.number)}
        helperText={errors.number}
      />
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Head Of Department"
        onChange={handleChange}
        value={room.status}
        name="status"
        error={Boolean(errors.status)}
        helperText={errors.status}
      >
        <MenuItem value="occupied">Occupied</MenuItem>
        <MenuItem value="vacant">Vacant</MenuItem>
        <MenuItem value="under maintenance">Under Maintenance</MenuItem>
        <MenuItem value="partially vacant">Partially Vacant</MenuItem>
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Department"
        value={room.department_id || ""}
        onChange={handleChange}
        error={Boolean(errors.department_id)}
        name="department_id"
        helperText={errors.department_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Department</em>
        </MenuItem>
        {departments.length > 0 ? (
          departments.map((option, index) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No department available</MenuItem>
        )}
      </TextField>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Bed Numbers "
        onChange={handleChange}
        value={room.bed_numbers}
        name="bed_numbers"
        error={Boolean(errors.bed_numbers)}
        helperText={errors.bed_numbers}
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
      </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{ background: "#00ACB1", p: 1, fontWeight: "bold" }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#00ACB1", p: 1, fontWeight: "bold" }}
          onClick={() => {
            route("/room");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
