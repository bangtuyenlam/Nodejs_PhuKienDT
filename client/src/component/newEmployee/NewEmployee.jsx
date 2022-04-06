import "./newEmployee.css";
import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import { useNavigate } from 'react-router';

export default function NewEmployee() {
  const [nhanvienName, setNhanvienName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chucvu, setChucvu] = useState("Nhân viên");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreate =  () => {
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
        chucvu: chucvu
      })
      .then((res) => {
       console.log(res.data);
       navigate("/admin/employeeManager");
      })
      .catch((error) => {
        if (error.response.status === 402){
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        }
        else
          console.log("Cập nhật không thành công");
      });    
  }

  const selectChange = (value) => {
    setChucvu(value.target.value);
}

  return (
    <div className="newEmployee">
      <h1 className="newEmployeeTitle">Thêm nhân viên</h1>
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
           onChange={(value) => setAccount(value.target.value)}></input>
        </div>
        <div className="newEmployeeItem">
          <label>Mật khẩu</label>
          <input
           type="password"
           value={pwd}
           onChange={(value) => setPwd(value.target.value)}></input>
        </div>
        <div className="newEmployeeItem">
          <label> Ngày sinh </label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
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
           onChange={(value) => setEmail(value.target.value)}></input>
        </div>
        <div className="newEmployeeItem">
          <label> Số điện thoại</label>
          <input
           type="text"
           value={phoneNumber}
           onChange={(value) => setPhoneNumber(value.target.value)}></input>
        </div>
        <div className="newEmployeeItem">
          <label> Địa chỉ</label>
          <input
           type="text"
           value={location}
           onChange={(value) => setLocation(value.target.value)}></input>
        </div>
        <div className="newEmployeeItem">
                <label >
                  Chức vụ 
               
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
                
        <button
         className="newEmployeeButton"
         type="button"
         onClick={handleCreate}>Lưu</button>
      </form>
    </div>
  );
}
