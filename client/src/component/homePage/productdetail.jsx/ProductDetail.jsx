import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Rating from "@material-ui/lab/Rating";
import dateFormat from "dateformat";
import { StarRate } from "@material-ui/icons";
import ListComment from "../listcomment/ListComment";
export default function ProductDetail({ handleClick }) {
  const productId = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [review, setReview] = useState([]);
  const [comment, setComment] = useState("");
  const dateComment = new Date();
  const user = getUser();
  const makh = user && user["Khachhang.id"] !== null ? user["Khachhang.id"] : null;
  const manv = user && user["Nhanvien.id"] !== null ? user["Nhanvien.id"] : null;
  const [lstComment, setLstComment] = useState([]); 
  const [activeComment, setActiveComment] = useState(null);
  const FirstComments = lstComment.filter(
    (comment) => comment.Binhluantruoc === null
  );
  
  useEffect(() => {
    axios
      .post(`/sanpham/home/${productId.id}`)
      .then((res) => {
        setProduct(res.data[0]);
        setReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });

    getImgByProductId();
    getListComment();
  }, []);

  const getListComment = () => {
    axios
    .post(`/binhluan/${productId.id}`)
    .then((res) => {
        setLstComment(res.data);
    })
    .catch((err)=> {
        console.log(err + " Lỗi không lấy được danh sách bình luận");
    });
  }
console.log(lstComment);
  const getImgByProductId = () => {
    axios
      .post(`/hinhanh/${productId.id}`, {})
      .then((res) => {
        setImages(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  };

  product.amount = 1;
  const addCart = (product) => {
    if (user !== null) {
      if (product.Soluong > product.amount) {
        product.amount++;
      }
      handleClick(product);
    } else window.location.href = "/login";
  };
  const avg = () => {
    const sum = review.reduce((a, b) => a + b["Danhgia_SPs.DG_Diem"], 0);
    const avg = sum / review.length || 0;
    return avg !== 0 ? Number(avg.toFixed(1)) : 5;
  };

  const countReview = () => {
    let a;
    review.map((r) => {
      if (r["Danhgia_SPs.DG_Diem"] === null) a = 0;
      else a = review.length;
      return a;
    });
    return a;
  };

  const percent = (numberstar) => {
    switch (numberstar) {
      case 5:
        return review.filter(
          (r) => parseInt(r["Danhgia_SPs.DG_Diem"]) === numberstar
        ).length;
      case 4:
        return review.filter(
          (r) => parseInt(r["Danhgia_SPs.DG_Diem"]) === numberstar
        ).length;
      case 3:
        return review.filter(
          (r) => parseInt(r["Danhgia_SPs.DG_Diem"]) === numberstar
        ).length;
      case 2:
        return review.filter(
          (r) => parseInt(r["Danhgia_SPs.DG_Diem"]) === numberstar
        ).length;
      case 1:
        return review.filter(
          (r) => parseInt(r["Danhgia_SPs.DG_Diem"]) === numberstar
        ).length;
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="row py-4">
          <div className="col-md-6">
            <Skeleton height={400} />
          </div>
          <div className="col-md-5" style={{ lineHeight: 2 }}>
            <Skeleton width={500} height={80} />
            <Skeleton width={250} height={50} />
            <Skeleton height={50} width={100} />
            <Skeleton width={500} height={300} />
          </div>
        </div>
      </>
    );
  };

  const handleComment = (reply, setReply,id, isReply) => {
    if(isReply !== true) 
    axios
      .post(`/binhluan/them/${productId.id}`, {
        MaKH: makh,
        MaNV: manv,
        Noidung: comment,
        Binhluantruoc: null,
        Ngay: dateComment,
      })
      .then((res) => {
        console.log(res.data);
        getListComment();
      })
      .catch((error) => {
        if (error.response.status === 402) {
          console.log("Chưa nhập nội dung bình luận");
        } else console.log(error + "Bình luận không thành công");
      });
      else 
      {
      axios
      .post(`/binhluan/them/${productId.id}`, {
        MaKH: makh,
        MaNV: manv,
        Noidung: reply,
        Binhluantruoc: id,
        Ngay: dateComment,
      })
      .then((res) => {
       
        getListComment();
      })
      .catch((error) => {
        if (error.response.status === 402) {
          console.log("Chưa nhập nội dung bình luận");
        } else
         console.log(error.response.status + "Bình luận không thành công");
      });
      setReply("");
    }
      setComment("");
      setActiveComment({isReply: false});
  };

  return (
    <>
      <div className="container py-5 my-3">
        {loading ? (
          <Loading />
        ) : (
          product && (
            <div className="row py-3 bg-info bg-opacity-25">
              <h4 className="text-uppercase text-black-50 mb-2">
                  {product.SP_Ten}
                </h4>
              <div className="col-md-6">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={`http://localhost:5000/image/${product.Anhdaidien}`}
                        alt="Anh dai dien"
                        className="card-img-top"
                        height="450px"
                        width="400px"
                      />
                    </div>

                    {images &&
                      images.map((item, i) => {
                        if (i < 10) {
                          return (
                            <div className="carousel-item">
                              <img
                                src={`http://localhost:5000/image/${item.Duongdan}`}
                                alt="Anh dai dien"
                                className="card-img-top"
                                height="450px"
                                width="400px"
                              />
                            </div>
                          );
                        }
                      })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon btn btn-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon btn-dark"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                {images &&
                  images.map((item, i) => {
                    if (i < 10) {
                      return (
                        <div
                          className="col-md-6 col-lg-2 pe-1"
                          style={{ display: "inline" }}
                        >
                          <img
                            src={`http://localhost:5000/image/${item.Duongdan}`}
                            alt="Anh dai dien"
                            className="img-thumbnail"
                            height="50px"
                            width="50px"
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="col-md-5">
                
                {product.KM_Ma != null? (
                  <div className="d-flex mb-2">
                    <h5 className="text-dark mb-0 fw-bolder">
                      {(product.SP_Gia -
                        (product.SP_Gia * product["Khuyenmai_SP.PhanTramKM"]) /
                          100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{" "}
                       đ
                    </h5>
                    <span className="small text-danger mb-0 ms-2">
                      <s>{product.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</s>
                    </span>
                  </div>
                ) : (
                  <h5 className="text-dark fw-bolder mb-0">
                    {product.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
                  </h5>
                )}
                {/* <h4 className="describe"> Mô tả</h4> */}
                <Rating
                      key={"Diemtb"}
                      name="half-rating"
                      value={avg()}
                      precision={0.5}
                      readOnly
                    />

                <p className="mt-1 fs-6 bg-light p-2" style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{__html: product.SP_Mota}}>
                 
                </p>

                <button
                  className="btn btn-dark px-4 py-2"
                  onClick={() => addCart(product)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          )
        )}

        <ul className="nav nav-tabs pt-2" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active btn-outline-primary"
              id="home-tab"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Đánh giá
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link btn-outline-primary"
              id="profile-tab"
              data-bs-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Bình luận
            </a>
          </li>
        </ul>
        <div className="tab-content bg-light p-4" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {review && (
              <div className="row mt-3">
                <div className="col-sm-3">
                  <div className="rating-block">
                    <h4>Điểm đánh giá</h4>
                    <h2 className="bold padding-bottom-7">
                      {avg()} <small>/5</small>
                    </h2>
                    <Rating
                      key={"Diemtb"}
                      name="half-rating"
                      value={avg()}
                      precision={0.5}
                      readOnly
                    />
                    <div className="fst-italic">
                      {countReview()} lượt đánh giá
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <h4>Tỷ lệ sao</h4>
                  <div className="pull-left">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: 1 }}
                    >
                      <div style={{ height: "9px", margin: "5px 0" }}>
                        5<StarRate />
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "9px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow="5"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: "1000%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {percent(5)}
                    </div>
                  </div>
                  <div className="pull-left">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: 1 }}
                    >
                      <div style={{ height: "9px", margin: "5px 0" }}>
                        4<StarRate />
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "9px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow="4"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: "80%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {percent(4)}
                    </div>
                  </div>
                  <div className="pull-left">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: 1 }}
                    >
                      <div style={{ height: "9px", margin: "5px 0" }}>
                        3<StarRate />
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "9px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow="3"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: "60%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {percent(3)}
                    </div>
                  </div>
                  <div className="pull-left">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: 1 }}
                    >
                      <div style={{ height: "9px", margin: "5px 0" }}>
                        2<StarRate />
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "9px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow="2"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: "40%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {percent(2)}
                    </div>
                  </div>
                  <div className="pull-left">
                    <div
                      className="pull-left"
                      style={{ width: "35px", lineHeight: 1 }}
                    >
                      <div style={{ height: "9px", margin: "5px 0" }}>
                        1<StarRate />
                      </div>
                    </div>
                    <div className="pull-left" style={{ width: "180px" }}>
                      <div
                        className="progress"
                        style={{ height: "9px", margin: "8px 0" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          aria-valuenow="1"
                          aria-valuemin="0"
                          aria-valuemax="5"
                          style={{ width: "20%" }}
                        >
                          <span className="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                    <div className="pull-right" style={{ marginLeft: "10px" }}>
                      {percent(1)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {review &&
              review.map((r) => {
                if (r["Danhgia_SPs.DG_Diem"] == null)
                  return <div key={r["Danhgia_SPs.id"]}></div>;
                else
                  return (
                    <div className="row" key={r["Danhgia_SPs.id"]}>
                      <div className="col-sm-7">
                        <hr />
                        <div className="review-block">
                          <div className="row">
                            <div className="col-sm-3">
                              <div className="fw-bold">
                                {r["Danhgia_SPs.Khachhang.Taikhoan.TenTK"]}
                              </div>
                              <div className="review-block-date">
                                {dateFormat(
                                  r["Danhgia_SPs.DG_Ngay"],
                                  "dd/mm/yyyy"
                                )}
                                <br />1 day ago
                              </div>
                            </div>
                            <div className="col-sm-9">
                              <div className="review-block-rate">
                                <Rating
                                  key={product.DiemTB}
                                  name="half-rating"
                                  value={r["Danhgia_SPs.DG_Diem"]}
                                  precision={0.5}
                                  readOnly
                                />
                              </div>

                              <div className="review-block-description">
                                {r["Danhgia_SPs.Noidung"]}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  );
              })}
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="container">
              <div className="row mt-4">
                <textarea
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    resize: "none",
                  }}
                  rows={3}
                  value={comment}
                  onChange={(value) => setComment(value.target.value)}
                  className="col-8 me-3 rounded-2 border border-secondary py-2"
                  placeholder="Nhập bình luận của bạn..."
                ></textarea>
                <button
                  className="col-1 h-50 mt-5 btn btn-primary justify-content-center"
                  onClick={() => handleComment()}
                >
                  Gửi
                </button>
              </div>
              <div className="row mt-4">
              
              </div>
              { FirstComments && FirstComments.map((comment) => (
               
              <ListComment className= "row mt-4" lstComment = {lstComment} comment = {comment} handleComment = {handleComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              />
                
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
