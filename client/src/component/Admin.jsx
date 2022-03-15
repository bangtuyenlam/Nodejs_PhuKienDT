import React from "react";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import HomeAdmin from "./adminpage/home/HomeAdmin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerManager from "./customerManager/CustomerManager";
import "./admin.css";
function Admin() {
  return (
    <div>
      <Topbar />
      <div className="topbarcontainer">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="customerManager" element={<CustomerManager />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
