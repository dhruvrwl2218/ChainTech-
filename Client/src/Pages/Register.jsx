//*** to use form we just need to pass the sumbit function which has diff logic for all the
// 3 components and in case of edit we are passing data to be filled in the form to edit it 

import React from "react";
import Form from "../Components/Form";
import axiosInstance from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const userRegister = async (formData) => {
    // console.log(formData);
    try {
      const response = await axiosInstance.post("/user/register", formData);
      // console.log("User registered successfully:", response.data);
      navigate("/Login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      // setErrors(
      // //   error.response ? error.response.data.errors : { general: error.message }
      // // );
    }
  };

  return <Form onSubmit={userRegister} />;
};

export default Register;
