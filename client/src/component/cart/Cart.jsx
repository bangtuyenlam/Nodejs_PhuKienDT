import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart({ cart, setCart, handleChange, xoa }) {
  const [price, setPrice] = useState(0);
  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
    xoa(id);
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) =>
      item["Khuyenmaicts.id"] === null
        ? (ans += item.amount * item.SP_Gia)
        : (ans +=
            item.amount *
            (item.SP_Gia -
              (item.SP_Gia * item["Khuyenmaicts.PhanTramKM"]) / 100))
    );
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });
  return (
    <article>
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
            {item["Khuyenmaicts.id"] === null ? (
              <span>{item.SP_Gia} VNĐ</span>
            ) : (
              <span>
                {item.SP_Gia -
                  (item.SP_Gia * item["Khuyenmaicts.PhanTramKM"]) / 100}{" "}
                VNĐ
              </span>
            )}

            <button onClick={() => handleRemove(item.id)}>Xóa</button>
          </div>
        </div>
      ))}
      {price !== 0 ? (
        <div>
          <div className="total">
            <span>Tổng tiền</span>
            <span>{price} VNĐ</span>
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
  );
}

export default Cart;
