import React, { useState, useEffect } from "react";
import { getUser } from "../../../Utils/Common";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ProvincesVN from "../../provincesVN/ProvincesVN";
import CloseIcon from "@material-ui/icons/Close";
function Checkout({ cart }) {
  var totalPrice = 0;
  const navigate = useNavigate();
  const user = getUser();

  const [fullname, setFullName] = useState();
  const [address, setAddress] = useState();
  const [numphone, setNumPhone] = useState();
  const [note, setNote] = useState();
  const ngaydat = new Date();
  const [error, setError] = useState("");
  const [isChange, setIsChange] = useState(false);
console.log(cart);
  useEffect(() => {
    axios
      .post("/khachhang/id", {
        customerId: user["Khachhang.id"],
      })
      .then((res) => {
        console.log(res.data);
        setFullName(res.data.KH_Hoten);
        setAddress(res.data.KH_Diachi);
        setNumPhone(res.data.KH_SDT);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Khách hàng này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin khách hàng");
      });
  }, []);

  const handleCheckOut = () => {
    if (!fullname || !address || !numphone) {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng nhập đầy đủ thông tin khách hàng!",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    } else if (!cart[0]) {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Chưa có sản phẩm cần mua!",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    } else {
      axios
        .post("/dathang", {
          manv: 1,
          makh: user["Khachhang.id"],
          ngaydat: ngaydat,
          trangthai: 0,
          ghichu: note,
          nguoinhan: fullname,
          diachi: address,
          sdt: numphone,
          dondatct: cart,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Đặt hàng thành công!",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/personal/listorder");
              window.location.reload();
            }
          });
        })
        .catch((error) => {
          if (error.response.status === 402) {
            setError(error.response.data.message);
            console.log("Lỗi nhập chưa nhập đủ thông tin");
          } else console.log("Đặt hàng không thành công");
        });
    }
  };

  const getAddress = (province, district, ward, street) => {
    if (!province || !district || !ward || !street) {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng nhập đầy đủ địa chỉ!",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    } else {
      setIsChange(false);
      setAddress(
        street +
          ", " +
          ward.label +
          ", " +
          district.label +
          ", " +
          province.label
      );
    }
  };

  const handleClose = () => {
    setIsChange(false);
  };
  console.log(address);

  const handleChangeAddress = () => {
    setIsChange(true);
  };
  return (
    <div className="py-4 mt-lg-5">
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
                {cart &&
                  cart.map((val, i) => {
                    if (val.KM_Ma != null)
                      totalPrice +=
                        val.amount *
                        (val.SP_Gia -
                          (val.SP_Gia * val["Khuyenmai_SP.PhanTramKM"]) / 100);
                    else totalPrice += val.SP_Gia * val.amount;
                    return (
                      <tr key={i}>
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px", height: "40px" }}
                            src={`http://localhost:5000/image/${val.Anhdaidien}`}
                          />
                          {val.SP_Ten}
                        </td>
                        {val.KM_Ma != null ? (
                          <td>
                            {(
                              val.SP_Gia -
                              (val.SP_Gia * val["Khuyenmai_SP.PhanTramKM"]) /
                                100
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            đ
                            <p className="small text-danger mb-0">
                              <s>
                                {val.SP_Gia.toString().replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  "."
                                )}{" "}
                                đ
                              </s>
                            </p>
                          </td>
                        ) : (
                          <td>
                            {val.SP_Gia.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              "."
                            )}{" "}
                            đ
                          </td>
                        )}

                        <td>{val.amount}</td>
                        {val.KM_Ma != null ? (
                          <td>
                            {(
                              val.amount *
                              (val.SP_Gia -
                                (val.SP_Gia * val["Khuyenmai_SP.PhanTramKM"]) /
                                  100)
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            đ
                          </td>
                        ) : (
                          <td>
                            {(val.SP_Gia * val.amount)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            đ
                          </td>
                        )}
                      </tr>
                    );
                  })}
                <tr className="bg-warning bg-opacity-75">
                  <td colSpan="2" className="text-end fw-bolder">
                    Tổng tiền
                  </td>
                  <td colSpan="2" className="text-end fw-bolder">
                    {totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="col-md-12">
              <div className="form-group text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckOut}
                >
                  Đặt hàng
                </button>
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
          {user && (
            <div className="col-md-5 shadow-sm p-2">
              <div className="card">
                <div className="card-header">
                  <h4>Thông tin nhận hàng</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          Họ tên khách hàng
                          <span className="text-danger"> (*) </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={fullname || ""}
                          onChange={(value) => setFullName(value.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-3">
                        <label>
                          Số điện thoại <span class="text-danger"> (*) </span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          pattern="[0-9]{10}"
                          className="form-control"
                          value={numphone || ""}
                          onChange={(value) => setNumPhone(value.target.value)}
                        ></input>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group mb-3">
                        <label>
                          Địa chỉ nhận hàng{" "}
                          <span class="text-danger"> (*) </span>
                        </label>
                        <textarea
                          readOnly={true}
                          rows={2}
                          type="text"
                          name="name"
                          className="form-control"
                          value={address|| ""}
                          onChange={(value) => setAddress(value.target.value)}
                        ></textarea>
                      </div>

                      {isChange ? (
                        <>
                          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className=" bg-danger"
                              onClick={handleClose}
                            >
                              <CloseIcon />
                            </button>
                          </div>{" "}
                          <ProvincesVN getAddress={getAddress} />{" "}
                        </>
                      ) : (
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button
                            className="btn btn-success"
                            onClick={handleChangeAddress}
                          >
                            {" "}
                            Thay đổi địa chỉ{" "}
                          </button>
                        </div>
                      )}
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

export default Checkout;
