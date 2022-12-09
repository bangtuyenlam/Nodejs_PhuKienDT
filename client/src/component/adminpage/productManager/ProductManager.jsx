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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) =>( {
  root: {
    "& .super-app-theme--header": {
      backgroundColor: "rgba(255, 7, 0, 0.55)",
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '600px',
  },
}));

export default function ProductManager() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    axios
    .post(`/sanpham/${id}`)
    .then((res) => {
     setProduct(res.data)
    }) .catch((err) => {
      if (err.response.status === 404)
        console.log("Sản phẩm này không tồn tại");
      else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
    });
    setOpen(true);
    
  };
console.log(product);
  const handleClose = () => {
    setOpen(false);
  };

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
            <div
              
              className="btn btn-success ms-1"
            >
              <RemoveRedEyeOutlined onClick={() =>
                handleOpen(params.row.id)                  
                } />
                 <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          
          <div className={classes.paper}>
        
          { product && (
             <div className="productShowBottom">
              <span className="productShowTitle text-black fw-bolder">Thông tin sản phẩm</span>
              <div className="productShowInfo">
              <img className="rounded-circle" style={{width: "40px", height: "40px"}} src={`http://localhost:5000/image/${product.Anhdaidien}`}/>
                  <div> {product.SP_Ten} </div>
              </div>
              <div className="productShowInfo">

                <span className="form-control">
                <b> Điện thoại: </b> {product["Dienthoai.DT_Ten"]}
                </span>
              </div>
              <div className="productShowInfo">
               
              <span className="form-control">
                <b> Giá sản phẩm: </b> {product.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
                </span>
              </div>
              <div className="productShowInfo">
              <span className="form-control">
                <b> Số lượng: </b> {product.Soluong}
                </span>
              </div>
              <div className="productShowInfo">
        
                <span className="form-control" style={{whiteSpace: 'pre-line'}}
                dangerouslySetInnerHTML={{__html: product.SP_Mota}}
                >
                 
                </span>
              </div>
            </div>
          )}
          </div>
      
        </Fade>
      </Modal>
            </div>
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
