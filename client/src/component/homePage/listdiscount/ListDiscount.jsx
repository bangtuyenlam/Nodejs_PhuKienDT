import React, {useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';
import Rating from "@material-ui/lab/Rating";
import ImageHoverZoom from "../imghoverzoom/ImgHoverZoom";
import { Link } from 'react-router-dom';
import { getUser } from "../../../Utils/Common";
function ListDiscount({handleClick}) {
    const [promotion, setPromotion] = useState([]);
    const user = getUser();

    useEffect(() => {
        getListPromotion();
      }, []);
    
      const getListPromotion = () => {
        axios
        .get("/khuyenmai/chitiet")
        .then((res) => {
          setPromotion(res.data.rows)
        })
        .catch((err) => {
          console.log(err);
        });
      }

     
      const addCart = (product) => {
        if (user !== null) {
          if (product.Soluong > product.amount) {
            product.amount++;
          }
          handleClick(product);
        } else window.location.href = "/login";
      };
    const item = promotion && promotion.map((item, i) => {
        item.amount = 1;
        return (
        <div className="me-2 ms-2" key={i}>
        <div className="card">
          <Link
            className="card-img-top"
            style={{ backgroundColor: "white" }}
            to={`/product/${item.id}`}
          >
            <ImageHoverZoom
              imagePath={`http://localhost:5000/image/${item.Anhdaidien}`}
            />
          </Link>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="small" style={{height: "40px"}}>{item.SP_Ten}</p>
            </div>
         
              <div className="d-flex justify-content-between mb-3">
                {/* <h5 className="mb-0">HP Notebook</h5> */}
    
                <h5 className="text-dark mb-0">
                  {(item.SP_Gia -
                    (item.SP_Gia * item["Khuyenmaicts.PhanTramKM"]) /
                      100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                   đ
                </h5>
                <p className="small text-danger">
                  <s>{item.SP_Gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</s>
                </p>
              </div>
          
            <div className="d-flex justify-content-between mb-2">
              <p className="text-muted mb-0">
                Có sẵn: <span className="fw-bold">{item.Soluong}</span>
              </p>
              <div className="ms-auto text-warning">
                {item.DiemTB === null ? (
                  <Rating
                    key={item.DiemTB}
                    name="half-rating"
                    defaultValue={5}
                    precision={0.5}
                    readOnly
                  />
                ) : (
                  <Rating
                    key={item.DiemTB}
                    name="half-rating"
                    defaultValue={parseFloat(item.DiemTB)}
                    precision={0.5}
                    readOnly
                  />
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between px-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => addCart(item)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
        )
    });

    const responsive = {
        0: {
          items: 1
        },
        800: {
          items: 2
        },
        1024: { items: 4},
    
    };
    
  return (
    <>
    { promotion[0] ? (
    <div className="border border-info bg-info p-2 mb-3">
    <h5 className="fw-bolder">SẢN PHẨM KHUYẾN MÃI</h5>
        <AliceCarousel mouseTracking items={item} 
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
          animationDuration={200}
          autoPlay
          disableButtonsControls
          autoPlayInterval={1000}
          />
    </div>
    ) : <div></div>
}
    </>
  )
}

export default ListDiscount