import React from "react";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import HomeAdmin from "./adminpage/home/HomeAdmin";
import { Route, Routes } from "react-router-dom";
import Customer from "./customer/Customer";
import EmployeeManager from "./employeeManager/EmployeeManager";
import Employee from "./employee/Employee";
import CustomerManager from "./customerManager/CustomerManager";
import "./admin.css";
import NewCustomer from "./newCustomer/NewCustomer";
import NewEmployee from "./newEmployee/NewEmployee";
import ProductManager from "./productManager/ProductManager";
import NewProduct from "./newProduct/NewProduct";
import Product from "./product/Product";
function Admin() {
  return (
    <div>
      <Topbar />
      <div className="topbarcontainer">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="productManager" element= {<ProductManager/>}/>
          <Route path="newProduct" element= {<NewProduct/>}/>
          <Route path="product/:id" element= {<Product/>}/>

          <Route path="employeeManager" element={<EmployeeManager/>}/>
          <Route path="employee/:id" element={<Employee/>} />
          <Route path="newEmployee" element={<NewEmployee/>} />

          <Route path="customerManager" element={<CustomerManager />} />
          <Route path="customer/:id" element={<Customer/>} />
          <Route path="newcustomer" element={<NewCustomer/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
