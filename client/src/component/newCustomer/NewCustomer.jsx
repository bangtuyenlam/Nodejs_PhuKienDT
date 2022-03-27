import "./newCustomer.css";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";

export default function NewCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreate =  () => {
    axios
      .post("/khachhang/them", {
        customerName: customerName,
        account: account,
        pwd: pwd,
        gender: gender,
        email: email,
        selectedDate: selectedDate,
        phoneNumber: phoneNumber,
        location: location,
      })
      .then((res) => {
        console.log(res.data);
          
      })
      .catch((error) => {
        if (error.response.status === 500)
          console.log("Cập nhật không thành công");
      });
      navigate("/admin/customerManager")
  }

  return (
    <div className="newCustomer">
      <h1 className="newCustomerTitle">Thêm khách hàng</h1>
      <form className="newCustomerForm">
        <div className="newCustomerItem">
          <label> Tên khách hàng</label>
          <input
           type="text"
           value={customerName}
           onChange={(value) => setCustomerName(value.target.value)}
          ></input>
        </div>
        <div className="newCustomerItem">
          <label> Tên tài khoản</label>
          <input
           type="text"
           value={account}
           onChange={(value) => setAccount(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
          <label>Mật khẩu</label>
          <input
           type="text"
           value={pwd}
           onChange={(value) => setPwd(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
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
        <div className="newCustomerItem">
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
        <div className="newCustomerItem">
          <label> Email</label>
          <input
           type="text"
           value={email}
           onChange={(value) => setEmail(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
          <label> Số điện thoại</label>
          <input
           type="text"
           value={phoneNumber}
           onChange={(value) => setPhoneNumber(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
          <label> Địa chỉ</label>
          <input
           type="text"
           value={location}
           onChange={(value) => setLocation(value.target.value)}></input>
        </div>
        <button
         className="newCustomerButton"
         onClick={handleCreate}>Lưu</button>
      </form>
    </div>
  );
}
