import React from "react";
import Topbar from "./adminpage/topbar/Topbar";
import Sidebar from "./adminpage/sidebar/Sidebar";
import HomeAdmin from "./adminpage/homeadmin/HomeAdmin";
import { Route, Routes } from "react-router-dom";
import Customer from "./customer/Customer";
import EmployeeManager from "./adminpage/employeeManager/EmployeeManager";
import Employee from "./adminpage/employee/Employee";
import CustomerManager from "./adminpage/customerManager/CustomerManager";
import "./admin.css";
import NewCustomer from "./adminpage/newCustomer/NewCustomer";
import NewEmployee from "./adminpage/newEmployee/NewEmployee";
import ProductManager from "./adminpage/productManager/ProductManager";
import NewProduct from "./adminpage/newProduct/NewProduct";
import Product from "./adminpage/product/Product";
import PostManager from "./adminpage/postManager/PostManager";
import NewPost from "./adminpage/newPost/NewPost";
import Post from "./adminpage/post/Post";
import OrderDetail from "./adminpage/orderDetail/OrderDetail";
import DiscountProducts from "./adminpage/discount/DiscountProducts";
import NewDiscount from "./adminpage/newDiscount/NewDiscount";
import ProductImg from "./adminpage/productImg/ProductImg";
import ImportProduct from "./adminpage/importProduct/ImportProduct";
import NewImport from "./adminpage/newImport/NewImport";
import InvoiceManager from "./adminpage/invoiceManager/InvoiceManager";
import Import from "./adminpage/import/Import";
function Admin() {
  return (
    <div>
      <Topbar />
      <div className="topbarcontainer">
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="orderDetail/:id" element={<OrderDetail/>}/>
          <Route path="productManager" element= {<ProductManager/>}/>
          <Route path="newProduct" element= {<NewProduct/>}/>
          <Route path="product/:id" element= {<Product/>}/>
          <Route path="product/addimg/:id" element={<ProductImg/>}/>

          <Route path="importProduct" element={<ImportProduct/>}/>
          <Route path="newImport" element={<NewImport/>}/>
          <Route path="import/:id" element={<Import/>}/>

          <Route path="employeeManager" element={<EmployeeManager/>}/>
          <Route path="employee/:id" element={<Employee/>} />
          <Route path="newEmployee" element={<NewEmployee/>} />

          <Route path="customerManager" element={<CustomerManager />} />
          <Route path="customer/:id" element={<Customer/>} />
          <Route path="newcustomer" element={<NewCustomer/>} />

          <Route path="postManager" element={<PostManager/>}/>
          <Route path="newpost" element={<NewPost/>}/>
          <Route path="post/:id" element={<Post/>}/>

          <Route path="discountProducts" element={<DiscountProducts/>}/>
          <Route path="newdiscount" element={<NewDiscount/>}/>

          <Route path="invoiceManager" element={<InvoiceManager/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
