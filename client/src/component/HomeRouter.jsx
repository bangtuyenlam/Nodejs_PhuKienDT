import Home from "./Home";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProductDetail from './homePage/productdetail.jsx/ProductDetail';
import Navbar from './Navbar';

export default function HomeRouter() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element= {<ProductDetail/>}/>

        </Routes>
    </div>
  )
}
