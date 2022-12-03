import React, {useEffect, useState} from 'react';
import './invoicemanager.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { DeleteOutline } from "@material-ui/icons";

export default function InvoiceManager() {
    const [dondat, setDondat] = useState([]);
    // const [sortModel, setSortModel] = useState([
    //   {
    //     field: 'Ngaydat',
    //     sort: 'desc',
    //   },
    // ]);
  const sortModel = [{
    field: 'Ngaydat',
    sort: 'desc'
  }];
  useEffect( () => {
    getData();
    
  }, []);


  const getData = async () => {
    await axios.get("/dathang/dondat")
     .then((res) => {
       setDondat(res.data);
      console.log(res.data);
     })
     .catch((err) => {
       console.log(err + " Không thể lấy được danh sách nhân viên");
   }
     )}
 
     const handleDelete = (id) => {
      axios.delete(`/dathang/xoa/${id}`);
      getData();
     }
 
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
        width: 250,
        renderCell: (params) => {
            if (params.row.Trangthai === 0) return <div>Chưa duyệt</div>;
            else if (params.row.Trangthai === 1) return <div>Đã duyệt</div>;
            else if (params.row.Trangthai === 2 ) return <div>Đã nhận hàng</div>;
            else return <div>Đã hủy đơn hàng</div>
        }
    },
     {
       field: 'action',
       headerName: 'Điều khiển',
       width: 150,
       renderCell: (params) => {
         
         return(
           <>
           <Link to={`/admin/orderDetail/${params.row.id}`}>
           <button className="employeeManagerEdit">Chi tiết</button>
           </Link>
           <DeleteOutline
              className="customerManagerDelete"
              onClick={() => handleDelete(params.row.id)}
            />        
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
      pageSize={7}
      checkboxSelection
      disableSelectionOnClick
      sortModel={sortModel}
     // onSortModelChange={(model) => setSortModel(model)}
    />
    )
}
  </div>
  )
}
