import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {getUser} from "../../../Utils/Common";
import Swal from "sweetalert2";
import {DataGrid} from "@material-ui/data-grid";
function NewImport() {
  const user = getUser();
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState(2);
  const [vendor, setVendor] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [employee, setEmployee] = useState();
  const [listDetail, setListDetail] = useState([{ SP_Ma:"", Soluongnhap: 0, Gianhap: 0 }]);
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [a, setA] = useState(0);
  
  useEffect(() => {
    getProduct();
  }, [])

  const handleSave = () => {
    let trunglap = [];
    let check = false;
    console.log(listDetail);
    listDetail.filter((item, index) => {
      if(listDetail.findIndex((i) => i.SP_Ma === item.SP_Ma) !== index)
        trunglap.push(item);
        
  })
 if(trunglap[0])
  Swal.fire({
    icon: "error",
    title: "Thông báo",
    text: "Có hàng trùng tên sản phẩm, vui lòng xóa bớt!",
    confirmButtonText: "OK",
  })
  console.log(trunglap);
  }

  const getProduct = async () => {
    await axios.get("/sanpham")
     .then((res) => {
       setProductList(res.data);
      // console.log(res.data);
     })
     .catch((err) => {
       console.log(err + " Không thể lấy được sản phẩm");
   }
     )}
    
  const handleAddRow = () => {
    setA(a + 1);
    setListDetail([...listDetail, { SP_Ma: 0, Soluong: 0, Giatien: 0 }]);

    setAmount(0);
    setPrice(0);
  };

  const handleRemoveRow = (index) => {    
   
    setListDetail(listDetail.filter((item, i) => i !== index));

  };

  


  const selectChange = (e) => {
    setProduct(e.target.value);
  };
  
 console.log(listDetail);
  return (
    <div className="newProduct">
      <h4 className="newProductTitle">Thêm phiếu nhập</h4>
      <div className="container">
      <form className="newProductForm">
        <div className="newProductItem">
          <label> Người lập</label>
          <input
            type="text"
            value={user["Nhanvien.NV_Hoten"]}
            disabled={true}
            // onChange={(value) => setEmployee(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label> Nhà cung cấp</label>
          <input
            type="text"
            value={vendor}
            onChange={(value) => setVendor(value.target.value)}
          ></input>
        </div>
      </form>
      </div>
      <br />
      <div>
    
        <div>
          <h5 className="newProductTitle">Chi tiết phiếu nhập</h5>
          <div className="container">
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item col-4">Tên sản phẩm</li>
              <li className="list-group-item col-2">Số lượng</li>
              <li className="list-group-item col-2">Giá</li>
            </ul>
         
            {listDetail &&
          listDetail.map((item, index) => (
            
              <ul className="list-group list-group-horizontal-sm" >
                <li className="list-group-item col-4">
                  <select  className="form-control" id="district" onChange={(e) => {selectChange(e); item.SP_Ma = e.target.value}}>
                    <option default value={0}>
                      Chọn sản phẩm
                    </option>

                    {productList.map((sp, index) => {
                      return (
                        <option value={sp.id} key={index}>
                          {sp.SP_Ten}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    value={item.Soluong}
                    onChange={(value) =>{item.Soluong = value.target.value; setAmount(value.target.value) }}
                  ></input>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="text"
                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                    className="form-control"
                    value={item.Giatien}
                    onChange={(value) =>{item.Giatien = value.target.value; setPrice(value.target.value)}}
                  ></input>
                </li>
             
              <div className=" btn-group">
              {listDetail.length - 1 === index && listDetail.length < 10 && (
                <div>
                  <button
                    className="btn btn-outline-info mt-2 ms-3"
                    onClick={() => handleAddRow()}
                  >
                    Thêm
                  </button>
                </div>
              )}
              {/**listDetail.length - 1 === index chỉ true 1 lần duy nhất */}
               {listDetail.length - 1 === index && listDetail.length > 1 &&
                <div>
              <button
                      className="btn btn-outline-danger ms-3 mt-2 "
                      onClick={() => handleRemoveRow(index)}
                    >
                      Xóa
                    </button>
                    </div>
}
              </div>
              </ul>
           
          ))}
          </div>
          <button className="btn btn-primary mt-4 ms-5" onClick={handleSave}> Lưu phiếu nhập</button>
        </div>
       
      </div>
    </div>
  );
}

export default NewImport;
