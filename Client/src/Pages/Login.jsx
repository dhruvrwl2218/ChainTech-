//*** to use form we just need to pass the sumbit function which has diff logic for all the
// 3 components and in case of edit we are passing data to be filled in the form to edit it 

import React from "react";
import Form from "../Components/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../GlobalContext/AuthContext";
import axiousInstance from "../utils/AxiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const userLogIn = async (formData) => {
    //  console.log(formData);
    try {
      const response = await axiousInstance.post("/user/login", formData);
      // console.log('User logged In successfully:', response.data);
      login(response.data.user);
      navigate("/");
    } catch (error) {
      // console.error('Login Error :', error.response ? error.response.data : error.message);
      setErrors(
        error.response ? error.response.data.errors : { general: error.message }
      );
    }
  };
  return <Form onSubmit={userLogIn} />;
};

export default Login;
