import React, { useEffect, useState } from "react";
import "./customer.css";
import { useParams } from "react-router-dom";
import female from "../image/female_customer.jpg";
import male from "../image/male_customer.png";
import {
  PermIdentity,
  CalendarToday,
  PhoneAndroid,
  MailOutline,
  LocationSearching,
} from "@material-ui/icons";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";
import axios from "axios";
import dateFormat from "dateformat";
export default function Customer() {
  const customerId = useParams();
  const [customer, setCustomer] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customerName, setCustomerName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("")

  useEffect(() => {
    axios
      .post("/khachhang/id", {
        customerId: customerId.id,
      })
      .then((res) => {
        setCustomer(res.data);
        setCustomerName(res.data.KH_Hoten);
        setSelectedDate(res.data.KH_Ngaysinh);
        setGender(res.data.KH_Gioitinh);
        setEmail(res.data.KH_Email);
        setPhoneNumber(res.data.KH_SDT);
        setLocation(res.data.KH_Diachi);
      })
      .catch((err) => {
        
        if (err.response.status === 404)
          console.log("Khách hàng này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin khách hàng");
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleUpdate = (e) => { 
   
    axios
      .put("/khachhang/capnhat", {
        customerId: customerId.id,
        customerName: customerName,
        gender: gender,
        email: email,
        selectedDate: selectedDate,
        phoneNumber: phoneNumber,
        location: location,
      })
      .then((res) => {
        
        console.log(res.data);
        
      })
      .catch( (error) => 
      {
        if (error.response.status === 500)
        console.log("Cập nhật không thành công");       
      })
    
  }



  return (
   
    <div className="customer">
      <div className="customerTitleContainer">
        <h1 className="customerTitle">Thông tin khách hàng</h1>
      </div>
      {customer && (
        <div className="customerContainer">
          <div className="customerShow">
            <div className="customerShowTop">
               {customer.KH_Gioitinh === 0 ? 
                  <img
                    src={female}
                    alt="Anh dai dien"
                    className="customerShowImg"
                  />  
                  : 
                  <img
                  src={male}
                  alt="Anh dai dien"
                  className="customerShowImg"
                />  
               }
           
              <div className="customerShowTopTitle">
                <span className="customerShowName">{customer.KH_Hoten}</span>
              </div>
            </div>
            <div className="customerShowBottom">
              <span className="customerShowTitle">Thông tin chi tiết</span>
              <div className="customerShowInfo">
                <PermIdentity className="customerShowIcon" />
                
                <span className="customerInfoTitle">{customer["Taikhoan.TenTK"]}</span>

              </div>
              <div className="customerShowInfo">
                <CalendarToday className="customerShowIcon" />
                <span className="customerInfoTitle">{dateFormat(customer.KH_Ngaysinh, "dd/mm/yyyy")}</span>
              </div>
              <span className="customerShowTitle">Thông tin liên lạc</span>
              <div className="customerShowInfo">
                <MailOutline className="customerShowIcon" />
                <span className="customerInfoTitle">{customer.KH_Email}</span>
              </div>
              <div className="customerShowInfo">
                <PhoneAndroid className="customerShowIcon" />
                <span className="customerInfoTitle">{customer.KH_SDT}</span>
              </div>
              <div className="customerShowInfo">
                <LocationSearching className="customerShowIcon" />
                <span className="customerInfoTitle">{customer.KH_Diachi}</span>
              </div>
            </div>
          </div>
          <div className="customerEdit">
            <span className="customerUpdateTitle">Chỉnh sửa</span>
            <form action="" className="customerUpdateForms">
              <div className="customerUpdateLeft">
                <div className="customerUpdateItem">
                  <label>Họ tên khách hàng</label>
                  <input 
                  type="text"
                  placeholder={customer.KH_Hoten}
                  value = {customerName}
                  className="customerUpdateInput"
                  onChange={(value) =>{
                   
                     setCustomerName(value.target.value);
                    }}
                  />
                </div>
                <div className="customerUpdateItem">
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
                <div className="customerUpdateItem">
                <label>Ngày sinh</label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                 
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                 />
                 </MuiPickersUtilsProvider>
                </div>
                <div className="customerUpdateItem">
                  <label>Email</label>
                  <input 
                  type="email"
                  placeholder={customer.KH_Email}
                  value={email}
                  className="customerUpdateInput"
                  onChange={(value) => setEmail(value.target.value)}
                  />
                </div>
                <div className="customerUpdateItem">
                  <label>Số điện thoại</label>
                  <input 
                  type="text"
                  value={phoneNumber}
                  placeholder={customer.KH_SDT}
                  className="customerUpdateInput"
                  onChange={(value) => setPhoneNumber(value.target.value)}
                  />
                </div>
                <div className="customerUpdateItem">
                  <label>Địa chỉ</label>
                  <input 
                  type="text"
                  value={location}
                  placeholder={customer.KH_Diachi}
                  className="customerUpdateInput"
                  onChange={(value) => setLocation(value.target.value)}
                  />
      
                </div>
              </div>
              <div className="customerUpdateRight">
                <button 
                className="customerUpdateButton"
                onClick={handleUpdate}>Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
