import Home from "./Home";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./homePage/productdetail.jsx/ProductDetail";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "./cart/Cart";
import Checkout from "./homePage/checkout/Checkout";
import Listpost from "./homePage/listpost/Listpost";
import PostId from "./homePage/postid/PostId";
import Post from "./post/Post";
import PersonalPage from "./homePage/personalPage/PersonalPage";
import { PrivateRoute } from "../Utils/PrivateRoute";

export default function HomeRouter() {
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    //  arr[ind].amount = 1;
    arr[ind].amount += d;
    console.log(arr[ind], d);

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <div>
      <Navbar size={cart.length} />
      <Routes>
        <Route path="/" element={<Home handleClick={handleClick} />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/personal/*" element={<PersonalPage />} />
        </Route>
        <Route
          path="/product/:id"
          element={<ProductDetail handleClick={handleClick} />}
        />
        <Route
          path="/showcart"
          element={
            <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
        <Route path="/post" element={<Listpost />} />
        <Route path="/post/:id" element={<PostId />} />
      </Routes>
      <Footer />
    </div>
  );
}
