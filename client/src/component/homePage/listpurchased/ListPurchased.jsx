import React, {useState, useEffect} from 'react';
import "./listpurchased.css";
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import { Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import { makeStyles } from '@material-ui/styles';
import {ThumbUpAltOutlined} from '@material-ui/icons';
const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
function ListPurchased({customer}) {
  const classes = useStyles();
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
        headerClassName: 'super-app-theme--header',
        width: 350,
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
        headerClassName: 'super-app-theme--header',
        width: 154,
        renderCell: (params) => {
            return <div>{params.row["Sanpham.SP_Gia"].toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
        }
      },
      {
        field: 'Dondat.Ngaydat',
        headerName: 'Ngày đặt',
        headerClassName: 'super-app-theme--header',
        width: 180,
        renderCell: (params) => {
          return  dateFormat(params.row['Dondat.Ngaydat'], "h:MM:ss TT dd/mm/yyyy");
        }
      },
      {
        field: 'action',
        headerName: 'Điều khiển',
        headerClassName: 'super-app-theme--header',
        width: 150,
        renderCell: (params) => {
          
          return(
            <>
            <Link to={`/personal/review-product/rating/${params.row.SP_Ma}`} className="btn btn-outline-warning">
            <ThumbUpAltOutlined/>
            </Link>
            </>
          )
        }
      }
    ];
  return (
    <div className="checkoutManager my-3">
       <div className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25" style={{ height: "120%", width: '100%' }}>
    <div className='checkoutManagerContainer'>
      <h1 className="checkoutManagerTitle">Sản phẩm chưa đánh giá</h1>
    </div>
    <div style={{ height: "90%", width: '100%', background: "white" }} className={classes.root}>
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
}</div>
  </div>
  </div>
  )
}

export default ListPurchased