import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Rating from "@material-ui/lab/Rating";
import dateFormat from "dateformat";
export default function ProductDetail({ handleClick }) {
  const productId = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState([]);
  const user = getUser();
  useEffect(() => {
   
    axios
      .post(`/sanpham/${productId.id}`)
      .then((res) => {
        setProduct(res.data[0]);
        setReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404)
          console.log("Sản phẩm này không tồn tại");
        else console.log(err + " Lỗi không lấy được thông tin sản phẩm");
      });
  }, []);
  product.amount = 1;

  const avg = () => {
    const sum = review.reduce((a, b) => a + b["Danhgia_SPs.DG_Diem"], 0);
    const avg = (sum / review.length) || 0;
    return avg != 0 ? Number(avg.toFixed(1)) : 5;
  }

  const countReview = () => {
    let a ;
    review.map((r) => {
      if(r["Danhgia_SPs.DG_Diem"] == null)
      a = 0;
      else a = review.length;
    })
    return a;
    
  }

 
  const percent = (numberstar) => {
    switch (numberstar) {
      case 5: 
      return review.filter(r => parseInt(r["Danhgia_SPs.DG_Diem"]) == numberstar).length;
      case 4: 
      return review.filter(r => parseInt(r["Danhgia_SPs.DG_Diem"]) == numberstar).length;
      case 3: 
      return review.filter(r => parseInt(r["Danhgia_SPs.DG_Diem"]) == numberstar).length;
      case 2: 
      return review.filter(r => parseInt(r["Danhgia_SPs.DG_Diem"]) == numberstar).length;
      case 1: 
      return review.filter(r => parseInt(r["Danhgia_SPs.DG_Diem"]) == numberstar).length;
      
    }
  }

  const Loading = () => {
    return (
      <>
      <div className="row py-4">
          <div className="col-md-6">
            <Skeleton height={400} />
          </div>
          <div className="col-md-5" style={{ lineHeight: 2 }}>
            <Skeleton width={500} height={80} />
            <Skeleton   width={250} height={50}/>
            <Skeleton  height={50} width={100}/>
            <Skeleton width={500} height={300}/>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        {loading ? (
          <Loading />
        ) : (
          product &&  (
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
                {/* <h4 className="describe"> Mô tả</h4> */}
                <p className="lead" style={{ whiteSpace: "pre-line" }}>
                  {product.SP_Mota}
                </p>

                {user !== null ? (
                  <button
                    className="btn btn-dark px-4 py-2"
                    onClick={() => handleClick(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                ) : (
                  <Link className="btn btn-dark px-4 py-2" to={"/login"}>
                    Đăng nhập/Đăng ký để mua hàng
                  </Link>
                )}
              </div>
              </div>


	

          )
          )}      
      
      
        
        {review &&(
      
      <div className="row">
<div className="col-sm-3">
  <div className="rating-block" >
    <h4>Điểm đánh giá</h4>
    <h2 className="bold padding-bottom-7">{avg()} <small>/5</small></h2>
    <Rating
                  key={"Diemtb"}
                  name="half-rating"
                  value={avg()}
                  precision={0.5}
                  readOnly
                />
      <div className="fst-italic">{countReview()} lượt đánh giá</div>
  </div>
</div>

  
<div className="col-sm-3">
  <h4>Tỷ lệ sao</h4>
  <div className="pull-left">
    <div className="pull-left" style={{width:"35px", lineHeight:1}}>
      <div style={{height:"9px", margin:"5px 0"}}>5 <span className="ms-auto text-warning"> </span></div>
    </div>
    <div className="pull-left" style={{width:"180px"}}>
      <div className="progress" style={{height:"9px", margin:"8px 0"}}>
        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{width: "1000%"}}>
        <span className="sr-only">80% Complete (danger)</span>
        </div>
      </div>
    </div>
    <div className="pull-right" style={{marginLeft:"10px"}}>{percent(5)}</div>
  </div>
  <div className="pull-left">
    <div className="pull-left" style={{width:"35px", lineHeight:1}}>
      <div style={{height:"9px", margin:"5px 0"}}>4 <span className="glyphicon glyphicon-star"></span></div>
    </div>
    <div className="pull-left" style={{width:"180px"}}>
      <div className="progress" style={{height:"9px", margin:"8px 0"}}>
        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="5" style={{width: "80%"}}>
        <span className="sr-only">80% Complete (danger)</span>
        </div>
      </div>
    </div>
    <div className="pull-right" style={{marginLeft:"10px"}}>{percent(4)}</div>
  </div>
  <div className="pull-left">
    <div className="pull-left" style={{width:"35px", lineHeight:1}}>
      <div style={{height:"9px", margin:"5px 0"}}>3 <span className="glyphicon glyphicon-star"></span></div>
    </div>
    <div className="pull-left" style={{width:"180px"}}>
      <div className="progress" style={{height:"9px", margin:"8px 0"}}>
        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{width: "60%"}}>
        <span className="sr-only">80% Complete (danger)</span>
        </div>
      </div>
    </div>
    <div className="pull-right" style={{marginLeft:"10px"}}>{percent(3)}</div>
  </div>
  <div className="pull-left">
    <div className="pull-left" style={{width:"35px", lineHeight:1}}>
      <div style={{height:"9px", margin:"5px 0"}}>2 <span className="glyphicon glyphicon-star"></span></div>
    </div>
    <div className="pull-left" style={{width:"180px"}}>
      <div className="progress" style={{height:"9px", margin:"8px 0"}}>
        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="5" style={{width: "40%"}}>
        <span className="sr-only">80% Complete (danger)</span>
        </div>
      </div>
    </div>
    <div className="pull-right" style={{marginLeft:"10px"}}>{percent(2)}</div>
  </div>
  <div className="pull-left">
    <div className="pull-left" style={{width:"35px", lineHeight:1}}>
      <div style={{height:"9px", margin:"5px 0"}}>1 <span className="glyphicon glyphicon-star"></span></div>
    </div>
    <div className="pull-left" style={{width:"180px"}}>
      <div className="progress" style={{height:"9px", margin:"8px 0"}}>
        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="5" style={{width: "20%"}}>
        <span className="sr-only">80% Complete (danger)</span>
        </div>
      </div>
    </div>
    <div className="pull-right" style={{marginLeft:"10px"}}>{percent(1)}</div>
  </div>
</div>		

</div>	
)}

{review  && review.map(r => {
  if (r["Danhgia_SPs.DG_Diem"] == null)
  return (<></>);
  else 
  return (
       
            	<div className="row">
              <div className="col-sm-7">
                <hr/>
                <div className="review-block">
                  <div className="row">
                    <div className="col-sm-3">
                    
                      <div className="fw-bold">{r["Danhgia_SPs.Khachhang.Taikhoan.TenTK"]}</div>
                      <div className="review-block-date">{dateFormat(r["Danhgia_SPs.DG_Ngay"], "dd/mm/yyyy")}<br/>1 day ago</div>
                    </div>
                    <div className="col-sm-9">
                      <div className="review-block-rate">
                      <Rating
                  key={product.DiemTB}
                  name="half-rating"
                  value={r["Danhgia_SPs.DG_Diem"]}
                  precision={0.5}
                  readOnly
                />
                      </div>
                     
                      <div className="review-block-description">{r["Danhgia_SPs.Noidung"]}</div>
                    </div>
                  </div>
                  <hr/>
                  </div>
                </div>
              </div>
         
         )})}

      </div>
    </div>
  );
  
}
