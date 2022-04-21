import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

export default function ProductDetail({handleClick}) {
  const productId = useParams();
  const [product, setProduct] = useState([]);

  useEffect( () => {
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);
  return (
    <div>
      <div className="container py-5">
      {product &&
        <div className="row py-4">
          <div className="col-md-6">
          <img
                src={`http://localhost:5000/image/${product.Anhdaidien}`}
                alt="Anh dai dien"
                className="card-img-top"
                height="400px"
                width="400px"
              />
          </div>
          <div className="col-md-5">
            <h2 className="text-uppercase text-black-50">
              {product.SP_Ten}
            </h2>
            <h4 className="display-6 fw-bold my-4">{product.SP_Gia} VNĐ</h4>
            <h4> Mô tả</h4>
            <p className="lead" style={{whiteSpace: 'pre-line'}}>{product.SP_Mota}</p>
            <button className='btn btn-dark px-4 py-2' onClick={() => handleClick(product)}>Thêm vào giỏ hàng</button>
            <Link className='btn btn-dark ms-2 px-3 py-2' to={"/buyproduct"}>Mua hàng</Link>
          </div>
        </div>
      }
      </div>
    </div>
  )
}
