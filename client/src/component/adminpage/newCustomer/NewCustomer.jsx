import "./newCustomer.css";
import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import { useNavigate } from 'react-router';
import dateFormat from "dateformat";
import ProvincesVN from "../../provincesVN/ProvincesVN";
import Swal from "sweetalert2";
export default function NewCustomer() {
  const [isChange, setIsChange] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date("2010-12-31"));
  const [error, setError] = useState();
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
        selectedDate: dateFormat(selectedDate, "yyyy-mm-dd"),
        phoneNumber: phoneNumber,
        location: location,
      })
      .then((res) => {
       console.log(res.data);
       navigate("/admin/customerManager");
      })
      .catch((error) => {
        if (error.response.status === 402){
          setError(error.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Thông báo",
            text: "Vui lòng nhập đầy đủ thông tin khách hàng!",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          });
        }
        else
          console.log("Cập nhật không thành công");
      });
    
  }
  const handleChangeAddress = () => {
    setIsChange(true);
  }

  const getAddress = (province, district, ward, street) => {
    setIsChange(false);
    if(!province || !district || !ward || !street){
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Vui lòng nhập đầy đủ địa chỉ!",
        confirmButtonText: "OK",
      })
    }else
    setLocation(street + ", " + ward.label + ", " + district.label + ", " + province.label);
  }

  return (
    <div className="newCustomer">
       <div className="border border-3 rounded p-lg-3 shadow-lg bg-primary bg-opacity-25 ">
      <h4 className="newCustomerTitle">Thêm khách hàng</h4>
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
           type="password"
           value={pwd}
           onChange={(value) => setPwd(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
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
        <div className="newCustomerItem">
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
        <div className="newCustomerItem">
          <label> Email</label>
          <input
           type="email"
           value={email}
           onChange={(value) => setEmail(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
          <label> Số điện thoại</label>
          <input
           type="text"
           pattern="[0-9]{10}"
           value={phoneNumber}
           onChange={(value) => setPhoneNumber(value.target.value)}></input>
        </div>
        <div className="newCustomerItem">
          <label> Địa chỉ</label>
          <input
           type="text"
           value={location}
           disabled={true}
           onChange={(value) => setLocation(value.target.value)}></input>

            {isChange ? <div className="mt-3"><ProvincesVN getAddress={getAddress}/> </div> :  <div className="d-grid gap-2 mt-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-success" onClick={handleChangeAddress}> Chọn </button>
                      </div>}
        </div>
        <div className="newCustomerItem">
        <button
         className="newCustomerButton"
         type="button"
         onClick={handleCreate}>Lưu</button>
         </div>
      </form>
      </div>
    </div>
  );
}
