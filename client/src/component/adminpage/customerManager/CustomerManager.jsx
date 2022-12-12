import React, { useEffect, useState } from "react";
import "./customerManager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline ,EditOutlined, RemoveRedEyeOutlined} from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import female from "../../image/female_customer.jpg";
import male from "../../image/male_customer.png";
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

export default function CustomerManager() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  //Xóa khách hàng và tài khoản của khách hàng đó
  // const handleDelete = (id, MaTK) => {
  //   axios.delete(`/khachhang/xoa/${id}`, {
  //     data: {
  //       MaTK: MaTK,
  //     },
  //   });
  //   console.log("xóa");
  //   getData();
  // };

  const handleOpen = (id) => {
    axios
    .post("/khachhang/id", {
      customerId: id,
    })
    .then((res) => {
     setCustomer(res.data)
    }) .catch((err) => {
      if (err.response.status === 404)
        console.log("Sản phẩm này không tồn tại");
      else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
    });
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getData = async () => {
    await axios
      .get("/khachhang")
      .then((res) => {
        setCustomers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được khách hàng");
      });
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 100 },
    // {
    //   field: 'MaTK',
    //   headerName: 'Tài khoản',
    //   width: 140,
    // },
    {
      field: "KH_Hoten",
      headerName: "Họ và tên",
      width: 260,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gioitinh",
      headerName: "Giới tính",
      width: 160,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (params.row.KH_Gioitinh === 1) return <div>Nam</div>;
        else if (params.row.KH_Gioitinh === 0) return <div>Nữ</div>;
        else return <div></div>;
      },
    },
    {
      field: "KH_Email",
      headerName: "Email",
      width: 220,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "KH_SDT",
      headerName: "Số điện thoại",
      width: 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>

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
        
          { customer && (
             <div className="productShowBottom">
              <span className="productShowTitle text-black fw-bolder">Thông tin khách hàng</span>
              <div className="productShowInfo">
              {customer.KH_Gioitinh === 0 ? (
              <img className="rounded-circle" style={{width: "40px", height: "40px"}} src={female}/> )
              : (<img className="rounded-circle" style={{width: "40px", height: "40px"}} src={male}/>) }
                  <div> {customer.KH_Hoten} </div>
              </div>
              <div className="productShowInfo">

                <span className="form-control">
                <b> Tài khoản: </b> {customer["Taikhoan.TenTK"]}
                </span>
              </div>
              <div className="productShowInfo">
               
              <span className="form-control">
                <b> Ngày sinh: </b> {customer.KH_Ngaysinh ? dateFormat(customer.KH_Ngaysinh, "dd/mm/yyyy") : <></>}
                </span>
              </div>
              <div className="productShowInfo">
              <span className="form-control">
                <b> Email: </b> {customer.KH_Email}
                </span>
              </div>
              <div className="productShowInfo">
              <span className="form-control">
                <b> SĐT: </b> {customer.KH_SDT}
                </span>
              </div>
              <div className="productShowInfo">
              <span className="form-control">
                <b> Địa chỉ: </b> {customer.KH_Diachi}
                </span>
              </div>
             
            </div>
          )}
          </div>
      
        </Fade>
      </Modal>
            </div>
          
            {/* <Link to={`/admin/customer/${params.row.id}`}  className="btn btn-secondary ms-1">
              <RemoveRedEyeOutlined/>
            </Link> */}
            {/* <div className="btn btn-outline-danger ms-1">
            <DeleteOutline
              className="customerManagerDelete"
              onClick={() => handleDelete(params.row.id, params.row.MaTK)}

            />
            </div> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="customerManager">
      <div
        className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25"
        style={{ height: "120%", width: "100%" }}
      >
      <div className="customerManagerContainer">
      <h4 className="productManagerTitle">Danh sách khách hàng</h4>
        <Link to={"/admin/newcustomer"}>
          <button className="customerAddButton">Thêm</button>
        </Link>
      </div>
      <div
          style={{ height: "90%", width: "100%", background: "white" }}
          className={classes.root}
        >
      {customers && (
        <DataGrid
          rows={customers}
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
