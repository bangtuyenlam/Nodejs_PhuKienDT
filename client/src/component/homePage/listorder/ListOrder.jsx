import React, { useState, useEffect } from "react";
import "./listorder.css";
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { useNavigate } from "react-router";
export default function ListOrder({customer}) {
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
              else if (params.row.Trangthai === 2) return <div>Đã nhận hàng</div>
              else return <div>Đã hủy đơn hàng</div>
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
             {params.row.Trangthai === 0 || params.row.Trangthai === 1 ? (
 <Link to={`/personal/review-product`} onClick = {() => handleFinish(params.row.id)}>
             <button className="employeeManagerEdit" >Đã nhận hàng</button>
             
             </Link>
             ) : (<></>)}          
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
       key={"dondat"}
        rows={dondat}
        columns={columns}
        pageSize={7}
        checkboxSelection
        disableSelectionOnClick
        //sortModel={sortModel}
        // onSortModelChange={handleSortModelChange}
      />
      )
  }
    </div>
    )
}
