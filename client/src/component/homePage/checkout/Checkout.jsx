import React, { useState, useEffect } from "react";
import { getUser } from "../../../Utils/Common";
import { useNavigate } from "react-router";
import axios from "axios";
function Checkout({ cart }) {
  var totalPrice = 0;
  const navigate = useNavigate();
  const user = getUser();
  const [customer, setCustomer] = useState([]);
  const [note, setNote] = useState("");
  const ngaydat = new Date();
  const [error, setError] = useState("");
  const check =
    customer.KH_Hoten !== null &&
    customer.KH_SDT !== null &&
    customer.KH_Diachi !== null
      ? false
      : true;

  useEffect(() => {
    axios
      .post("/khachhang/id", {
        customerId: user["Khachhang.id"],
      })
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Khách hàng này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin khách hàng");
      });
  }, []);

  const handleCheckOut = () => {
    axios
      .post("/dathang", {
        manv: 1,
        makh: user["Khachhang.id"],
        ngaydat: ngaydat,
        trangthai: 0,
        ghichu: note,
        dondatct: cart,
      })
      .then((res) => {
        navigate("/personal/listorder");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        } else console.log("Đặt hàng không thành công");
      });
  };
  return (
    <div className="py-4 mt-lg-5">
      <div className="container">
        <div className="row">
          {user && (
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
                          value={customer.KH_Hoten}
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
                          value={customer.KH_SDT}
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
                          value={customer.KH_Email}
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Địa chỉ nhận hàng</label>
                        <textarea
                          readOnly={true}
                          rows={2}
                          type="text"
                          name="name"
                          className="form-control"
                          value={customer.KH_Diachi}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>Ghi chú</label>
                        <textarea
                          rows={3}
                          type="text"
                          name="name"
                          className="form-control"
                          onChange={(value) => setNote(value.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group text-end">
                        <button
                          type="button"
                          name="email"
                          className="btn btn-primary"
                          onClick={handleCheckOut}
                          disabled={check}
                        >
                          Đặt hàng
                        </button>
                      </div>
                    </div>
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
                {cart &&
                  cart.map((val) => {
                    if (val["Khuyenmaicts.id"] === null)
                      totalPrice += val.SP_Gia * val.amount;
                    else
                      totalPrice +=
                        val.amount *
                        (val.SP_Gia -
                          (val.SP_Gia * val["Khuyenmaicts.PhanTramKM"]) / 100);
                    return (
                      <tr>
                        <td>{val.SP_Ten}</td>
                        {val["Khuyenmaicts.id"] === null ? (
                          <td>{val.SP_Gia} </td>
                        ) : (
                          <td>
                            {val.SP_Gia -
                              (val.SP_Gia * val["Khuyenmaicts.PhanTramKM"]) /
                                100}
                          </td>
                        )}

                        <td>{val.amount}</td>
                        {val["Khuyenmaicts.id"] === null ? (
                          <td>{val.SP_Gia * val.amount}</td>
                        ) : (
                          <span>
                            {val.amount *
                              (val.SP_Gia -
                                (val.SP_Gia * val["Khuyenmaicts.PhanTramKM"]) /
                                  100)}
                            
                          </span>
                        )}
                      </tr>
                    );
                  })}
                <tr>
                  <td colSpan="2" className="text-end">
                    Tổng tiền
                  </td>
                  <td colSpan="2" className="text-end">
                    {totalPrice} VNĐ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
