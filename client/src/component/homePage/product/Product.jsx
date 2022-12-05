import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import ImageHoverZoom from "../imghoverzoom/ImgHoverZoom";
import Rating from "@material-ui/lab/Rating";
import dateFormat from "dateformat";
function Product({ products, handleClick }) {
  const day = new Date();
  console.log(products);
  const user = getUser();


  const addcart = (product) => {
    if (user !== null) {
      if (product.Soluong > product.amount) {
        product.amount++;
      }
      handleClick(product);
    } else window.location.href = "/login";
  };
 
  return (
    <>
      {products.map((product, i) => {
        console.log()
        product.amount = 1;
        return (
          <div className="col-md-3 mb-4" key={i}>
            <div className="card">
              <Link
                className="card-img-top"
                style={{ backgroundColor: "white" }}
                to={`/product/${product.id}`}
              >
                <ImageHoverZoom
                  imagePath={`http://localhost:5000/image/${product.Anhdaidien}`}
                />
              </Link>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <p className="small" style={{height: "40px"}}>{product.SP_Ten}</p>
                </div>
                {/** Sản phẩm có khuyến mãi và còn hiệu lực */}
                {product["Khuyenmaicts.Khuyenmai_SP.id"] != null &&  product["Khuyenmaicts.Khuyenmai_SP.NgayKetThuc"] > dateFormat(day, "isoDateTime")?  (
                  <div className="d-flex justify-content-between mb-3">
                    {/* <h5 className="mb-0">HP Notebook</h5> */}

                    <h5 className="text-dark mb-0">
                      {(product.SP_Gia -
                        (product.SP_Gia * product["Khuyenmaicts.PhanTramKM"]) /
                          100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                       đ
                    </h5>
                    <p className="small text-danger mb-0">
                      <s>{product.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</s>
                    </p>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between mb-3">
                    {/* <h5 className="mb-0">HP Notebook</h5> */}

                    <h5 className="text-dark mb-0">{product.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</h5>
                  </div>
                )}
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

export default Product;
