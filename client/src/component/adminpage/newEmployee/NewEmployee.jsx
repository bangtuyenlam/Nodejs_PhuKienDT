import "./newEmployee.css";
import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import axios from "axios";
import { useNavigate } from "react-router";
import ProvincesVN from "../../provincesVN/ProvincesVN";
import Swal from "sweetalert2";
export default function NewEmployee() {
  const [isChange, setIsChange] = useState(false);
  const [nhanvienName, setNhanvienName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date("2010-12-31"));
  const [chucvu, setChucvu] = useState("Nhân viên");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreate = () => {
    axios
      .post("/nhanvien/them", {
        NhanvienName: nhanvienName,
        account: account,
        pwd: pwd,
        gender: gender,
        email: email,
        selectedDate: selectedDate,
        phoneNumber: phoneNumber,
        location: location,
        chucvu: chucvu,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/employeeManager");
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Thông báo",
            text: "Vui lòng nhập đầy đủ thông tin!",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          });
        } else console.log("Cập nhật không thành công");
      });
  };

  const selectChange = (value) => {
    setChucvu(value.target.value);
  };

  const handleChangeAddress = () => {
    setIsChange(true);
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
    <div className="newEmployee">
      <div className="border border-3 rounded p-lg-3 shadow-lg bg-primary bg-opacity-25 ">
      <h4 className="newEmployeeTitle">Thêm nhân viên</h4>
      <form className="newEmployeeForm">
        <div className="newEmployeeItem">
          <label> Tên nhân viên</label>
          <input
            type="text"
            value={nhanvienName}
            onChange={(value) => setNhanvienName(value.target.value)}
          ></input>
        </div>
        <div className="newEmployeeItem">
          <label> Tên tài khoản</label>
          <input
            type="text"
            value={account}
            onChange={(value) => setAccount(value.target.value)}
          ></input>
        </div>
        <div className="newEmployeeItem">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={pwd}
            onChange={(value) => setPwd(value.target.value)}
          ></input>
        </div>
        <div className="newEmployeeItem">
          <label> Ngày sinh </label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              maxDate={"2010-12-31"}
              minDate={"1952-12-31"}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="newEmployeeItem">
          <label> Giới tính</label>
          <div className="form-check">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio1"
                name="isMale"
                value="1"
                onChange={(value) => setGender(value.target.value)}
              />
              <label className="form-check-label">Nam</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                name="isMale"
                value="0"
                onChange={(value) => setGender(value.target.value)}
              />
              <label className="form-check-label">Nữ</label>
            </div>
          </div>
        </div>
        <div className="newEmployeeItem">
          <label> Email</label>
          <input
            type="email"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
          ></input>
        </div>
        <div className="newEmployeeItem">
          <label> Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value.target.value)}
          ></input>
        </div>
        <div className="newEmployeeItem">
          <label>Chức vụ</label>
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
        <div className="newEmployeeItem">
          <label> Địa chỉ</label>
          <input
            disabled={true}
            type="text"
            value={location}
            onChange={(value) => setLocation(value.target.value)}
          ></input>

          {isChange ? (
            <div className="mt-3">
              <ProvincesVN getAddress={getAddress} />{" "}
            </div>
          ) : (
            <div className="d-grid gap-2 mt-2 d-md-flex justify-content-md-end">
              <button className="btn btn-success" onClick={handleChangeAddress}>
                {" "}
                Chọn{" "}
              </button>
            </div>
          )}
        </div>
        <div className="newCustomerItem">  <button
          className="newEmployeeButton"
          type="button"
          onClick={handleCreate}
        >
          Lưu
        </button></div>
      </form>
      
    
      </div>
    </div>
  );
}
