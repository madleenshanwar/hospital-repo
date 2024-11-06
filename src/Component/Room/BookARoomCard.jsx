import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowDepartments } from "../../api/Department/Show";
import { AvailableRoom } from "../../Api/Room/AvailableRoom";
import { BookARoomApi } from "../../Api/Room/BookARoomApi";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  department_id: Yup.string().required("department is required"),
  Room_id: Yup.string().required("room is required"),
});
export default function BookARoomCard() {
  const { index } = useParams();
  const [info, setInfo] = useState({
    patient_id: parseInt(index),
    Room_id: "",
    department_id: "",
  });
  const route = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  }, []);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchAvailableRoom = async () => {
      try {
        const result = await AvailableRoom(info.department_id);
        setRooms(result.data.data.rooms);
        console.log(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAvailableRoom();
  }, [info.department_id]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInfo((prevD) => ({
      ...prevD,
      [name]: value,
    }));
    console.log(info);
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...info };
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("book a room Info:", values);
      setErrors({});
      const result = await BookARoomApi(info, info.patient_id, info.Room_id);
      if (result) {
        setIsSubmitted(true);
        console.log("Book A Room successfully!");
      } else {
        console.log("Failed to book a room.");
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
      route("/patient");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      className="add-item"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "70px auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.7)",
        border: "1px solid #00ACB1",
        height: "fit-content",
        maxWidth: "500px",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#00ACB1", textDecoration: "underline" }}
      >
        Book A Room
      </Typography>
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="please select your Department"
        value={info.department_id}
        name="department_id"
        onChange={handleChange}
        error={Boolean(errors.department_id)}
        helperText={errors.department_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Department</em>
        </MenuItem>
        {departments.length > 0
          ? departments.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))
          : ""}
      </TextField>
      <TextField
        fullWidth
        disabled={!info.department_id}
        id="outlined-select-currency"
        select
        label="please select your Room"
        value={info.Room_id}
        name="Room_id"
        onChange={handleChange}
        error={Boolean(errors.Room_id)}
        helperText={errors.Room_id}
      >
        <MenuItem disabled value="">
          <em>Please Select Room</em>
        </MenuItem>
        {rooms.length > 0
          ? rooms.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.number}
              </MenuItem>
            ))
          : ""}
      </TextField>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "#00ACB1",
            p: 1,
            fontWeight: "bold",
            width: "150px",
          }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "#00ACB1", p: 1, fontWeight: "bold", width: "150px" }}
          onClick={() => {
            route("/patient");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
