import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import { Pagination } from "@material-ui/lab";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryList from "../categorylist/CategoryList";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ImageHoverZoom from "../imghoverzoom/ImgHoverZoom";
import Rating from "@material-ui/lab/Rating";
function ListProduct({ handleClick }) {
  const user = getUser();
  const [products, setProducts] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(products);
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);
  const [countProducts, setCountProducts] = useState();
  const [promotion, setPromotion] = useState([]);
  
  const item = promotion && promotion.map((item, i) => {
    return (
    <div className="mb-4 border-3 border border-info" key={i}>
    <div className="card">
      <Link
        className="card-img-top"
        style={{ backgroundColor: "white" }}
        to={`/product/${item["Sanpham.id"]}`}
      >
        <ImageHoverZoom
          imagePath={`http://localhost:5000/image/${item["Sanpham.Anhdaidien"]}`}
        />
      </Link>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="small">{item["Sanpham.SP_Ten"]}</p>
        </div>
     
          <div className="d-flex justify-content-between mb-3">
            {/* <h5 className="mb-0">HP Notebook</h5> */}

            <h5 className="text-dark mb-0">
              {item["Sanpham.SP_Gia"] -
                (item["Sanpham.SP_Gia"] * item.phantramkm) /
                  100}
              VNĐ
            </h5>
            <p className="small text-danger">
              <s>{item["Sanpham.SP_Gia"]} VNĐ</s>
            </p>
          </div>
      
        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">
            Có sẵn: <span className="fw-bold">{item["Sanpham.Soluong"]}</span>
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
            // onClick={() => addcart(product)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
    )
});
  console.log(item);
  useEffect(() => {
    getData();
    getCategory();
    getListPromotion();
  }, [limit]);

  const getListPromotion = () => {
    axios
    .get("/khuyenmai/chitiet")
    .then((res) => {
      setPromotion(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getCategory = () => {
    axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .post("/sanpham/sp", {
        limit: limit,
      })
      .then((res) => {
        setProducts(res.data.rows);
        setFilter(res.data.rows);
        setCountProducts(res.data.count.length);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được sản phẩm");
      });
  };

  const getid = (id) => {
    const filterProduct = products.filter((value) => value.LSP_Ma === id);
    setFilter(filterProduct);
  };

  const Loading = () => {
    return (
      <>
        {filter &&
          filter.map((sp, i) => {
            return (
              <div className="col-md-3 mb-4" key={i}>
                <Skeleton height={300} />
              </div>
            );
          })}
      </>
    );
  };

  const loadMore = () => {
    setLimit(limit+4);
  }

  const shortCut = () => {
    setLimit(12);
  }

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
    <div>

      <div className="container my-5 py-5">
      
    
          <AliceCarousel mouseTracking items={item} 
          responsive={responsive}
          controlsStrategy="alternate"
          infinite
          animationDuration={200}
         
          />
     
        <div className="row">
          <div className="col-12 mb-1">

            

            <h1 className="display-6 fw-bolder text-center">Tất cả sản phẩm</h1>
            <hr />
          </div>
        </div>

        <div className="buttons d-flex justify-content-center mb-1 pb-5">
          <button
            key={0}
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(products)}
          >
            Tất cả sản phẩm
          </button>
          {categoryList &&
            categoryList.map((value) => {
              return (
                <button
                  key={value.id}
                  className="btn btn-outline-dark me-2"
                  onClick={() => getid(value.id)}
                >
                  {value.LSP_Ten}
                </button>
              );
            })}
        </div>
        <div>
          <div className="row">
            {loading ? (
              <Loading />
            ) : (
              filter && (
                <CategoryList products={filter} handleClick={handleClick} />
              )
            )}
          </div>
        </div>
        {  limit < countProducts ? (
        <div className="d-grid gap-2 col-3 mx-auto">
            <div className="btn btn-outline-secondary w-100" onClick={loadMore}>Xem thêm sản phẩm</div>
            
          </div>)
          : ( <div className="d-grid gap-2 col-3 mx-auto">
          <div className="btn btn-outline-secondary w-100" onClick={shortCut}>Rút gọn</div>
          
        </div>)
}
      </div>
        
    </div>
  );
}

export default ListProduct;
