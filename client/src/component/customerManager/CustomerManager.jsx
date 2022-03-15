import React, { useEffect, useState } from 'react';
import './customerManger.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';

export default function CustomerManager() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("/khachhang")
      .then((res) => {
        setCustomers(res.data);
       // console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được khách hàng");
      })
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'MaTK',
      headerName: 'Tài khoản',
      width: 140,
    },
    {
      field: 'KH_Hoten',
      headerName: 'Họ và tên',
      width: 160,
    },
    {
      field: 'KH_Ngaysinh',
      headerName: 'Ngày sinh',
      width: 180,
    },
    {
      field: 'KH_Diachi',
      headerName: 'Địa chỉ',
      width: 500,
    },
    {
      field: 'KH_Email',
      headerName: 'Email',
      width: 130,
    },
    {
      field: 'KH_SDT',
      headerName: 'Số điện thoại',
      width: 200,
    },
  ];
  
  
  return (
    <div className="customerManager">
      {customers && (
       <DataGrid
        rows={customers}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      )
}
    </div>
  )
}
