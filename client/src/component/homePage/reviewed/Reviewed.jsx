import React, { useState, useEffect } from "react";
import axios from "axios";
import "./review.css";
import { DataGrid } from "@material-ui/data-grid";
import { useParams, Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
function Reviewed() {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const customerId = useParams();


  useEffect( () => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .post(`/danhgia/khachhang/${customerId.id}`)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được danh sách đơn đặt");
      });
  };

  const columns = [
    {
      field: "Sanpham.SP_Ten",
      headerName: "Tên sản phẩm",
      headerClassName: 'super-app-theme--header',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productName">
            <img
              className="productImg"
              src={`http://localhost:5000/image/${params.row["Sanpham.Anhdaidien"]}`}
              alt="Anh dai dien"
            />
            {params.row["Sanpham.SP_Ten"]}
          </div>
        );
      },
    },
    {
      field: "Sanpham.SP_Gia",
      headerName: "Giá bán",
      headerClassName: 'super-app-theme--header',
      width: 128,
      renderCell: (params) => {
        return <div>{params.row["Sanpham.SP_Gia"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</div>;
      },
    },
    {
      field: 'Noidung',
      headerName: 'Đánh giá',
      headerClassName: 'super-app-theme--header',
      width: 200,
      renderCell: (params) => {
        return  <div>{params.row.Noidung}</div>;
      }
    },
    {
      field: 'DG_Diem',
      headerName: 'Số sao',
      headerClassName: 'super-app-theme--header',
      width: 150,
      renderCell: (params) => {
        return   <div>
        <Rating
          key={params.DG_Diem}
          name="rating"
          defaultValue={params.row.DG_Diem}
          className="productReviewRating"
          readOnly
        />
    
      </div>
      }
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 147,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.row.SP_Ma}`} className="btn btn-outline-secondary">
              <ForwardOutlinedIcon/>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="checkoutManager my-3">
       <div className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25" style={{ height: "120%", width: '100%' }}>
      <div className="checkoutManagerContainer">
        <h1 className="checkoutManagerTitle">Sản phẩm đã đánh giá</h1>
      </div>
      <div style={{ height: "90%", width: '100%', background: "white" }} className={classes.root}>
      {reviews && (
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={7}
         
        />
      )}
      </div>
      </div>
    </div>
  );
}

export default Reviewed;
