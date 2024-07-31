// for alerts after the async operations we can use the tostify or sweetalert
// server-side code is written just for the flow of this mini application & built fast and very minimalistic way
// in this application context has been used for global user data that is used accross the components---we can also use the RTK(redux tool kit) if our requirement are complex ..
// local-Storage has been used to maintain the state in case if close the application then after re-opening the page have the state
// it doesn't include the exact auth functionality 

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, User, Home } from "./Pages/index";
import { AuthProvider } from "./GlobalContext/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className=" mx-80 max-sm:mx-4 flex flex-wrap justify-center">
          <h1 className="text-4xl font-bold my-5 text-center text-indigo-600 bg-neutral-800 w-full p-2">
            ChainTech UserAccount Management
          </h1>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/User" element={<User />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

