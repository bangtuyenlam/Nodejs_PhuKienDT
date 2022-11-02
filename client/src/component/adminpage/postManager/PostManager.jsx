import React, { useEffect, useState } from "react";
import "./postmanager.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export default function PostManager() {
  const [posts, setPosts] = useState([]);

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
        width: 200,
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
      renderCell: (params) => {
        return dateFormat(params.row.Ngaydang, "dd/mm/yyyy");
      },
    },
    {
      field: "action",
      headerName: "Điều khiển",
      width: 151,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/post/${params.row.id}`}>
              <button className="postManagerEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="postManagerDelete"
                 onClick = {() => handleDelete(params.row.id, params.row.Anhdaidien)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="postManager">
      <div className="postManagerContainer">
        <h1 className="postManagerTitle">Danh sách bài đăng</h1>
        <Link to={"/admin/newpost"}>
          <button className="postAddButton">Thêm</button>
        </Link>
      </div>
      {posts && (
        <DataGrid
          rows={posts}
          columns={columns}
          pageSize={7}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
