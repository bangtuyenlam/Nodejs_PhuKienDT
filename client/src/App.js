import React, { useEffect, useState } from "react";
import {
  getToken,
  getUser,
  setUserSession,
  removeUserSession,
} from "./Utils/Common";
import Login from "./component/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./component/register/Register";
import Admin from "./component/Admin";
import { PrivateRoute } from "./Utils/PrivateRoute";
import AdminRoute from "./Utils/AdminRoute";
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

  // console.log(getToken());
  // console.log(authLoading);

  // if (authLoading && getToken()) {
  //   return (
  //     <div className="App">
  //       <h2>Checking Authenication....</h2>
  //     </div>
  //   );
  // } else
  return (
    <div className="App">
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute/>}>\
          <Route path="/admin/*" element={<Admin />} />
          </Route>
        </Route>
        <Route path="/*" element={<HomeRouter />} />
      </Routes>
    </div>
  );
}

export default App;
