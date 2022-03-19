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
import axios from "axios";
import dateFormat from "dateformat";
export default function Customer() {
  const customerId = useParams();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    axios
      .post("/khachhang/id", {
        customerId: customerId.id,
      })
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        
        if (err.response.status === 404)
          console.log("Khách hàng này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin khách hàng");
      });
  }, []);

  return (
   
    <div className="customer">
      <div className="customerTitleContainer">
        <h1 className="customerTitle">Sửa thông tin khách hàng</h1>
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
          <div className="customerEdit">bcc</div>
        </div>
      )}
    </div>
  );
}
