import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
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
import { useNavigate } from 'react-router';
export default function Review() {
  const user = getUser();
  const [value, setValue] = useState(5);
  const [product, setProduct] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const ngaydanhgia = new Date();
  const navigate = useNavigate();
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

  const handleReview = async () => {
   await axios
      .post("/sanpham/danhgia", {
        MaKH: user["Khachhang.id"],
        MaSP: productId.id,
        noidung: comment,
        diem: value,
        ngay: ngaydanhgia,
      })
      .then((res) => {
       navigate(`/personal/reviewed-product/${user["Khachhang.id"]}`)
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Chưa đánh giá sao cho sản phẩm");
        } else console.log("Đặt hàng không thành công");
      });
  }

  return (
    <div className="review">
      {product && (
        <div className="reviewContainer">
          <div className="reviewShow">
            <div className="reviewShowTop">
              <img
                src={`http://localhost:5000/image/${product.Anhdaidien}`}
                alt="Anh dai dien"
                className="reviewShowImg"
              />

              <div className="reviewShowTopTitle">
                <span className="reviewShowName">{product.SP_Ten}</span>
              </div>
            </div>
            <div className="reviewShowBottom">
              <span className="reviewShowTitle">Thông tin chi tiết</span>
              <div className="reviewShowInfo">
                <CategoryOutlined className="reviewShowIcon" />
                <span className="reviewInfoTitle">
                  {product["Loaisanpham.LSP_Ten"]}
                </span>
              </div>
              <div className="reviewShowInfo">
                <Smartphone className="reviewShowIcon" />

                <span className="reviewInfoTitle">
                  {product["Dienthoai.DT_Ten"]}
                </span>
              </div>
              <div className="reviewShowInfo">
                <AttachMoney className="reviewShowIcon" />
                <span className="reviewInfoTitle">{product.SP_Gia}</span>
              </div>
              <div className="reviewShowInfo">
                <ColorLens className="reviewShowIcon" />
                <span className="reviewInfoTitle">{product.Mausac}</span>
              </div>
              <div className="reviewShowInfo">
                <Description className="reviewShowIcon" />
                <span
                  className="reviewInfoTitle"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {product.SP_Mota}
                </span>
              </div>
            </div>
          </div>
          <div className="reviewReviewForm">
            <span className="reviewUpdateTitle">Đánh giá sản phẩm</span>
            <div className="reviewReview">
              <div>
                <Rating
                  key={value}
                  name="half-rating"
                  value={value}
                  className="reviewReviewRating"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
            
              </div>
              {error && <div className="error">{error}</div>}
              <div>
                <textarea
                  rows={8}
                  placeholder="Nhập đánh giá của bạn..."
                  className="reviewComment"
                  onChange={(value) => setComment(value.target.value)}
                />
              </div>
              <button className="reviewUpdateButton"  onClick={handleReview}>Gửi đánh giá</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
