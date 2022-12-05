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
import PersonalPage from "./homePage/personalPage/PersonalPage";
import { PrivateRoute } from "../Utils/PrivateRoute";
import FilterProduct from "./homePage/filterproduct/FilterProduct";

export default function HomeRoute() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  useEffect(() => {
    let result = [];
    cart !== []  && cart.filter((item, index) => {
      //Loại bỏ sản phẩm trùng nhau
      if (cart.findIndex((i) => i.id === item.id) === index)
      {
        result.push(item);
      }
      else{
        console.log(item.id, item.amount);
        result.map((product) => {
          if(product.id === item.id && product.Soluong > product.amount)
              product.amount = product.amount + item.amount;
        })
        cart.splice(index, 1);
      }
    });
  console.log(cart);
    setProduct(result);
  }, [cart])

  const xoa = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    console.log(arr);
    setCart(arr);
  }

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
      <Navbar size={product.length} />
      <Routes>
        <Route path="/" element={<Home handleClick={handleClick} />} />
        <Route path="/filter-:id" element={<FilterProduct handleClick={handleClick}/>}/>
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
            <Cart cart={product} setCart={setProduct} handleChange={handleChange} xoa={xoa} />
          }
        />
        <Route element={<PrivateRoute/>}>
        <Route path="/checkout" element={<Checkout cart={product} />} />
        </Route>
        <Route path="/post" element={<Listpost />} />
        <Route path="/post/:id" element={<PostId />} />
      </Routes>
      <Footer />
    </div>
  );
}
