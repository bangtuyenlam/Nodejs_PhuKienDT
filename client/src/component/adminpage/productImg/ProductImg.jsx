import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productimg.css";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ProductImg() {
  const productId = useParams();
  const [selectedImg, setSelectedImg] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  console.log(productId.id);
  useEffect(() => {
    getData();
  }, [imgList]);

  const getData =  async () => {
   await axios
      .post(`/hinhanh/${productId.id}`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }

  const handleAdd = () => {
    const formdata = new FormData();
    formdata.append("SP_Ma", productId.id);
    imgList.map((img) => formdata.append("imgList", img));
    axios
      .post("/hinhanh/them", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/admin/productManager");
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi chưa chọn hình ảnh");
        } else console.log("Thêm sản phẩm không thành công");
      });
  };

  const handleRemove = () => {
    navigate("/admin/productManager");
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        window.URL.createObjectURL(file)
      );
      setImgList((img) => img.concat(Array.from(e.target.files)));
      setSelectedImg((img) => img.concat(filesArray));
      Array.from(e.target.files).map((img) => window.URL.revokeObjectURL(img));
    }
  };

  const handleDeleteImages =(id) => {
    axios.delete(`/hinhanh/xoa/${id}`, {
    })
    console.log("xóa thành công");
    getData();
  }

  const handleRemoveImg = (index) => {
  
    setSelectedImg(selectedImg.filter((ig, i) => i !== index));
    setImgList(imgList.filter((img, i) => i !== index));
    
  };

  const renderPhotos = (selectedImg) => {
    return selectedImg.map((img, index) => {
      return (
        <div className="image">
          <button onClick={() => handleRemoveImg(index)}>Xóa</button>
          <br />
          <img className="img" key={img} alt="anh" src={img} />
        </div>
      );
    });
  };
  const alert = () => {
  
      
      {
    Swal.fire({
      title: "Cảnh báo",
      text: "Số lượng ảnh lưu không vượt quá 8 bạn nên xóa bớt ảnh!",
      icon: "warning",
      confirmButtonText: "OK",
    })}
  };
  return (
    <div className="newProduct">
      <h4 className="newProductTitle">Thêm ảnh cho sản phẩm</h4>
      <div>
        {selectedImg && images && (selectedImg.length + images.length > 8 ) ? (
          <>{alert()}</>
        ) : (
          <input type="file" multiple onChange={handleImageChange} />
        )}
      </div>
      <div className="result">
        {images && (images.map((item, index) => {
          return (
            <div className="image">
            <button onClick={() => handleDeleteImages(item.id)}>Xóa</button>
            <br />
            <img className="img" key={index} alt="anh" src={`http://localhost:5000/image/${item.Duongdan}`} />
          </div>
          )
        }))}
        {renderPhotos(selectedImg)}
        </div>

      {selectedImg && images && (selectedImg.length + images.length > 8) ? (
        <button
          className="Button"
          type="button"
          onClick={handleAdd}
          disabled={true}
        >
          Lưu
        </button>
      ) : (
        <button className="newProductButton" type="button" onClick={handleAdd}>
          Lưu
        </button>
      )}

      <button
        className="btn btn-danger ms-2"
        type="button"
        onClick={handleRemove}
      >
        Hủy bỏ
      </button>
    </div>
  );
}
