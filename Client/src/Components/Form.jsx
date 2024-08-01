//This form component servers for all the 3 major pages like for Registering , Login the user and for updating the user detials 
//here instead of using the states and all these manual validation we can take the help of lib. like react hook form and formik and for validation zod or yub.
//*** to use form we just need to pass the sumbit function which has diff logic for all the 3 components and in case of edit we are passing data to be filled in the form to edit it 
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Form = ({ onSubmit, editdata }) => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [formType, setFormType] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.pathname === "/Login") {
      setFormType("login");
      setFormData({
        email: "",
        password: "",
      });
    } else if (location.pathname === "/register") {
      setFormType("register");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
      });
    } else if (location.pathname === "/User") {
      setFormType("edit");
      setFormData(editdata);
    }
  }, [location.pathname]);

  
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6 || value.length > 8) {
          error = "Password must be between 6 and 8 characters";
        }
        break;
      case "username":
        if (formType === "register" || formType === "edit") {
          if (!value) {
            error = "Username is required";
          } else if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
            error =
              "Username must not include any special characters except spaces";
          }
        }
        break;
      case "confirmPassword":
        if (formType === "register" && value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      case "phoneNumber":
        if (formType === "register" && !/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
        }
        break;
      case "dateOfBirth":
        if (!value) {
          error = "Date of birth is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          if (selectedDate > today) {
            error = "Date of birth cannot be in the future";
          }
        }
        break;
      case "gender":
        if (formType === "register" && !value) {
          error = "Gender is required";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
//helps in giving the erros in real time 
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validate = () => {
    const validationErrors = {};

    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) {
        validationErrors[name] = error;
      }
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("Form data:))", formData);
      onSubmit(formData);
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="flex flex-wrap w-3/4 shadow-gray-200 shadow-lg lg:px-20">
      <h2 className="text-4xl font-bold w-full text-center  mt-3 text-indigo-600 bg-neutral-800 p-1">
        {formType === "register"
          ? "User Registeration": formType === "edit" ? "Edit User-Info" : "User LogIn"}
      </h2>
      
      {formType === "register" || formType === "edit" ? (  // Seprate forms are there for the login and (register & edit have same)
        <form                                              // renderd conditionally on the basis of url
          action=""
          onSubmit={handleSubmit}
          className="text-white flex flex-wrap w-full justify-center p-8 m-2 rounded-2xl"
        >
          {" "}
          <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
            UserName
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.username && (
              <span className="text-sm text-red-500 m-1">
                {errors.username}
              </span>
            )}
          </label>
          <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.email && (
              <span className="text-sm text-red-500 m-1">{errors.email}</span>
            )}
          </label>
          <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.phoneNumber}
              </span>
            )}
          </label>
          <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.dateOfBirth && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.dateOfBirth}
              </span>
            )}
          </label>
          <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
            Gender:
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.gender}
              </span>
            )}
          </label>
          {formType === "register" && (
            <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-neutral-800 rounded-md p-1 text-gray-400"
              />
              {errors.password && (
                <span className="text-sm text-red-500 m-1">
                  {errors.password}
                </span>
              )}
            </label>
          )}
          {formType === "register" && (
            <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
              Confirm-Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-neutral-800 rounded-md p-1 text-gray-400"
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500 m-1">
                  {errors.confirmPassword}
                </span>
              )}
            </label>
          )}
          <button
            type="submit"
            className="w-1/2 mt-3 bg-indigo-500 rounded-md p-2"
          >
            {formType === "login" ? "Log In" : "Register"}
          </button>
        </form>
      ) : (           
        <form       // here we have form for the Login 
          action=""
          onSubmit={handleSubmit}
          className="text-white flex flex-wrap w-full justify-center p-8 m-2 rounded-2xl"
        >
          <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.email && (
              <span className="text-sm text-red-500 m-1">{errors.email}</span>
            )}
          </label>
          <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-neutral-800 rounded-md p-1 text-gray-400"
            />
            {errors.password && (
              <span className="text-sm text-red-500 m-1">
                {errors.password}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="w-1/2 mt-3 bg-indigo-500 rounded-md p-2"
          >
            {formType === "login" ? "Log In" : "Register"}
          </button>
          <p className="m-5 text-center w-full text-sm text-indigo-300 p-2">
            <Link to="/register">
              <span className="underline">Register</span>
            </Link>{" "}
            First if you haven't
          </p>
        </form>
      )}
    </div>
  );
};

export default Form;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const Form = ({ onSubmit }) => {
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     dateOfBirth: '',
//     gender: ''
//   });

//   const [formType, setFormType] = useState();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (location.pathname === "/Login") {
//       setFormType("login");
//       setFormData({
//         email: "",
//         password: "",
//       });
//     } else if (location.pathname === "/register") {
//       setFormType("register");
//       setFormData({
//         username: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phoneNumber: '',
//         dateOfBirth: '',
//         gender: ''
//       });
//     }
//   }, [location.pathname]);

//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "email":
//         if (!value) {
//           error = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           error = "Email is invalid";
//         }
//         break;
//       case "password":
//         if (!value) {
//           error = "Password is required";
//         } else if (value.length < 6 || value.length > 8) {
//           error = "Password must be between 6 and 8 characters";
//         }
//         break;
//       case "username":
//         if (formType === "register") {
//           if (!value) {
//             error = "Username is required";
//           } else if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
//             error =
//               "Username must not include any special characters except spaces";
//           }
//         }
//         break;
//       case "confirmPassword":
//         if (formType === "register" && value !== formData.password) {
//           error = "Passwords do not match";
//         }
//         break;
//         case 'phoneNumber':
//           if (formType === 'register' && !/^\d{10}$/.test(value)) {
//             error = 'Phone number must be 10 digits';
//           }
//           break;
//         case 'dateOfBirth':
//           if (!value) {
//             error = 'Date of birth is required';
//           } else {
//             const selectedDate = new Date(value);
//             const today = new Date();
//             if (selectedDate > today) {
//               error = 'Date of birth cannot be in the future';
//             }
//           }
//           break;
//         case 'gender':
//           if (formType === 'register' && !value) {
//             error = 'Gender is required';
//           }
//           break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     const error = validateField(name, value);
//     setErrors({
//       ...errors,
//       [name]: error,
//     });
//   };

//   const validate = () => {
//     const validationErrors = {};

//     for (const [name, value] of Object.entries(formData)) {
//       const error = validateField(name, value);
//       if (error) {
//         validationErrors[name] = error;
//       }
//     }
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("Form data:))", formData);
//       onSubmit(formData);
//     } else {
//       console.log("Validation failed");
//     }
//   };

//   return (
//     <div className="flex flex-wrap w-3/4 shadow-gray-200 shadow-lg lg:px-20">
//       <h2 className="text-4xl font-bold w-full text-center  mt-3 text-indigo-600 bg-neutral-800 p-1">
//         {formType === "login" ? "User Login" : "User Registeration"}
//       </h2>
//       <form
//         action=""
//         onSubmit={handleSubmit}
//         className="text-white flex flex-wrap w-full justify-center p-8 m-2 rounded-2xl"
//       >
//         {formType === "register" && (
//           <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
//             UserName
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="bg-neutral-800 rounded-md p-1 text-gray-400"
//             />
//             {errors.username && (
//               <span className="text-sm text-red-500 m-1">
//                 {errors.username}
//               </span>
//             )}
//           </label>
//         )}
//         <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
//           Email
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="bg-neutral-800 rounded-md p-1 text-gray-400"
//           />
//           {errors.email && (
//             <span className="text-sm text-red-500 m-1">{errors.email}</span>
//           )}
//         </label>
//         {formType === "register" && (
//           <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
//             Phone Number:
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber || ""}
//               onChange={handleChange}
//               className="bg-neutral-800 rounded-md p-1 text-gray-400"
//             />
//             {errors.phoneNumber && (
//               <span className="text-red-500 text-sm mt-1 block">
//                 {errors.phoneNumber}
//               </span>
//             )}
//           </label>
//         )}

//         {formType === "register" && (
//           <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
//             Date of Birth:
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth || ""}
//               onChange={handleChange}
//               className="bg-neutral-800 rounded-md p-1 text-gray-400"
//             />
//             {errors.dateOfBirth && (
//               <span className="text-red-500 text-sm mt-1 block">
//                 {errors.dateOfBirth}
//               </span>
//             )}
//           </label>
//         )}
//         {formType === "register" && (
//           <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
//             Gender:
//             <select
//               name="gender"
//               value={formData.gender || ""}
//               onChange={handleChange}
//               className="bg-neutral-800 rounded-md p-1 text-gray-400"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             {errors.gender && (
//               <span className="text-red-500 text-sm mt-1 block">
//                 {errors.gender}
//               </span>
//             )}
//           </label>
//         )}

//         <label className="w-full m-1  flex flex-col p-2 text-xl font-semi-bold">
//           Password
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="bg-neutral-800 rounded-md p-1 text-gray-400"
//           />
//           {errors.password && (
//             <span className="text-sm text-red-500 m-1">{errors.password}</span>
//           )}
//         </label>
//         {formType === "register" && (
//           <label className="w-full m-1 flex flex-col p-2 text-xl font-semi-bold">
//             Confirm-Password
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="bg-neutral-800 rounded-md p-1 text-gray-400"
//             />
//             {errors.confirmPassword && (
//               <span className="text-sm text-red-500 m-1">
//                 {errors.confirmPassword}
//               </span>
//             )}
//           </label>
//         )}
//         <button
//           type="submit"
//           className="w-1/2 mt-3 bg-indigo-500 rounded-md p-2"
//         >
//           {formType === "login" ? "Log In" : "Register"}
//         </button>
//       </form>
//       <p className="mx-5 text-sm text-indigo-300">{formType === 'login'?"": "" }</p>
//     </div>
//   );
// };

// export default Form;
