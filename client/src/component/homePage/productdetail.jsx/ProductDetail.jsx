import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function ProductDetail({ handleClick }) {
  const productId = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const user = getUser();
  useEffect(() => {
   
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);
  product.amount = 1;

  const Loading = () => {
    return (
      <>
      <div className="row py-4">
          <div className="col-md-6">
            <Skeleton height={400} />
          </div>
          <div className="col-md-5" style={{ lineHeight: 2 }}>
            <Skeleton width={500} height={80} />
            <Skeleton   width={250} height={50}/>
            <Skeleton  height={50} width={100}/>
            <Skeleton width={500} height={300}/>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        {loading ? (
          <Loading />
        ) : (
          product && (
            <div className="row py-4">
              <div className="col-md-6">
                <img
                  src={`http://localhost:5000/image/${product.Anhdaidien}`}
                  alt="Anh dai dien"
                  className="card-img-top"
                  height="400px"
                  width="400px"
                />
              </div>
              <div className="col-md-5">
                <h2 className="text-uppercase text-black-50">
                  {product.SP_Ten}
                </h2>
                <h4 className="display-6 fw-bold my-4">{product.SP_Gia} VNĐ</h4>
                {/* <h4 className="describe"> Mô tả</h4> */}
                <p className="lead" style={{ whiteSpace: "pre-line" }}>
                  {product.SP_Mota}
                </p>

                {user !== null ? (
                  <button
                    className="btn btn-dark px-4 py-2"
                    onClick={() => handleClick(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                ) : (
                  <Link className="btn btn-dark px-4 py-2" to={"/login"}>
                    Đăng nhập/Đăng ký để mua hàng
                  </Link>
                )}
              </div>
              </div>
          )
        )}
      
      </div>
    </div>
  );
}
