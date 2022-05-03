import React, { useState, useEffect } from "react";
import "./listorder.css";
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';

export default function ListOrder({customer}) {
    const [dondat, setDondat] = useState([]);
  
    useEffect( () => {
      getData();
    }, []);
  
  
    const getData = async () => {
      await axios.post("/dathang/khdat",{
          makh: customer["Khachhang.id"]
      })
       .then((res) => {
         setDondat(res.data);
        console.log(res.data);
       })
       .catch((err) => {
         console.log(err + " Không thể lấy được danh sách đơn đặt");
     }
       )}
   
   
     const columns = [
       {
         field: 'Khachhang.KH_Hoten',
         headerName: 'Tên khách hàng',
         width: 200,
       },
       {
         field: 'Ngaydat',
         headerName: 'Ngày đặt',
         width: 180,
         renderCell: (params) => {
           return  dateFormat(params.row.Ngaydat, "h:MM:ss TT dd/mm/yyyy");
         }
       },
      {
          field: 'state',
          headerName: 'Tình trạng đơn hàng',
          width: 230,
          renderCell: (params) => {
              if (params.row.Trangthai === 0) return <div>Chuẩn bị hàng</div>;
              else if (params.row.Trangthai === 1) return <div>Đang giao</div>;
          }
      },
       {
         field: 'action',
         headerName: 'Điều khiển',
         width: 200,
         renderCell: (params) => {
           
           return(
             <>
             <Link to={`/personal/orderdetail/${params.row.id}`}>
             <button className="employeeManagerEdit">Chi tiết</button>
             </Link>
             <Link to={`/personal`}>
             <button className="employeeManagerEdit">Đã nhận hàng</button>
             </Link>            
             </>
           )
         }
       },
     ];
    return (
      <div className="checkoutManager">
      <div className='checkoutManagerContainer'>
        <h1 className="checkoutManagerTitle">Danh sách đơn đặt</h1>
      </div>
      {dondat && (
       <DataGrid
        rows={dondat}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
      )
  }
    </div>
    )
}
