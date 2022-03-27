import React, { useEffect, useState } from 'react';
import './customerManger.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline} from '@material-ui/icons'
import { Link} from 'react-router-dom';

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

  const handleDelete = (id) => {
     axios.delete(`/khachhang/xoa/${id}`)
     console.log("xóa");
  }

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
      field: 'gioitinh',
      headerName: 'Giới tính',
      width: 160,
      renderCell: (params) => {
        if(params.row.KH_Gioitinh === 1)
          return <div>Nam</div>
          else return <div>Nữ</div>
      }
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
      width: 200,
    },
    {
      field: 'KH_SDT',
      headerName: 'Số điện thoại',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Điều khiển',
      width: 150,
      renderCell: (params) => {
        
        return(
          <>
          <Link to={`/admin/customer/${params.row.id}`}>
          <button className="customerManagerEdit">Edit</button>
          </Link>
          <DeleteOutline className="customerManagerDelete"
              onClick = {() => handleDelete(params.row.id)}
          />
          </>
        )
      }
    }
  ];
  
  
  return (
    <div className="customerManager">
      <div className='customerManagerContainer'>
        <h1 className="customerManagerTitle">Danh sách khách hàng</h1>
        <Link to={"/admin/newcustomer"}>
        <button className="customerAddButton">Thêm</button>
        </Link>
      </div>
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
