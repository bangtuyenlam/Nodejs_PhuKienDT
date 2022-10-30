import React, {useState, useEffect} from 'react';
import "./newpost.css";
import axios from "axios";
import { useNavigate } from "react-router";
import dateFormat from 'dateformat';
import { getUser} from "../../Utils/Common";
import anh from "../image/martin-engel-44zXCbDd2WQ-unsplash.jpg";
export default function NewPost() {
  const manv = getUser();
  const [tieude, setTieude] = useState("");
  const [hinhanh, setHinhanh] = useState();
  const [dstheloai, setDsTheloai] = useState([]);
  const [theloai, setTheloai] = useState(1);
  const [noidung, setNoidung] = useState("");
  const [url, setUrl] = useState();
  const ngaydang = new Date();
  const [previewImg, setPreviewImg] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleCreate = () => {
    const formdata = new FormData();
    formdata.append("hinhanh", hinhanh);
    formdata.append("theloai", theloai);
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

  useEffect(() => {
    getCategory();
    if (!hinhanh) {
      setPreviewImg(undefined)
      return
  }

  const objectUrl = window.URL.createObjectURL(hinhanh)
  setPreviewImg(objectUrl)

  return () => window.URL.revokeObjectURL(objectUrl)
  }, [hinhanh])

  const getCategory = () => {
    axios.get("/theloai")
    .then((res) => {
      setDsTheloai(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const selectChange = (value) => {
    setTheloai(value.target.value);
  }
 
  const uploadImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
            setHinhanh(undefined)
            return
        }
    setHinhanh(e.target.files[0]);
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
          <label>Thể loại</label>
          <select
            className="form-control"
            id='theloai'
            onChange={selectChange}
          >
              <option disabled default>
                    Chọn thể loại
                  </option>
                
            {dstheloai &&
              dstheloai.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.TL_Ten}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="newPostItem">
          <label>Ảnh đại diện</label>
          <input type="file" id="file" onChange={uploadImage}></input>
          <img src={previewImg} alt="" id="img" className='img-thumbnail mt-2'/>
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
          <label> Người đăng: {manv.TenTK}</label>
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
