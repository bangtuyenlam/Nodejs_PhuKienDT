import React from "react";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import HomeAdmin from "./adminpage/home/HomeAdmin";
import { Route, Routes } from "react-router-dom";
import Customer from "./customer/Customer";
import CustomerManager from "./customerManager/CustomerManager";
import "./admin.css";
import NewCustomer from "./newCustomer/NewCustomer";
function Admin() {
  return (
    <div>
      <Topbar />
      <div className="topbarcontainer">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="customerManager" element={<CustomerManager />} />
          <Route path="customer/:id" element={<Customer/>} />
          <Route path="newcustomer" element={<NewCustomer/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
