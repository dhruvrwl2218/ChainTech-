import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../GlobalContext/AuthContext";

const Home = () => {
  const { state } = useAuth();
  const isLoggedIn = !!state.user;
  // console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <div className="mt-16 flex flex-wrap justify-center">
          <div className="text-4xl font-semi-bold text-indigo-500 w-full ">
            Go to user Account Page
          </div>
          <p className="p-2 m-1 text-3xl font-extrabold rounded-lg shadow-indigo-800 shadow-md text-center w-32 text-nowrap text-white">
            <Link to="/User">User</Link>
          </p>
        </div>
      ) : (
        <div className="mt-16 flex flex-wrap justify-center">
          <div className="text-4xl font-semi-bold text-indigo-500 w-full">
            Plz Log In to acess the User Details
          </div>
          <p className="p-2 m-3 text-3xl font-extrabold rounded-lg shadow-indigo-800 shadow-md text-center w-32 text-white text-nowrap">
            <Link to="/LogIn">Log In</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
