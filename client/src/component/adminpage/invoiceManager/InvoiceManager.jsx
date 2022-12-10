import React, {useEffect, useState} from 'react';
import './invoicemanager.css';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { DeleteOutline , RemoveRedEyeOutlined} from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

export default function InvoiceManager() {
  const classes = useStyles();
    const [dondat, setDondat] = useState([]);
    // const [sortModel, setSortModel] = useState([
    //   {
    //     field: 'Ngaydat',
    //     sort: 'desc',
    //   },
    // ]);
  // const sortModel = [{
  //   field: 'Ngaydat',
  //   sort: 'desc'
  // }];
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
       headerClassName: 'super-app-theme--header',
       width: 230,
     },
     {
       field: 'Ngaydat',
       headerName: 'Ngày đặt',
       headerClassName: 'super-app-theme--header',
       width: 250,
       renderCell: (params) => {
         return  dateFormat(params.row.Ngaydat, "h:MM:ss TT dd/mm/yyyy");
       }
     },
    {
        field: 'state',
        headerName: 'Tình trạng đơn hàng',
        headerClassName: 'super-app-theme--header',
        width: 270,
        renderCell: (params) => {
            if (params.row.Trangthai === 0) return <div>Chưa duyệt</div>;
            else if (params.row.Trangthai === 1) return <div>Đã duyệt</div>;
            else if (params.row.Trangthai === 2 ) return <div>Đã nhận hàng</div>;
            else if (params.row.Trangthai === 3) return <div>Đã hủy đơn hàng</div>
            else return <div>Đã giao</div>
        }
    },
     {
       field: 'action',
       headerName: 'Điều khiển',
       width: 270,
       headerClassName: 'super-app-theme--header',
       renderCell: (params) => {
         
         return(
           <>
           <Link to={`/admin/orderDetail/${params.row.id}`} className="btn btn-success">
           <RemoveRedEyeOutlined/>
           </Link>
           <div className='btn btn-outline-danger ms-1'>
           <DeleteOutline
              className="customerManagerDelete"
              onClick={() => handleDelete(params.row.id)}
            />        
            </div>
           </>
         )
       }
     },
   ];
  return (
    <div className="checkoutManager">
      <div className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25" style={{ height: "120%", width: '100%' }}>
    <div className='checkoutManagerContainer'>
      <h4 className="checkoutManagerTitle">Danh sách đơn đặt</h4>
    </div >
    <div style={{ height: "90%", width: '100%', background: "white" }} className={classes.root}>
    {dondat && (
     <DataGrid
      rows={dondat}
      columns={columns}
      pageSize={7}
      // checkboxSelection
      disableSelectionOnClick
      // sortModel={sortModel}
     // onSortModelChange={(model) => setSortModel(model)}
    />
    )
}
</div>
</div>
  </div>
  )
}
