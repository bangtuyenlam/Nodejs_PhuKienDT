import React, {useState, useEffect} from 'react';
import "./newpost.css";
import axios from "axios";
import { useNavigate } from "react-router";
import dateFormat from 'dateformat';
import { getUser} from "../../Utils/Common";

export default function NewPost() {
  const manv = getUser();
  const [tieude, setTieude] = useState("");
  const [hinhanh, setHinhanh] = useState({ file: [] });
  const [noidung, setNoidung] = useState("");
  const ngaydang = new Date();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleCreate = () => {
    const formdata = new FormData();
    formdata.append("hinhanh", hinhanh.file);
    formdata.append("manv", manv["Nhanvien.id"]);
    formdata.append("tieude", tieude);
    formdata.append("noidung", noidung);
    formdata.append("ngaydang", ngaydang);
    axios
      .post("/baidang/them", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/postManager");
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        } else console.log("Thêm bài đăng không thành công");
      });
  }; 

 
 
  const uploadImage = (e) => {

    setHinhanh({
      ...hinhanh,
      file: e.target.files[0],
    });
  };

  return (
    <div className="newPost">
      <h1 className="newPostTitle">Thêm bài đăng</h1>
      <form className="newPostForm">
     
        <div className="newPostItem">
          <label> Tiêu đề</label>
          <input
            type="text"
            value={tieude}
            onChange={(value) => setTieude(value.target.value)}
          ></input>
        </div>

        <div className="newPostItem">
          <label>Ảnh đại diện</label>
          <input type="file" id="file" onChange={uploadImage}></input>
        </div>

        <div className="newPostItem">
          <label> Nội dung</label>
          <textarea
            type="text"
            value={noidung}
            onChange={(value) => setNoidung(value.target.value)}
            rows="10"
          ></textarea>
        </div>
        
        <div className="newPostItem">
          <label> Người viết: {manv.TenTK}</label>
        </div>
        <button
          className="newPostButton"
          type="button"
          onClick={handleCreate}
        >
          Lưu
        </button>
      </form>
    </div>
  );
}
