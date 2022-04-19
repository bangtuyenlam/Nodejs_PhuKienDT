import React, { useEffect, useState } from "react";
// import {
//   getToken,
//   getUser,
//   setUserSession,
//   removeUserSession,
// } from "./Utils/Common";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";
import Register from "./component/Register";
import Admin from "./component/Admin";

import HomeRouter from "./component/HomeRouter";

function App() {
  // const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   const token = getToken();
  //   const user_str = getUser();
  //   console.log(token);

  //   if (!token) {
  //     return;
  //   }
  //   axios
  //     .get('/verifyToken', {headers: {token: token}})
  //     .then((response) => {
  //       setUserSession(response.data.token, user_str);
  //       setAuthLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       removeUserSession();
  //       setAuthLoading(false);
  //     });
  // }, [])

  // if (authLoading && getToken()) {
  //   return (
  //     <div className="App">
  //       <h2>Checking Authenication....</h2>
  //     </div>
  //   );
  // } else
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<Admin />}></Route>

          <Route path="/*" element={<HomeRouter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
