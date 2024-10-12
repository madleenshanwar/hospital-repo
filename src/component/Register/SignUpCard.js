import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, 'Name must have at least 3 letters')
    .max(25,"Name must have at most 30 letters"),
    email: Yup.string()
    .email("email is invalid")
    .required("cemail is required"),
    password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
    phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'phone must be 10 numbers')
    .required('phone is required'),
  })
export default function SignUpCard() {
  const [signUp, setSignUp] = useState(
    { 
      name:"",
      email: "",
      password: "",
      phone:'',
      address:'' 
    });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const route = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { ...signUp};
    try {
      await validationSchema.validate(values, { abortEarly: false });
      console.log("Form Submitted:", values);
      setErrors({});
      setIsSubmitted(true);
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
    if (isSubmitted) {
      route("/");
    }
  }, [isSubmitted, route]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: "60px auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.8)",
        border: "1px solid #00ACB1",
        height: "400px",
        maxWidth: "500px",
      }}
    >
      </Box>
  )
}
