import React, {useState, useEffect} from 'react';
import "./listpurchased.css";
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';

function ListPurchased({customer}) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.post("/sanpham/dadat", {
            makh: customer["Khachhang.id"]
        })
        .then((res) => {
            setProduct(res.data);
           console.log(res.data);
          })
          .catch((err) => {
            console.log(err + " Không thể lấy được danh sách đơn đặt");
        })
    };
    
    const columns = [
      {
        field: 'Sanpham.SP_Ten',
        headerName: 'Tên sản phẩm',
        width: 400,
        renderCell: (params) => {
          return (
            <div className="productName">
              <img className='productImg' src={`http://localhost:5000/image/${params.row["Sanpham.Anhdaidien"]}`} alt="Anh dai dien"/>
              {params.row["Sanpham.SP_Ten"]}
            </div>
          )
        }
      },
      {
        field: 'Sanpham.SP_Gia',
        headerName: 'Giá bán',
        width: 150,
        renderCell: (params) => {
            return <div>{params.row["Sanpham.SP_Gia"]} VNĐ</div>
        }
      },
      {
        field: 'Dondat.Ngaydat',
        headerName: 'Ngày đặt',
        width: 180,
        renderCell: (params) => {
          return  dateFormat(params.row['Dondat.Ngaydat'], "h:MM:ss TT dd/mm/yyyy");
        }
      },
      {
        field: 'action',
        headerName: 'Điều khiển',
        width: 151,
        renderCell: (params) => {
          
          return(
            <>
            <Link to={`/personal/review-product/rating/${params.row.SP_Ma}`}>
            <button className="productManagerEdit">Đánh giá</button>
            </Link>
            </>
          )
        }
      }
    ];
  return (
    <div className="checkoutManager">
    <div className='checkoutManagerContainer'>
      <h1 className="checkoutManagerTitle">Sản phẩm chưa đánh giá</h1>
    </div>
    {product && (
     <DataGrid
     
      rows={product}
      columns={columns}
      pageSize={8}
      // checkboxSelection
      disableSelectionOnClick
      // sortModel={sortModel}
      // onSortModelChange={(model) => setSortModel(model)}
    />
    )
}
  </div>
  )
}

export default ListPurchased