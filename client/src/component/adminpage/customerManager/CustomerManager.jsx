import React, { useEffect, useState } from "react";
import "./customerManager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline ,EditOutlined} from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});
export default function CustomerManager() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
 
  useEffect(() => {
    getData();
  }, []);

  //Xóa khách hàng và tài khoản của khách hàng đó
  const handleDelete = (id, MaTK) => {
    axios.delete(`/khachhang/xoa/${id}`, {
      data: {
        MaTK: MaTK,
      },
    });
    console.log("xóa");
    getData();
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
          
            <Link to={`/admin/customer/${params.row.id}`}  className="btn btn-secondary ms-1">
              <EditOutlined />
            </Link>
            <div className="btn btn-outline-danger ms-1">
            <DeleteOutline
              className="customerManagerDelete"
              onClick={() => handleDelete(params.row.id, params.row.MaTK)}

            />
            </div>
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
