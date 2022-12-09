import React, { useEffect, useState } from "react";
import "./postmanager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline, EditOutlined, RemoveRedEyeOutlined } from "@material-ui/icons";
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
export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id, avatar) => {
    axios.delete(`/baidang/xoa/${id}`, {
      data: {
        anhdaidien: avatar,
      },
    })
    console.log("xóa thành công");
    getData()
   }

  const getData = async () => {
    await axios
      .get("/baidang")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được bài đăng");
      });
  };

  const columns = [
    {
        field: "NV_Ma",
        headerName: "Tên nhân viên",
        width: 230,
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          return (
              <div>
                  {params.row["Nhanvien.NV_Hoten"]}
            </div>
          );
        },
      },
    {
      field: "Tieude",
      headerName: "Tiêu đề",
      width: 430,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="postName">
            <img
              className="postImg"
              src={`http://localhost:5000/image/${params.row.BD_Hinhanh}`}
              alt="Anh bai dang"
            />
            {params.row.Tieude}
          </div>
        );
      },
    },
    {
      field: "Ngaydang",
      headerName: "Ngày đăng",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return dateFormat(params.row.Ngaydang, "dd/mm/yyyy");
      },
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 180,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/post/${params.row.id}`} className="btn btn-success ms-1">
            <RemoveRedEyeOutlined />
            </Link>
            <div className="btn btn-outline-danger ms-1">
            <DeleteOutline
              className="postManagerDelete"
                 onClick = {() => handleDelete(params.row.id, params.row.Anhdaidien)}
            />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="postManager">
       <div
        className="border border-3 rounded p-lg-3 pt-0 shadow-lg bg-primary bg-opacity-25"
        style={{ height: "120%", width: "100%" }}
      >
      <div className="postManagerContainer">
        <h4 className="postManagerTitle">Danh sách bài đăng</h4>
        <Link to={"/admin/newpost"}>
          <button className="postAddButton">Thêm</button>
        </Link>
      </div>
      <div
          style={{ height: "90%", width: "100%", background: "white" }}
          className={classes.root}
        >
      {posts && (
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={7}
          disableSelectionOnClick
        />
      )}</div>
      </div>
    </div>
  );
}
