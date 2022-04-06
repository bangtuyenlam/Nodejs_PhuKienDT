import React, {useState} from 'react';
import './newProduct.css';
import axios from "axios";
import { useNavigate } from 'react-router';

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState("");
  const [amount, setAmount] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  
  const handleCreate =  () => {
    axios
      .post("/khachhang/them", {
        loaisp: category,
        tendt: phone,
        tensp: productName,
        gia: price,
        mota: describe,
        anh: avatar,
        soluong: amount,
        mausac: color,
      })
      .then((res) => {
       console.log(res.data);
       navigate("/admin/productManager");
      })
      .catch((error) => {
        if (error.response.status === 402){
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        }
        else
          console.log("Thêm sản phẩm không thành công");
      });
    
  }
  const selectChange = (value) => {
    setCategory(value.target.value);
}
  const selectPhoneChange = (value) => {
    setPhone(value.target.value);
  }

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">Thêm sản phẩm</h1>
      <form className="newProductForm">
        <div className="newProductItem">
          <label> Tên sản phẩm</label>
          <input
           type="text"
           value={productName}
           onChange={(value) => setProductName(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
                <label >
                  Loại sản phẩm
               
                </label>
                <select
                  className="form-control"
                  id="district"
                  onChange={selectChange}
                >
                  <option value="Nhân viên" default>
                    Nhân viên
                  </option>
                  <option value="Quản lý">Quản lý</option>
                </select>
         </div>
        <div className="newProductItem">
          <label>Giá tiền</label>
          <input
           type="password"
           value={price}
           onChange={(value) => setPrice(value.target.value)}></input>
        </div>
        <div className="newProductItem">
                <label >
                  Điện thoại
               
                </label>
                <select
                  className="form-control"
                  id="district"
                  onChange={selectPhoneChange}
                >
                  <option value="Nhân viên" default>
                    Nhân viên
                  </option>
                  <option value="Quản lý">Quản lý</option>
                </select>
         </div>
        <div className="newProductItem">
          <label> Mô tả</label>
          <input
           type="text"
           value={describe}
           onChange={(value) => setDescribe(value.target.value)}></input>
        </div>
        <div className="newProductItem">
          <label> Số lượng</label>
          <input
           type="number"
           value={amount}
           onChange={(value) => setAmount(value.target.value)}></input>
        </div>
     
        <div className="newProductItem">
          <label> Màu sắc</label>
          <input
           type="text"
           value={color}
           onChange={(value) => setColor(value.target.value)}></input>
        </div>
        <div className="newProductItem">
          <label>Ảnh đại diện</label>
          <input type="file" id='file'></input>
        </div> 
        
        <button
         className="newProductButton"
         type="button"
         onClick={handleCreate}>Lưu</button>
      </form>
    </div>
  );
}
