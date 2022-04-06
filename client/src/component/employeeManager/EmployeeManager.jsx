import React, {useEffect, useState} from 'react';
import './employeeManager.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline} from '@material-ui/icons'
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
export default function EmployeeManager() {
  
  const [employees, setEmployees] = useState([]);
  
  useEffect( () => {
    getData();
  }, []);

  const handleDelete = (id, MaTK) => {
     axios.delete(`/nhanvien/xoa/${id}`, {
       data: {
         MaTK: MaTK
       }
     })
     console.log("xóa");
     getData()
    }

  const getData = async () => {
   await axios.get("/nhanvien")
    .then((res) => {
      setEmployees(res.data);
     // console.log(res.data);
    })
    .catch((err) => {
      console.log(err + " Không thể lấy được danh sách nhân viên");
  }
    )}


  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    // {
    //   field: 'MaTK',
    //   headerName: 'Tài khoản',
    //   width: 140,
    // },
    {
      field: 'NV_Hoten',
      headerName: 'Họ và tên',
      width: 160,
    },
    {
      field: 'gioitinh',
      headerName: 'Giới tính',
      width: 160,
      renderCell: (params) => {
        if(params.row.NV_Gioitinh === 1)
          return <div>Nam</div>
          else return <div>Nữ</div>
      }
    },
    {
      field: 'NV_Ngaysinh',
      headerName: 'Ngày sinh',
      width: 180,
      renderCell: (params) => {
        return  dateFormat(params.row.NV_Ngaysinh, "dd/mm/yyyy");
      }
    },
    {
      field: 'NV_Diachi',
      headerName: 'Địa chỉ',
      width: 500,
    },
    {
      field: 'NV_Email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'NV_SDT',
      headerName: 'Số điện thoại',
      width: 200,
    },
    {
        field: 'Chucvu',
        headerName: 'Chức vụ',
        width: 200,
    },
    {
      field: 'action',
      headerName: 'Điều khiển',
      width: 150,
      renderCell: (params) => {
        
        return(
          <>
          <Link to={`/admin/employee/${params.row.id}`}>
          <button className="employeeManagerEdit">Edit</button>
          </Link>
          <DeleteOutline className="employeeManagerDelete"
              onClick = {() => handleDelete(params.row.id, params.row.MaTK)}
          />
          </>
        )
      }
    }
  ];
  
  
  return (
    <div className="employeeManager">
      <div className='employeeManagerContainer'>
        <h1 className="employeeManagerTitle">Danh sách nhanvien</h1>
        <Link to={"/admin/newEmployee"}>
        <button className="employeeAddButton">Thêm</button>
        </Link>
      </div>
      {employees && (
       <DataGrid
        rows={employees}
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
