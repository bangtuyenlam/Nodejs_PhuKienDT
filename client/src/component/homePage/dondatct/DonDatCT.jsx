import React, { useState, useEffect } from "react";
import "./dondatct.css";
import { useParams } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import { useNavigate } from "react-router";
export default function DonDatCT() {
  const navigate = useNavigate();
  const user = getUser();
  const dondatId = useParams();
  const [dondatct, setDondatct] = useState([]);
  const [dondat, setDondat] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slKho, setSlKho] = useState([]);
  const [isReceive, setIsReceive] = useState();
  var totalPrice = 0;

  useEffect(() => {
    axios
      .post(`/dathang/dondatct/${dondatId.id}`)
      .then((res) => {
        setDondatct(res.data.dondatct);
        setDondat(res.data.dondat[0]);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Đơn đặt này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin đơn đặt");
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFinish = () => {
    setIsReceive(true);
    navigate("/personal/review-product");
  };

  const handleDelete = (id) => {
    axios.delete(`/dathang/xoa/${id}`, {
      data: {
        ddct: dondatct,
      },
    });
    navigate("/personal/listorder");
  };

  return (
    <div className="customer">
      <div className="customerManagerContainer">
        <h1 className="customerManagerTitle">Chi tiết đơn hàng</h1>
      </div>
      <div className="py-4">
        <div className="container">
          <div className="row">
            {dondat && (
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Thông tin khách hàng</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Họ tên khách hàng</label>
                          <input
                            readOnly={true}
                            type="text"
                            name="name"
                            className="form-control"
                            value={dondat["Khachhang.KH_Hoten"]}
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Số điện thoại</label>
                          <input
                            readOnly={true}
                            type="text"
                            name="phone"
                            className="form-control"
                            value={dondat["Khachhang.KH_SDT"]}
                          ></input>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Email</label>
                          <input
                            readOnly={true}
                            type="email"
                            name="email"
                            className="form-control"
                            value={dondat["Khachhang.KH_Email"]}
                          ></input>
                        </div>
                      </div>
                      {dondat.Ngaygiao == null ? (
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label>Ngày giao</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker
                                id="date-picker-dialog"
                                format="dd/MM/yyyy hh:mm a"
                                value={selectedDate}
                                onChange={handleDateChange}
                                disabled={true}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label>Ngày giao</label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker
                                id="date-picker-dialog"
                                format="dd/MM/yyyy hh:mm a"
                                value={dondat.Ngaygiao}
                                onChange={handleDateChange}
                                disabled={true}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                      )}
                      {dondat.Trangthai === 0 ? (
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label>Trạng thái đơn hàng</label>
                            <input
                              readOnly={true}
                              type="email"
                              name="email"
                              className="form-control"
                              value={"Đang chuẩn bị hàng"}
                            ></input>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label>Trạng thái đơn hàng</label>
                            <input
                              readOnly={true}
                              type="email"
                              name="email"
                              className="form-control"
                              value={"Đang giao hàng"}
                            ></input>
                          </div>
                        </div>
                      )}
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Địa chỉ nhận hàng</label>
                          <textarea
                            readOnly={true}
                            rows={2}
                            type="text"
                            name="name"
                            className="form-control"
                            style={{ resize: "none" }}
                            value={dondat["Khachhang.KH_Diachi"]}
                          ></textarea>
                        </div>
                      </div>
                      {dondat.Ghichu !== "" ? (
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label>Ghi chú</label>
                            <textarea
                              readOnly={true}
                              rows={3}
                              type="text"
                              name="name"
                              className="form-control"
                              value={dondat.Ghichu}
                              style={{ resize: "none" }}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          {dondat.Trangthai === 0 ? (
                            <button
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
                      {isReceive === false ? (
                        <div className="col-md-6">
                          <div className="form-group mb-3">
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
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <button
                              key={"nhanhang"}
                              type="button"
                              name="nhanhang"
                              className="btn btn-primary"
                              disabled={true}
                            >
                              Đã nhận được hàng
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-md-5">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng cộng</th>
                  </tr>
                </thead>
                <tbody>
                  {dondatct &&
                    dondatct.map((val) => {
                      totalPrice += val.Gia * val.Soluongdat;
                      return (
                        <tr>
                          <td>{val["Sanpham.SP_Ten"]}</td>
                          <td>{val.Gia}</td>
                          <td>{val.Soluongdat}</td>
                          <td>{val.Gia * val.Soluongdat}</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td colSpan="2" className="text-end">
                      Tổng tiền
                    </td>
                    <td colSpan="2" className="text-end">
                      {totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
