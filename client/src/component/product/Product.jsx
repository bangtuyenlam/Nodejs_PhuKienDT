import React, { useEffect, useState } from "react";
import "./product.css";
import { useParams } from "react-router-dom";
import {
  CategoryOutlined,
  Smartphone,
  AttachMoney,
  ColorLens,
  Description,
  StorageOutlined,
  
} from "@material-ui/icons";

import axios from "axios";

export default function Product() {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [category, setCategory] = useState(1);
  const [phone, setPhone] = useState(1);
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState({ file: [] });
  const [amount, setAmount] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data);
        setProductName(res.data.SP_Ten);
        setCategory(res.data.LSP_Ma);
        setPhone(res.data.DT_Ma);
        setPrice(res.data.SP_Gia);
        setDescribe(res.data.SP_Mota);
        setAmount(res.data.Soluong);
        setColor(res.data.Mausac);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);

  const handleUpdate = async (event) => {
    const formdata = new FormData();
    formdata.append("id", productId.id);
    formdata.append("avatar", avatar.file);
    formdata.append("loaisp", category);
    formdata.append("tendt", phone);
    formdata.append("tensp", productName);
    formdata.append("gia", price);
    formdata.append("mota", describe);
    formdata.append("soluong", amount);
    formdata.append("mausac", color);
    axios
      .put("/sanpham/capnhat", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 500)
          console.log("Cập nhật không thành công");
      });
  //    event.preventDefault();
  };
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

  const selectCategoryChange = (value) => {
    setCategory(value.target.value);
  };

  const selectPhoneChange = (value) => {
    setPhone(value.target.value);
  };

  const uploadImage = (e) => {
    setAvatar({
      ...avatar,
      file: e.target.files[0],
    });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Thông tin sản phẩm</h1>
      </div>
      {product && (
        <div className="productContainer">
          <div className="productShow">
            <div className="productShowTop">
              <img
                src={`http://localhost:5000/image/${product.Anhdaidien}`}
                alt="Anh dai dien"
                className="productShowImg"
              />

              <div className="productShowTopTitle">
                <span className="productShowName">{product.SP_Ten}</span>
              </div>
            </div>
            <div className="productShowBottom">
              <span className="productShowTitle">Thông tin chi tiết</span>
              <div className="productShowInfo">
                <CategoryOutlined className="productShowIcon"/>
                <span className="productInfoTitle">
                  {product["Loaisanpham.LSP_Ten"]}
                </span>
              </div>
              <div className="productShowInfo">
                <Smartphone className="productShowIcon" />

                <span className="productInfoTitle">
                  {product["Dienthoai.DT_Ten"]}
                </span>
              </div>
              <div className="productShowInfo">
                <AttachMoney className="productShowIcon" />
                <span className="productInfoTitle">{product.SP_Gia}</span>
              </div>
              <div className="productShowInfo">
                <StorageOutlined className="productShowIcon" />
                <span className="productInfoTitle">{product.Soluong}</span>
              </div>
              <div className="productShowInfo">
                <ColorLens className="productShowIcon" />
                <span className="productInfoTitle">{product.Mausac}</span>
              </div>
              <div className="productShowInfo">
                <Description className="productShowIcon" />
                <span className="productInfoTitle" style={{whiteSpace: 'pre-line'}}>{product.SP_Mota}</span>
              </div>
            </div>
          </div>
          <div className="productEdit">
            <span className="productUpdateTitle">Chỉnh sửa</span>
            <form action="" className="productUpdateForms">
              <div className="productUpdateLeft">
                <div className="productUpdateItem">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    placeholder={product.SP_Ten}
                    value={productName}
                    className="productUpdateInput"
                    onChange={(value) => {
                      setProductName(value.target.value);
                    }}
                  />
                </div>
                <div className="productUpdateItem">
                  <label>Giá tiền</label>
                  <input
                    type="text"
                    value={price}
                    className="productUpdateInput"
                    onChange={(value) => setPrice(value.target.value)}
                  ></input>
                </div>
                <div className="productUpdateItem">
                  <label>Loại sản phẩm</label>
                  <select
                  
                    className="form-control"
                    id="district"
                    onChange={selectCategoryChange}
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
                <div className="productUpdateItem">
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
                <div className="productUpdateItem">
                  <label> Số lượng</label>
                  <input
                   className="productUpdateInput"
                    type="number"
                    value={amount}
                    onChange={(value) => setAmount(value.target.value)}
                  ></input>
                </div>
                <div className="productUpdateItem">
                  <label> Màu sắc</label>
                  <input
                   className="productUpdateInput"
                    type="text"
                    value={color}
                    onChange={(value) => setColor(value.target.value)}
                  ></input>
                </div>
                <div className="productUpdateItem">
                  <label> Mô tả</label>
                  <textarea
                 
                    type="text"
                    value={describe}
                    onChange={(value) => setDescribe(value.target.value)}
                    rows="5"
                  ></textarea>
                </div>
                <div className="productUpdateItem">
                  <label> Chọn ảnh mới</label>
                  <input type="file" id="file" onChange={uploadImage} />
                </div>
              </div>
              <div className="productUpdateRight">
                <div className="productUpdateUpload">
                  {/* <img
                    className="productUpdateImg"
                    src={`http://localhost:5000/image/${avatar.file}`}
                    alt=""
                  /> */}
                  {/* <input type="file" id="file" onChange={uploadImage}  className="productUpdateIcon"/>
                  <label htmlFor="file" className="productUpdateIcon">
                    <Publish/>
                  </label> */} 
                </div>
                <button className="productUpdateButton" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
