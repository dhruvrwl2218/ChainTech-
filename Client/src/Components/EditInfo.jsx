//*** to use form we just need to pass the sumbit function which has diff logic for all the
// 3 components and in case of edit we are passing data to be filled in the form to edit it 

import React from "react";
import { Form } from "./index";
import { useAuth } from "../GlobalContext/AuthContext";
import axiousInstance from "../utils/AxiosInstance";

const EditInfo = () => {
  const { state, login } = useAuth();

  const user = state.user;

  const editUser = async (formData) => {
    // console.log(formData)
    try {
      const response = await axiousInstance.put(
        `/user/edit/${user._id}`,
        formData
      );
      // console.log('User Info updated sucessfully', response.data);
      login(response.data);
      window.location.reload();
    } catch (error) {
      // console.log("Error while updating the User Info");
    }
  };

  const editdata = {
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
  };

  return <Form onSubmit={editUser} editdata={editdata} />;
};

export default EditInfo;
