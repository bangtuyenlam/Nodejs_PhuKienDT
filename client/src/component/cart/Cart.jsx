import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import ListHotProduct from "../homePage/listhot/ListProductHot";
function Cart({ cart, setCart, handleChange, xoa, handleClick }) {
  
  const [price, setPrice] = useState(0);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
    xoa(id);
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) =>{
   item.KM_Ma != null
        ?(ans +=
          item.amount *
          (item.SP_Gia -
            (item.SP_Gia * item["Khuyenmai_SP.PhanTramKM"]) / 100))
         
        : (ans += item.amount * item.SP_Gia)
             
            }
    );
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });
  return (
    <div>
    <div className="container my-5 py-2">
    
    <article className="border">
   {price !== 0 ? <h5 className="fw-bolder">Danh sách giỏ hàng</h5> : <></>}
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img
              src={`http://localhost:5000/image/${item.Anhdaidien}`}
              alt=""
            />
            <p>{item.SP_Ten}</p>
          </div>
          <div>
            {//Số lượng đặt hàng không vượt quá sl có trong kho
            item.Soluong !== item.amount ? (
              <button onClick={() => handleChange(item, 1)}>+</button>
            ) : (
              <button disabled={true}>+</button>
            )}
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            { item.KM_Ma != null ? (
             <span>
             {(item.SP_Gia -
               (item.SP_Gia * item["Khuyenmai_SP.PhanTramKM"]) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{" "}
              đ
           </span>
             
            ) : (
              <span>{item.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
            )}

            <button onClick={() => handleRemove(item.id)}>Xóa</button>
          </div>
        </div>
      ))}
     {price !== 0 ? (
        <div>
          <div className="total">
            <span>Tổng tiền</span>
            <span>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
            <Link className="checkout" to={"/checkout"}>
              Đặt hàng
            </Link>
          </div>
        </div>
      ) : (
        <div className="on_product">
          Chưa có sản phẩm được thêm vào giỏ hàng
        </div>
      )}
    </article>
   
    {price!== 0 ? (
      <div className="bg-warning p-2 mb-3 bg-opacity-50">
    <h5 className="fw-bolder">SẢN PHẨM TƯƠNG TỰ</h5>
          <ListHotProduct handleClick={handleClick}/>
          </div>
    ) : <></>}
          </div>
          </div> 
       
  );
}

export default Cart;
