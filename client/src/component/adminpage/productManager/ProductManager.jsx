import React, { useEffect, useState } from "react";
import "./productManager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import {
  DeleteOutline,
  RemoveRedEyeOutlined,
  AddPhotoAlternateOutlined,
  EditOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--header": {
      backgroundColor: "rgba(255, 7, 0, 0.55)",
    },
  },
});

export default function ProductManager() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id, avatar) => {
    axios.delete(`/sanpham/xoa/${id}`, {
      data: {
        anhdaidien: avatar,
      },
    });
    console.log("xóa thành công");
    getData();
  };

  const getData = async () => {
    await axios
      .get("/sanpham")
      .then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được sản phẩm");
      });
  };

  const columns = [
    {
      field: "SP_Ten",
      headerName: "Tên sản phẩm",
      headerClassName: "super-app-theme--header",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="productName">
            <img
              className="productImg"
              src={`http://localhost:5000/image/${params.row.Anhdaidien}`}
              alt="Anh dai dien"
            />
            {params.row.SP_Ten}
          </div>
        );
      },
    },
    {
      field: "SP_Gia",
      headerName: "Giá bán",
      width: 135,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return <div>{params.row.SP_Gia.toString().replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )} đ</div>;
      },
    },
    {
      field: "Soluong",
      headerName: "Số lượng",
      width: 137,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 243,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/admin/product/addimg/${params.row.id}`}
              className="btn btn-outline-warning"
            >
              <AddPhotoAlternateOutlined />
            </Link>
            <Link
              to={`/admin/product/${params.row.id}`}
              className="btn btn-success ms-1"
            >
              <RemoveRedEyeOutlined />
            </Link>
            <Link
              to={`/admin/product/${params.row.id}`}
              className="btn btn-secondary ms-1"
            >
              <EditOutlined />
            </Link>
            <div className="btn btn-outline-danger ms-1">
              <DeleteOutline
                className="productManagerDelete"
                onClick={() =>
                  handleDelete(params.row.id, params.row.Anhdaidien)
                }
              />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="productManager">
      <div
        className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25"
        style={{ height: "120%", width: "100%" }}
      >
        <div className="productManagerContainer">
          <h4 className="productManagerTitle">Danh sách sản phẩm</h4>
          <Link to={"/admin/newProduct"}>
            <button className="productAddButton">Thêm</button>
          </Link>
        </div>{" "}
        <div
          style={{ height: "90%", width: "100%", background: "white" }}
          className={classes.root}
        >
          {products && (
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={7}
              disableSelectionOnClick
            />
          )}
        </div>
      </div>
    </div>
  );
}
