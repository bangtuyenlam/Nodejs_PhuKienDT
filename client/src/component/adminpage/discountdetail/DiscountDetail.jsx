import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import dateFormat from 'dateformat';


function DiscountDetail() {
    const [discount, setDiscount] = useState([]);
    const discountId = useParams();
    const [info, setInfo] = useState({});
    useEffect(() => {
        axios.post("/khuyenmai/chitiet", {
            KM_Ma: discountId.id,
          })
        .then((res) => {
          setDiscount(res.data);
          setInfo(res.data[0]);
        })
        .catch((err) => {
          console.log(err + " Không thể lấy được sản phẩm");
      })  
    }, [])
    console.log(discount);
  return (
    <div className="newProduct">
    {info &&(
   <div className="border border-3 rounded p-lg-3 shadow-lg bg-primary bg-opacity-25 ">
   <h4 className="newProductTitle">Thông tin khuyến mãi</h4>
  <div className="container">
  <form className="newProductForm border pb-2">
    <div className="newProductItem">
      <label> Tên khuyến mãi</label>
      <input
        type="text"
        value={info["Khuyenmai_SP.KM_Ten"] || ""}
        disabled={true}
        // onChange={(value) => setEmployee(value.target.value)}
      ></input>
    </div>
    <div className="newProductItem">
      <label> Phần trăm khuyến mãi</label>
      <input
        type="text"
        value={info["Khuyenmai_SP.PhanTramKM"] || ""}
        disabled
      ></input>
    </div>
    <div className="newProductItem">
      <label> Ngày bắt đầu</label>
      <input
        type="text"
        value={dateFormat( info["Khuyenmai_SP.NgayBatDau"], "dd/mm/yyyy") || ""}
        disabled
      ></input>
    </div>
    <div className="newProductItem">
      <label> Ngày kết thúc</label>
      <input
        type="text"
        value={dateFormat( info["Khuyenmai_SP.NgayKetThuc"], "dd/mm/yyyy") || ""}
        disabled
      ></input>
    </div>
  </form>


 <br/>
  </div>

  <div>
      <h5 className="newProductTitle">Chi tiết sản phẩm</h5>
      <div className="container">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item col-1">Ảnh</li>
          <li className="list-group-item col-7">Tên sản phẩm</li>
          <li className="list-group-item col-2">Số lượng</li>
         
        </ul>
     
        {discount &&
      discount.map((item, index) => (
        
          <ul className="list-group list-group-horizontal-sm" key={index}>
              <li className="list-group-item col-1">
              <img
                        className="rounded-circle row"
                        style={{ width: "40px", height: "40px" }}
                        src={`http://localhost:5000/image/${item.Anhdaidien}`}
                      />
            </li>
            <li className="list-group-item col-7">
          
                   <input
                type="text"
                className="form-control row"
                value={item.SP_Ten || ""}
                disabled
              ></input>
            </li>
            <li className="list-group-item col-2">
              <input
                type="number"
                className="form-control"
                disabled
                value={item.Soluong || ""}
                
              ></input>
            </li>
           
         
          </ul>

       
      ))}
     
      </div>
     
    </div>

   
    </div>
)}
    </div>
  )
}

export default DiscountDetail