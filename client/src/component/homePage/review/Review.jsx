import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import "./review.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CategoryOutlined,
  Smartphone,
  AttachMoney,
  ColorLens,
  Description,
} from "@material-ui/icons";
import { getUser } from "../../../Utils/Common";

export default function Review() {
  const user = getUser();
  const [value, setValue] = useState();
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const ngaydanhgia = new Date();
  const productId = useParams();
  useEffect(() => {
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);

  const handleReview = () => {
    axios
      .post("/sanpham/danhgia", {
        MaKH: user["Khachhang.id"],
        MaSP: productId.id,
        noidung: comment,
        diem: value,
        ngay: ngaydanhgia,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        } else console.log("Đặt hàng không thành công");
      });
  }

  return (
    <div className="product">
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
                <CategoryOutlined className="productShowIcon" />
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
                <ColorLens className="productShowIcon" />
                <span className="productInfoTitle">{product.Mausac}</span>
              </div>
              <div className="productShowInfo">
                <Description className="productShowIcon" />
                <span
                  className="productInfoTitle"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {product.SP_Mota}
                </span>
              </div>
            </div>
          </div>
          <div className="productReviewForm">
            <span className="productUpdateTitle">Đánh giá sản phẩm</span>
            <div className="productReview">
              <div>
                <Rating
                  name="half-rating"
                  defaultValue={0}
                  className="productReviewRating"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
            
              </div>
              <div>
                <textarea
                  rows={8}
                  placeholder="Nhập đánh giá của bạn..."
                  className="productComment"
                  onChange={(value) => setComment(value.target.value)}
                />
              </div>
              <button className="productUpdateButton"  onClick={handleReview}>Gửi đánh giá</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
