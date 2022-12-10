import React, { useState, useEffect } from "react";
import "./orderDetail.css";
import { useParams } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from "@material-ui/pickers";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import { useNavigate } from "react-router";
import dateFormat from "dateformat";
export default function OrderDetail() {
  const navigate = useNavigate();
  const user = getUser();
  const dondatId = useParams();
  const [dondatct, setDondatct] = useState([]);
  const [dondat, setDondat] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleCheck = () => {
    axios
      .post("/dathang/duyetdon", {
        id: dondatId.id,
        manv: user["Nhanvien.id"],
        trangthai: 1,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/invoiceManager");
      })
      .catch((error) => {
        console.log("Duyệt đơn hàng không thành công");
      });
  };

  const handleComfirm = () => {
    axios
      .post("/dathang/dagiao", {
        id: dondatId.id,
        ngaygiao: selectedDate,
        trangthai: 4,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/invoiceManager");
      })
      .catch((error) => {
        console.log("Xác nhận giao đơn hàng không thành công");
      });
  }

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Chi tiết đơn hàng</h1>
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
                          <td>{val.Soluongdat}</td>
                          <td>{(val.Gia * val.Soluongdat).toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )} đ</td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td colSpan="2" className="text-end">
                      Tổng tiền
                    </td>
                    <td colSpan="2" className="text-end">
                      {totalPrice.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )} đ
                    </td>
                  </tr>
                </tbody>
            </table>
            {/* {dondat.Ngaygiao == null ? (
              <></>
              // dondat.Trangthai === 1 ? (
              //           <div className="col-md-12">
              //             <div className="form-group mb-3">
              //               <label className="me-4 btn btn-info p-2">Chọn ngày giao</label>
              //               <MuiPickersUtilsProvider utils={DateFnsUtils}>
              //                 <DateTimePicker
              //                   id="date-picker-dialog"
              //                   format="dd/MM/yyyy hh:mm a"
              //                   value={selectedDate}
              //                   onChange={handleDateChange}
              //                   minDate={dateFormat(dondat.Ngaydat, "h:MM:ss TT dd/mm/yyyy")}
              //                 />
              //               </MuiPickersUtilsProvider>
              //             </div>
              //           </div>
              // ) : <></>
                      ) : (
                        <div className="col-md-12">
                          <div className="form-group mb-3">
                            <label className="me-4 btn btn-info p-2">Ngày giao</label>
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
                      )} */}
           {dondat.Trangthai === 0 ? (
                        <div className="col-md-12">
                          <div className="form-group text-end">
                            <button
                              type="button"
                              name="email"
                              className="btn btn-primary"
                              onClick={handleCheck}
                            >
                              Duyệt đơn hàng
                            </button>
                          </div>
                        </div>
                      ) : (
                       <></>
                      )}

{dondat.Trangthai === 1 ? (
                        <div className="col-md-12">
                          <div className="form-group text-end">
                            <button
                              type="button"
                              name="email"
                              className="btn btn-primary"
                              onClick={handleComfirm}
                            >
                              Xác nhận đã giao
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

{dondat.Trangthai === 4 ? (
                         <div className="col-md-12">
                         <div className="form-group text-end">
                           <label className="btn btn-warning opacity-50 text-black">
                             Giao hàng thành công
                           </label>
                         </div>
                       </div>
                      ) : <></>}
                      
{dondat.Trangthai === 2 ? (
                         <div className="col-md-12">
                         <div className="form-group text-end">
                           <label className="btn btn-success opacity-75 text-black">
                             Đã nhận được hàng
                           </label>
                         </div>
                       </div>
                      ) : <></>}

                      {dondat.Trangthai === 3 ? (
                         <div className="col-md-12">
                         <div className="form-group text-end">
                           <label className="btn btn-light opacity-75 text-black">
                             Đơn hàng bị hủy
                           </label>
                         </div>
                       </div>
                      ) : <></>}

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
                
                {dondat.Ngaygiao !== null ? 
                <div className="card-text btn-info">
                
                <span className=" fw-bolder">Ngày giao: </span> {dateFormat(dondat.Ngaygiao, "h:MM:ss TT dd-mm-yyyy")}
                 
                </div>
                 : <></>}
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
