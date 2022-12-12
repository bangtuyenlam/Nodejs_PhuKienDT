import React, {useEffect, useState} from 'react';
import './employeeManager.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import {DeleteOutline, EditOutlined} from '@material-ui/icons'
import { Link} from 'react-router-dom';
// import dateFormat from 'dateformat';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
export default function EmployeeManager() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  
  useEffect( () => {
    getData();
  }, []);

  // const handleDelete = (id, MaTK) => {
  //    axios.delete(`/nhanvien/xoa/${id}`, {
  //      data: {
  //        MaTK: MaTK
  //      }
  //    })
  //    console.log("xóa");
  //    getData()
  //   }

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

    {
      field: 'NV_Hoten',
      headerName: 'Họ và tên',
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: 'gioitinh',
      headerName: 'Giới tính',
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if(params.row.NV_Gioitinh === 1)
          return <div>Nam</div>
          else return <div>Nữ</div>
      }
    },
  
    {
      field: 'NV_Email',
      headerName: 'Email',
      width: 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: 'NV_SDT',
      headerName: 'Số điện thoại',
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
        field: 'Chucvu',
        headerName: 'Chức vụ',
        width: 160,
        headerClassName: "super-app-theme--header",
    },
    {
      field: 'action',
      headerName: 'Điều khiển',
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        
        return(
          <>
          <Link to={`/admin/employee/${params.row.id}`} className="btn btn-secondary ms-1">
           <EditOutlined />
          </Link>
          {/* <div className="btn btn-outline-danger ms-1">
          <DeleteOutline className="employeeManagerDelete"
              onClick = {() => handleDelete(params.row.id, params.row.MaTK)}
          />
          </div> */}
          </>
        )
      }
    }
  ];
  
  
  return (
    <div className="employeeManager">
       <div
        className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25"
        style={{ height: "120%", width: "100%" }}
      >
      <div className='employeeManagerContainer'>
      <h4 className="productManagerTitle">Danh sách nhân viên</h4>
        <Link to={"/admin/newEmployee"}>
        <button className="employeeAddButton">Thêm</button>
        </Link>
      </div>
      <div
          style={{ height: "90%", width: "100%", background: "white" }}
          className={classes.root}
        >
      {employees && (
       <DataGrid
        rows={employees}
        columns={columns}
        pageSize={7}
        disableSelectionOnClick
      />
      )
} </div>
      </div>
    </div>
  )
}
