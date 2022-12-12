import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import ListHotProduct from "../homePage/listhot/ListProductHot";
function Cart({ cart, setCart, handleChange, xoa, handleClick }) {
  console.log(cart);
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
  }, [cart]);
  return ( 
    <article className="border p-4">
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
          <div className="ms-3">
           
             <button onClick={() => handleChange(item, -1)}>-</button>
            <button>{item.amount}</button>
             {//Số lượng đặt hàng không vượt quá sl có trong kho
            item.Soluong !== item.amount ? (
              <button onClick={() => handleChange(item, 1)}>+</button>
            ) : (
              <button disabled={true}>+</button>
            )}
          </div>
          <div className="d-flex flex-row-reverse mb-2">
            { item.KM_Ma != null ? (
              
             <span>
              <div>
              <s className="small text-danger mb-0 ms-2">{item.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</s>
              </div>
              <div>
                {(item.SP_Gia -
                  (item.SP_Gia * item["Khuyenmai_SP.PhanTramKM"]) /
                    100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{" "}
                 đ

              </div>
              
           </span>
             
            ) : (
            
              <span>{item.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>

             
            )}

           
          </div>
          <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Xóa</button>
        </div>
      ))}
     {price !== 0 ? (
        <div className=" bg-success bg-opacity-100">
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
   
  )
}

export default Cart;
