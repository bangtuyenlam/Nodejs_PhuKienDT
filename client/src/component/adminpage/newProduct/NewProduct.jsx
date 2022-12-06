import React, { useEffect, useState } from "react";
import "./newProduct.css";
import axios from "axios";
import { useNavigate } from "react-router";
import defaultImg from "../../image/default.png";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [category, setCategory] = useState(1);
  const [phone, setPhone] = useState(1);
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState();
  const [amount, setAmount] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState();
  const [previewImg, setPreviewImg] = useState();
  const navigate = useNavigate();

  const handleCreate = () => {
    const formdata = new FormData();
    formdata.append("avatar", avatar);
    formdata.append("loaisp", category);
    formdata.append("tendt", phone);
    formdata.append("tensp", productName);
    formdata.append("gia", price);
    formdata.append("mota", describe);
    formdata.append("soluong", amount);
    formdata.append("mausac", color);
    axios
      .post("/sanpham/them", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/productManager");
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        } else console.log("Thêm sản phẩm không thành công");
      });
  };
  console.log(avatar);

  useEffect(() => {
    axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/dienthoai")
      .then((res) => {
        setPhoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!avatar) {
      setPreviewImg(defaultImg);
      return;
    }

    const objectUrl = window.URL.createObjectURL(avatar);
    setPreviewImg(objectUrl);

    return () => window.URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const selectChange = (value) => {
    setCategory(value.target.value);
  };
  const selectPhoneChange = (value) => {
    setPhone(value.target.value);
  };

  const uploadImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar("");
      return;
    }
    setAvatar(e.target.files[0]);
  };

  return (
   
    <div className="newProduct">
      <div className="border border-3 rounded p-lg-3 shadow-lg bg-light bg-opacity-100 ">
      <h4 className="newProductTitle">Thêm sản phẩm</h4>
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
          <label>Loại sản phẩm</label>
          <select
            className="form-control"
            id="district"
            onChange={selectChange}
          >
            <option disabled default>
              Chọn loại sản phẩm
            </option>

            {categoryList.map((loaisp) => {
              return (
                <option value={loaisp.id} key={loaisp.id}>
                  {loaisp.LSP_Ten}
                </option>
              );
            })}
          </select>
        </div>
        <div className="newProductItem">
          <label>Giá tiền</label>
          <input
            type="text"
            value={price}
            onChange={(value) => setPrice(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label>Điện thoại</label>
          <select
            className="form-control"
            id="district"
            onChange={selectPhoneChange}
          >
            <option disabled default>
              Chọn điện thoại
            </option>

            {phoneList &&
              phoneList.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.DT_Ten}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="newProductItem">
          <label> Màu sắc</label>
          <input
            type="text"
            value={color}
            onChange={(value) => setColor(value.target.value)}
          ></input>
        </div>

        <div className="newProductItem">
          <label> Số lượng</label>
          <input
            type="number"
            value={amount}
            onChange={(value) => setAmount(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label>Ảnh đại diện</label>
          <input type="file" id="file" onChange={uploadImage}></input>
          <div className="col-md-5 me-4 mt-2">
            <img src={previewImg} alt="" id="img" className="img-fluid" />
          </div>
         
        </div>
        <div className="newProductItem">
          <label> Mô tả</label>
          
          {/* <label> Nội dung</label>
          <textarea
            type="text"
            value={noidung}
            onChange={(value) => setNoidung(value.target.value)}
            rows="12"
          ></textarea> */}
          <ReactQuill value={describe} onChange={setDescribe} style={{height: "200px", marginBottom: "17px"}}/>
       
          
        </div>
        <button
            className="newProductButton"
            type="button"
            onClick={handleCreate}
          >
            Lưu
          </button>
      </form>
    </div>
    </div>
    
  );
}
