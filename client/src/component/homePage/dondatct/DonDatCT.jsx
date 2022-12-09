import React, { useState, useEffect } from "react";
import "./dondatct.css";
import { useParams } from "react-router-dom";
import "date-fns";

import axios from "axios";

import { useNavigate } from "react-router";
import dateFormat from "dateformat";
export default function DonDatCT() {
  const navigate = useNavigate();
  const dondatId = useParams();
  const [dondatct, setDondatct] = useState([]);
  const [dondat, setDondat] = useState([]);
  const [stateString, setStateString] = useState("");
  var totalPrice = 0;

  useEffect(() => {
    axios
      .post(`/dathang/dondatct/${dondatId.id}`)
      .then((res) => {
        setDondatct(res.data.dondatct);
        setDondat(res.data.dondat[0]);
        if(res.data.dondat[0].Trangthai === 0)
          setStateString("Đang chuẩn bị hàng");
         else if(res.data.dondat[0].Trangthai === 1)
          setStateString("Đang giao hàng");
          else setStateString("Đã nhận được hàng")
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Đơn đặt này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin đơn đặt");
      });
  }, []);

  const handleFinish = () => {
    axios
      .post(`/dathang/nhanhang/${dondatId.id}`, {
        trangthai: 2,
      })
      .then(() => {
        navigate("/personal/review-product");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/dathang/huy/${id}`, {
      data: {
        ddct: dondatct,
      },
    });
    navigate("/personal/listorder");
  };



  return (
    <div className="customer">
      <div className="customerManagerContainer">
        <h4 className="customerManagerTitle">Chi tiết đơn hàng</h4>
      </div>
      
        <div className="container">
          <div className="row">
          <div className="col-md-7 shadow-sm p-2">
            <div className="card-header border">
              <h4>Thông tin đơn hàng</h4>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr className="bg-info">
                  <th className="col-5">Sản phẩm</th>
                  <th className="col-3">Giá</th>
                  <th className="col-1">Số lượng</th>
                  <th className="col-3">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                  {dondatct &&
                    dondatct.map((val, i) => {
                      totalPrice += val.Gia * val.Soluongdat;
                      return (
                        <tr key={i}>
                          <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                            src={`http://localhost:5000/image/${val["Sanpham.Anhdaidien"]}`}
                          />
                          {val["Sanpham.SP_Ten"]}
                        </td>
                        {val["Sanpham.KM_Ma"] != null ? (
                          <td>
                            {val.Gia
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            đ 
                            <p className="small text-danger mb-0">
                              <s>
                                {val["Sanpham.SP_Gia"].toString().replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )}{" "}
                                đ
                              </s>
                            </p>
                          </td>
                        ) : (
                          <td>
                            {val.Gia.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )}{" "}
                            đ
                          </td>
                        )}
                          <td>{val.Soluongdat} </td>
                          <td>{val.Gia * val.Soluongdat.toString().replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )} đ</td>
                        </tr>
                      );
                    })}
                  <tr className=" bg-warning bg-opacity-50">
                    <td colSpan="2" className="text-end fw-bolder">
                      Tổng tiền
                    </td>
                    <td colSpan="2" className="text-end fw-bolder">
                      {totalPrice.toString().replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )} đ
                    </td>
                  </tr>
                </tbody>
            </table>
            <div className="col-md-12">
                        <div className="form-group mb-3 text-end">
                          {dondat.Trangthai === 0 ? (
                            <button
                              key={dondat.id}
                              type="button"
                              name="email"
                              className="btn btn-danger"
                              onClick={() => handleDelete(dondat.id)}
                            >
                              Hủy đơn hàng
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      {dondat.Trangthai === 1 ? (
                        <div className="col-md-12">
                          <div className="form-group mb-3 text-end">
                            <button
                              key={"nhanhang"}
                              type="button"
                              name="nhanhang"
                              className="btn btn-primary"
                              onClick={handleFinish}
                            >
                              Đã nhận được hàng
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

          </div>
            {dondat && (
              <div className="col-md-5 shadow-sm p-2">
                <div className="card">
                  <div className="card-header">
                    <h4>Thông tin nhận hàng</h4>
                  </div>
                  <div className="card" style={{ width: "100%"}}>
              <div className="card-body">
                <div className="card-text"><span className=" fw-bolder">Họ tên khách hàng: </span> {dondat.TenNguoiNhan}</div>
                <div className="card-text">
                 <span className=" fw-bolder">Số điện thoại: </span> {dondat.SDTNhan}
                </div>
                <div className="card-text">
                 <span className=" fw-bolder">Địa chỉ nhận hàng: </span> {dondat.DiaChiNhan}
                </div>
                <div className="card-text">
                 <span className=" fw-bolder">Ghi chú: </span> {dondat.Ghichu}
                </div>
                <div className="card-text btn-info">
                 <span className=" fw-bolder">Trạng thái đơn hàng: </span> {stateString}
                 
                </div>
                {dondat.Ngaygiao !== null ? 
                <div className="card-text btn-info">
                
                <span className=" fw-bolder">Ngày giao: </span> {dateFormat(dondat.Ngaygiao, "H:MM dd-mm-yyyy")}
                 
                </div>
                 : <></>}
              </div>
            </div>
                </div>
                
            <div className="card mt-3" style={{ width: "18rem" }}>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 fw-bold">
                  Thông tin giao hàng{" "}
                </h6>
                <div className="card-text text-success">Miễn phí giao hàng</div>
                <div className="card-text text-success">
                  Thanh toán khi nhận hàng (COD)
                </div>
              </div>
            </div>
              </div>
            )}

            
          </div>
        </div>
     
    </div>
  );
}
