import React, { useEffect, useState } from "react";
import "./product.css";
import { useParams } from "react-router-dom";
import defaultImg from "../../image/default.png";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
export default function Product() {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [category, setCategory] = useState();
  const [phone, setPhone] = useState();
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState();
  const [color, setColor] = useState("");
  const [previewImg, setPreviewImg] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data);
        setProductName(res.data.SP_Ten);
        setPrice(res.data.SP_Gia);
        setDescribe(res.data.SP_Mota);
        setColor(res.data.Mausac);
        setCategory(res.data.LSP_Ma);
        setPhone(res.data.DT_Ma)
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);
 

  useEffect(() => {
    if (!avatar) {
      setPreviewImg(defaultImg);
      return;
  }

  const objectUrl = window.URL.createObjectURL(avatar);
  setPreviewImg(objectUrl);

  return () => window.URL.revokeObjectURL(objectUrl);
  }, [avatar]);


  const handleUpdate = async (event) => {
    console.log(category);
    console.log(price);
    const formdata = new FormData();
    formdata.append("id", productId.id);
    formdata.append("avatar", avatar);
    formdata.append("loaisp", category);
    formdata.append("tendt", phone);
    formdata.append("tensp", productName);
    formdata.append("gia", price);
    formdata.append("mota", describe);
    formdata.append("mausac", color);
   await axios
      .post("/sanpham/capnhat", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Nhập hàng thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {window.location.href = "/admin/importProduct"}, 1700)         
      })
      .catch((error) => {
        if (error.response.status === 500)
          console.log("Cập nhật không thành công");
      });
  };
  const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

  useEffect(() => {
    axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/dienthoai")
      .then((res) => {
        setPhoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectCategoryChange = (value) => {
    setCategory(value.target.value);
  };

  const selectPhoneChange = (value) => {
    setPhone(value.target.value);
  };

  const uploadImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAvatar("");
      return;
  }
      setAvatar(e.target.files[0]);
  };
console.log(product);
  return (
    <div className="product">
      <div className="border border-3 rounded p-lg-3 shadow-lg bg-black bg-opacity-25 ">
      {product && (
        
          <div>
             <h4 className="newProductTitle">Chỉnh sửa sản phẩm</h4>
            <form action="" className="newProductForm">
              
                <div className="newProductItem">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    placeholder={product.SP_Ten}
                    value={productName}
                   
                    onChange={(value) => {
                      setProductName(value.target.value);
                    }}
                  />
                </div>
                
                <div className="newProductItem">
                  <label>Giá tiền</label>
                  <input
                    type="number"
                    value={price}
                    min={0}
                    onKeyPress={preventMinus}
                    onChange={(value) => setPrice(value.target.value)}
                  ></input>
                </div>
                <div className="newProductItem">
                  <label>Loại sản phẩm</label>
                  <select
                  
                    className="form-control"
                    id="district"
                    onChange={selectCategoryChange}
                  >
                    <option value={product.LSP_Ma || ""}>
                     {product["Loaisanpham.LSP_Ten"]}
                    </option>

                    {categoryList.map((loaisp) => {
                      if(product.LSP_Ma !== loaisp.id) {
                      return (
                         
                        <option value={loaisp.id} key={loaisp.id}>
                          {loaisp.LSP_Ten}
                        </option>
                        
                      );
                      }
                    })}
                  </select>
                </div>
                <div className="newProductItem">
                  <label>Điện thoại</label>
                  <select
                    className="form-control"
                    id="district"
                    onChange={selectPhoneChange}
                  >
                    <option value={product.DT_Ma || ""}>
                      {product["Dienthoai.DT_Ten"]}
                    </option>

                    {phoneList &&
                      phoneList.map((val) => {
                        if(product.DT_Ma !== val.id) {
                        return (
                          <option value={val.id} key={val.id}>
                            {val.DT_Ten}
                          </option>
                        );
                        }
                      })}
                  </select>
                </div>
           
             
                <div className="newProductItem">
                  <label> Chọn ảnh mới</label>
                  <input type="file" id="file" onChange={uploadImage} />
                  <div className="row">
                  <div className="col-md-4 mt-2">
          <img src={previewImg} alt="" id="img" className='img-fluid'/>
          </div>

          <div className="col-md-4 mt-2">
          <img src={`http://localhost:5000/image/${product.Anhdaidien}`} alt="" id="img" className='img-fluid'/>
         </div>
          </div>
                </div>
               
                <div className="newProductItem">
                  <label> Mô tả</label>
                  <div className="bg-white" style={{height: "200px"}}>
          <ReactQuill value={describe} onChange={setDescribe} style={{height: "80%", marginBottom: "17px"}}/>
</div>       
          
                </div>
                <div className="newProductItem">
                  <label> Màu sắc</label>
                  <input
                   
                    type="text"
                    defaultValue={color}
                    onChange={(value) => setColor(value.target.value)}
                  ></input>
                </div>
               
                <button className="newProductButton" onClick={handleUpdate}>
                  Cập nhật
                </button>
              
              {/* <div className="productUpdateRight">
                <div className="productUpdateUpload">
               
                </div>
                <button className="productUpdateButton" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div> */}
            </form>
          </div>
        
      )}
       </div>
    </div>
  );
}
