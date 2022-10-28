import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import ImageHoverZoom from "../imghoverzoom/ImgHoverZoom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
function CategoryList({ products, handleClick }) {
  const user = getUser();

  // const getData = async () => {
  //   await axios
  //     .get(`/danhgia/sanpham`)
  //     .then((res) => {
  //       setReivew(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err + " Không thể lấy được danh sách đơn đặt");
  //     });
  // };

  console.log(products);
  const addcart = (product) => {
    if (user !== null) handleClick(product);
    else window.location.href = "/login";
  };
  return (
    <>
      {products.map((product) => {
        product.amount = 1;
        return (
          <div className="col-md-3 mb-4">
            <div className="card">
              <Link className="card-img-top" to={`/product/${product.id}`}>
                <ImageHoverZoom
                  imagePath={`http://localhost:5000/image/${product.Anhdaidien}`}
                />
              </Link>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="small">{product.SP_Ten}</p>
                  {/* <p className="small text-danger"><s>$1099</s></p> */}
                </div>

                <div className="d-flex justify-content-between mb-3">
                  {/* <h5 className="mb-0">HP Notebook</h5> */}
                  <h5 className="text-dark mb-0"> {product.SP_Gia} VNĐ</h5>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <p className="text-muted mb-0">
                    Có sẵn: <span className="fw-bold">{product.Soluong}</span>
                  </p>
                  <div className="ms-auto text-warning">
                    {product.DiemTB === null ? (
                      <Rating
                        key={product.DiemTB}
                        name="half-rating"
                        defaultValue={5}
                        precision={0.5}
                        readOnly
                      />
                    ) : (
                      <Rating
                        key={product.DiemTB}
                        name="half-rating"
                        defaultValue={parseFloat(product.DiemTB)}
                        precision={0.5}
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between px-4">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => addcart(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CategoryList;
