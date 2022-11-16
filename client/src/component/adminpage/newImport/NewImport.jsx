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
  const [state, setState] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [employee, setEmployee] = useState();
  const [listDetail, setListDetail] = useState([{ SP_Ma:"", Soluong: 0, Giatien: 0 }]);
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [a, setA] = useState(0);

  useEffect(() => {
    getProduct();
  }, [])

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

  const handleRemoveRow = (SP_Ma) => {    
   
    setListDetail(listDetail.filter((item) => item.SP_Ma !== SP_Ma));

  };


  const selectChange = (e) => {
    setProduct(e.target.value);
  };
  const handleClickState = (e) => {
    setState(e.target.checked); 
  }
 
 
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
          <label>Trạng thái</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckChecked"
              onChange={(e) => handleClickState(e)}
        
            />
            <label className="form-check-label" for="flexCheckChecked">
              Đã thanh toán
            </label>
          </div>
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
              <li className="list-group-item col-3">Điều khiển</li>
            </ul>
         
            {listDetail &&
          listDetail.map((item, index) => (
            <>
              <ul className="list-group list-group-horizontal" >
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
                    value={item.Soluong}
                    onChange={(value) =>{item.Soluong = value.target.value; setAmount(value.target.value) }}
                  ></input>
                </li>
                <li className="list-group-item col-2">
                  <input
                    type="text"
                    className="form-control"
                    value={item.Giatien}
                    onChange={(value) =>{item.Giatien = value.target.value; setPrice(value.target.value)}}
                  ></input>
                </li>
                <li className="list-group-item col-3">
                  {listDetail.length > 1 && (
                    
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveRow(item.SP_Ma)}
                    >
                      Xóa
                    </button>
                  )}
                </li>
              </ul>
              {listDetail.length - 1 === index && listDetail.length < 4 && (
                <div key={index}>
                  <button
                    className="btn btn-outline-info mt-2"
                    onClick={() => handleAddRow()}
                  >
                    Thêm
                  </button>
                </div>
              )}
            </>
          ))}
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default NewImport;
