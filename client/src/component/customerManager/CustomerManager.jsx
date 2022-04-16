import React, { useEffect, useState } from "react";
import "./customerManager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export default function CustomerManager() {
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
      width: 160,
    },
    {
      field: "gioitinh",
      headerName: "Giới tính",
      width: 160,
      renderCell: (params) => {
        if (params.row.KH_Gioitinh === 1) return <div>Nam</div>;
        else if (params.row.KH_Gioitinh === 0) return <div>Nữ</div>;
        else return <div></div>;
      },
    },
    {
      field: "KH_Ngaysinh",
      headerName: "Ngày sinh",
      width: 180,
      renderCell: (params) => {
        return dateFormat(params.row.KH_Ngaysinh, "dd/mm/yyyy");
      },
    },
    {
      field: "KH_Diachi",
      headerName: "Địa chỉ",
      width: 500,
    },
    {
      field: "KH_Email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "KH_SDT",
      headerName: "Số điện thoại",
      width: 200,
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/customer/${params.row.id}`}>
              <button className="customerManagerEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="customerManagerDelete"
              onClick={() => handleDelete(params.row.id, params.row.MaTK)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="customerManager">
      <div className="customerManagerContainer">
        <h1 className="customerManagerTitle">Danh sách khách hàng</h1>
        <Link to={"/admin/newcustomer"}>
          <button className="customerAddButton">Thêm</button>
        </Link>
      </div>
      {customers && (
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={8}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
