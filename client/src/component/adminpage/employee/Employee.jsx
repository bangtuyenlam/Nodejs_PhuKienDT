import React, { useEffect, useState } from "react";
import "./employee.css";
import { useParams } from "react-router-dom";
import female from "../../image/female_customer.jpg";
import male from "../../image/male_customer.png";
import {
  PermIdentity,
  CalendarToday,
  PhoneAndroid,
  MailOutline,
  LocationSearching,
  Work,
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import dateFormat from "dateformat";
import Swal from "sweetalert2";
import ProvincesVN from "../../provincesVN/ProvincesVN";
export default function Employee() {
  const NhanvienId = useParams();
  const [employee, setEmployee] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [NhanvienName, setNhanvienName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [chucvu, setChucvu] = useState("Nhân viên");
  const [tenquyen, setTenquyen] = useState("Nhân viên");
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    axios
      .post("/nhanvien/id", {
        NhanvienId: NhanvienId.id,
      })
      .then((res) => {
        setEmployee(res.data);
        setNhanvienName(res.data.NV_Hoten);
        setSelectedDate(res.data.NV_Ngaysinh);
        setGender(res.data.NV_Gioitinh);
        setEmail(res.data.NV_Email);
        setPhoneNumber(res.data.NV_SDT);
        setLocation(res.data.NV_Diachi);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Nhân viên này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin nhân viên");
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectChange = (value) => {
    setChucvu(value.target.value);
    setTenquyen(value.target.value);
  };

  const handleUpdate = (e) => {
    axios
      .post("/nhanvien/capnhat", {
        NhanvienId: NhanvienId.id,
        NhanvienName: NhanvienName,
        gender: gender,
        email: email,
        selectedDate: selectedDate,
        phoneNumber: phoneNumber,
        location: location,
        chucvu: chucvu,
        tenquyen: tenquyen,
      })
      .then((res) => {
        // console.log("aaa");
       window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 500)
          console.log("Cập nhật không thành công");
      });
  };
  const handleChangeAddress = () => {
    setIsChange(true);
  };

  const handleClose = () => {
    setIsChange(false);
  };

  const getAddress = (province, district, ward, street) => {
    setIsChange(false);
    if (!province || !district || !ward || !street) {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng nhập đầy đủ địa chỉ!",
        confirmButtonText: "OK",
      });
    } else
      setLocation(
        street +
          ", " +
          ward.label +
          ", " +
          district.label +
          ", " +
          province.label
      );
  };
  return (
    <div className="employee">
      <div className="border border-3 rounded p-lg-3 shadow-lg bg-primary bg-opacity-25 ">
        <div className="customerTitleContainer">
          <h4 className="customerTitle">Thông tin khách hàng</h4>
        </div>

        {employee && (
          <div className="employeeContainer ">
            <div className="employeeShow bg-light">
              <div className="employeeShowTop">
                {employee.NV_Gioitinh === 0 ? (
                  <img
                    src={female}
                    alt="Anh dai dien"
                    className="employeeShowImg"
                  />
                ) : (
                  <img
                    src={male}
                    alt="Anh dai dien"
                    className="employeeShowImg"
                  />
                )}

                <div className="employeeShowTopTitle">
                  <span className="employeeShowName">{employee.NV_Hoten}</span>
                </div>
              </div>
              <div className="employeeShowBottom">
                <span className="employeeShowTitle">Thông tin chi tiết</span>
                <div className="employeeShowInfo">
                  <PermIdentity className="employeeShowIcon" />

                  <span className="employeeInfoTitle">
                    {employee["Taikhoan.TenTK"]}
                  </span>
                </div>
                <div className="employeeShowInfo">
                  <CalendarToday className="employeeShowIcon" />
                  <span className="employeeInfoTitle">
                    {dateFormat(employee.NV_Ngaysinh, "dd/mm/yyyy")}
                  </span>
                </div>
                <div className="employeeShowInfo">
                  <Work className="employeeShowIcon" />
                  <span className="employeeInfoTitle">{employee.Chucvu}</span>
                </div>
                <span className="employeeShowTitle">Thông tin liên lạc</span>
                <div className="employeeShowInfo">
                  <MailOutline className="employeeShowIcon" />
                  <span className="employeeInfoTitle">{employee.NV_Email}</span>
                </div>
                <div className="employeeShowInfo">
                  <PhoneAndroid className="employeeShowIcon" />
                  <span className="employeeInfoTitle">{employee.NV_SDT}</span>
                </div>
                <div className="employeeShowInfo">
                  <LocationSearching className="employeeShowIcon" />
                  <span className="employeeInfoTitle">
                    {employee.NV_Diachi}
                  </span>
                </div>
              </div>
            </div>
            <div className="employeeEdit bg-light">
              <span className="employeeUpdateTitle">Chỉnh sửa</span>
              <form action="" className="employeeUpdateForms">
                <div className="employeeUpdateLeft">
                  <div className="employeeUpdateItem">
                    <label>Họ tên khách hàng</label>
                    <input
                      type="text"
                      placeholder={employee.NV_Hoten}
                      value={NhanvienName}
                      className="employeeUpdateInput"
                      onChange={(value) => {
                        setNhanvienName(value.target.value);
                      }}
                    />
                  </div>
                  <div className="employeeUpdateItem">
                    <label>Giới tính</label>
                    <div className="form-check">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="isMale"
                          id="inlineRadio1"
                          value="1"
                          onChange={(value) => setGender(value.target.value)}
                        />
                        <label className="form-check-label">Nam</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="isMale"
                          id="inlineRadio2"
                          value="0"
                          onChange={(value) => setGender(value.target.value)}
                        />
                        <label className="form-check-label">Nữ</label>
                      </div>
                    </div>
                  </div>
                  <div className="employeeUpdateItem">
                    <label>Ngày sinh</label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        id="date-picker-dialog"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        maxDate={"2010-12-31"}
                        minDate={"1952-01-01"}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="employeeUpdateItem">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder={employee.NV_Email}
                      value={email}
                      className="employeeUpdateInput"
                      onChange={(value) => setEmail(value.target.value)}
                    />
                  </div>
                  <div className="employeeUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      pattern="[0-9]{10}"
                      value={phoneNumber}
                      placeholder={employee.NV_SDT}
                      className="employeeUpdateInput"
                      onChange={(value) => setPhoneNumber(value.target.value)}
                    />
                  </div>

                  <div className="employeeUpdateItem">
                    <label>
                      Chức vụ
                      {/* <span>*</span> */}
                    </label>
                    <select
                      className="form-control"
                      id="district"
                      onChange={selectChange}
                    >
                      <option value="Nhân viên" default>
                        Nhân viên
                      </option>

                      <option value="Quản lý">Quản lý</option>
                    </select>
                  </div>
                  <div className="employeeUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      value={location}
                      placeholder={employee.NV_Diachi}
                      className="employeeUpdateInput"
                      onChange={(value) => setLocation(value.target.value)}
                    />{" "}
                    {isChange ? (
                      <div className="mt-3">
                       <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button
                              className=" bg-danger"
                              onClick={handleClose}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                        <ProvincesVN getAddress={getAddress} />{" "}
                      </div>
                    ) : (
                      <div className="d-grid gap-2 mt-2 d-md-flex justify-content-md-end">
                        <button
                          className="btn btn-success"
                          onClick={handleChangeAddress}
                        >
                          {" "}
                          Chọn{" "}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
              </form>
              <div className="employeeUpdateRight">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Cập nhật
                  </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
