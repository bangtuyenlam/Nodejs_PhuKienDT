import React, { useState, useEffect } from "react";
import "./listorder.css";
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { useNavigate } from "react-router";
import { makeStyles } from '@material-ui/styles';
import {RemoveRedEyeOutlined, CheckCircleOutlineOutlined} from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
export default function ListOrder({customer}) {
  const classes = useStyles();
  const navigate = useNavigate();
    const [dondat, setDondat] = useState([]);
    // const [sortModel, setSortModel] = useState([
    //   {
    //     field: 'Ngaydat',
    //     sort: 'desc',
    //   },
    // ]);
    // const sortModel = [{
    //   field: "Ngaydat",
    //   sort: "desc"
    // }]

    
  // const handleSortModelChange = (newModel) => {
  //   setSortModel(newModel);
  // };
  
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
       )};

       const handleFinish = (id) => {
        axios
          .post(`/dathang/nhanhang/${id}`, {
            trangthai: 2,
          })
          .then(() => {
            navigate("/personal/review-product");
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
      };
   
   
     const columns = [
       {
         field: 'TenNguoiNhan',
         headerName: 'Tên khách hàng',
         headerClassName: 'super-app-theme--header',
         width: 200,
       },
       {
         field: 'Ngaydat',
         headerName: 'Ngày đặt',
         headerClassName: 'super-app-theme--header',
         width: 180,
         renderCell: (params) => {
           return  dateFormat(params.row.Ngaydat, "h:MM:ss TT dd/mm/yyyy");
         }
       },
      {
          field: 'state',
          headerName: 'Tình trạng đơn hàng',
          width: 240,
          headerClassName: 'super-app-theme--header',
          renderCell: (params) => {
              if (params.row.Trangthai === 0) return <div>Chuẩn bị hàng</div>;
              else if (params.row.Trangthai === 1) return <div>Đang giao</div>;
              else if (params.row.Trangthai === 2) return <div>Đã nhận hàng</div>
              else if (params.row.Trangthai === 3) return <div>Đã hủy đơn hàng</div>
              else return <div>Đã giao</div>
          }
      },
       {
         field: 'action',
         headerName: 'Điều khiển',
         headerClassName: 'super-app-theme--header',
         width: 216,
         renderCell: (params) => {
           
           return(
             <>
             <Link to={`/personal/orderdetail/${params.row.id}`} className="btn btn-success">
             <RemoveRedEyeOutlined/>
             </Link>
             {params.row.Trangthai === 2 ? (
 <Link to={`/personal/review-product`} onClick = {() => handleFinish(params.row.id)} className="btn btn-warning ms-2">
             <CheckCircleOutlineOutlined/>
             
             </Link>
             ) : (<Link to={`/personal/listorder`} onClick={e => e.preventDefault()} className="btn btn-warning opacity-25 ms-2">
             <CheckCircleOutlineOutlined/>
             
             </Link>)}          
             </>
           )
         }
       },
     ];
    return (
      <div className="checkoutManager my-3">
        <div className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25" style={{ height: "120%", width: '100%' }}>
      <div className='checkoutManagerContainer'>
        <h4 className="checkoutManagerTitle">Danh sách đơn đặt</h4>
      </div>
      <div style={{ height: "90%", width: '100%', background: "white" }} className={classes.root}>
      {dondat && (
       <DataGrid
       key={"dondat"}
        rows={dondat}
        columns={columns}
        pageSize={7}
        // checkboxSelection
        disableSelectionOnClick
        //sortModel={sortModel}
        // onSortModelChange={handleSortModelChange}
      />
      
      )
  }</div>
    </div>
    </div>
    )
}
