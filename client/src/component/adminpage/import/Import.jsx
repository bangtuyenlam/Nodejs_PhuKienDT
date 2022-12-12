import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import dateFormat from 'dateformat';
function Import() {
    const [phieuNhap, setPhieuNhap] = useState([]);
    const phieuNhapId = useParams();
    const [info, setInfo] = useState({});
    useEffect(() => {
        axios.post("/nhaphang/chitiet", {
            MaPN: phieuNhapId.id,
          })
        .then((res) => {
          setPhieuNhap(res.data);
          setInfo(res.data[0])
        })
        .catch((err) => {
          console.log(err + " Không thể lấy được sản phẩm");
      })  
    }, [])
   
  return (
    <div className="newProduct">
        {info &&(
       <div className="border border-3 rounded p-lg-3 shadow-lg bg-primary bg-opacity-25 ">
       <h4 className="newProductTitle">Thông tin phiếu nhập</h4>
      <div className="container">
      <form className="newProductForm border pb-2">
        <div className="newProductItem">
          <label> Người lập</label>
          <input
            type="text"
            value={info["Phieunhap.Nhanvien.NV_Hoten"] || ""}
            disabled={true}
            // onChange={(value) => setEmployee(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label> Ngày lập</label>
          <input
            type="text"
            value={dateFormat( info["Phieunhap.Ngaynhap"], "dd/mm/yyyy") || ""}
            disabled
          ></input>
        </div>
        <div className="newProductItem">
          <label> Nhà cung cấp</label>
          <input
            type="text"
            value={info["Phieunhap.PN_Nhacungcap"] || ""}
            disabled
          ></input>
        </div>
        <div className="newProductItem">
          <label> Tổng tiền</label>
          <input
            type="text"
            value={info["Phieunhap.PN_Tongtien"] || ""}
            disabled
          ></input>
        </div>
      </form>


     <br/>
      </div>

      <div>
          <h5 className="newProductTitle">Chi tiết phiếu nhập</h5>
          <div className="container">
            <ul className="list-group list-group-horizontal bg-success">
              <li className="list-group-item col-1">Ảnh</li>
              <li className="list-group-item col-5">Tên sản phẩm</li>
              <li className="list-group-item col-2">Số lượng</li>
              <li className="list-group-item col-2">Giá</li>
              <li className="list-group-item col-2">Thành tiền</li>
            </ul>
         
            {phieuNhap &&
          phieuNhap.map((item, index) => (
            
              <ul className="list-group list-group-horizontal-sm" key={index}>
                  <li className="list-group-item col-1">
                  <img
                            className="rounded-circle row"
                            style={{ width: "40px", height: "40px" }}
                            src={`http://localhost:5000/image/${item["Sanpham.Anhdaidien"]}`}
                          />
                </li>
                <li className="list-group-item col-5">
              
                       <input
                    type="text"
                    className="form-control row"
                    value={item["Sanpham.SP_Ten"] || ""}
                    disabled
                  ></input>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="number"
                    className="form-control"
                    disabled
                    value={item.Soluongnhap || ""}
                    
                  ></input>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="text"
                  
                    className="form-control"
                    value={item.Gianhap || ""}
                    disabled
                  ></input>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="text"
                  
                    className="form-control"
                    value={(item.Gianhap * item.Soluongnhap) || ""}
                    disabled
                  ></input>
                </li>
             
             
              </ul>

           
          ))}
          <ul className="list-group list-group-horizontal-sm">
              <li className="list-group-item col-10 text-end">Tổng tiền</li>
              <li className="list-group-item col-2">{info["Phieunhap.PN_Tongtien"] }</li>
            </ul>
          </div>
         
        </div>

       
        </div>
)}
        </div>
  )
}

export default Import