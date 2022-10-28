import React, { useState, useEffect } from "react";
import axios from "axios";
import "./review.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
function Reviewed() {
  const [reviews, setReviews] = useState([]);
  const customerId = useParams();
  const navigate = useNavigate();

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
      width: 128,
      renderCell: (params) => {
        return <div>{params.row["Sanpham.SP_Gia"]} VNĐ</div>;
      },
    },
    {
      field: 'Noidung',
      headerName: 'Đánh giá',
      width: 250,
      renderCell: (params) => {
        return  <div>{params.row.Noidung}</div>;
      }
    },
    {
      field: 'DG_Diem',
      headerName: 'Số sao',
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
    // {
    //   field: "action",
    //   headerName: "Điều khiển",
    //   width: 151,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/personal/review-product/rating/${params.row.SP_Ma}`}>
    //           <button className="productManagerEdit">Đánh giá</button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="checkoutManager">
      <div className="checkoutManagerContainer">
        <h1 className="checkoutManagerTitle">Sản phẩm đã đánh giá</h1>
      </div>
      {reviews && (
        <DataGrid
          rows={reviews}
          columns={columns}
          pageSize={7}
         
        />
      )}
    </div>
  );
}

export default Reviewed;
