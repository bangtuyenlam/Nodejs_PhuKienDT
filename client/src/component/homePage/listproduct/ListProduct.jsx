import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryList from "../categorylist/CategoryList";
import Product from "../product/Product";
import 'react-alice-carousel/lib/alice-carousel.css';
import ListDiscount from "../listdiscount/ListDiscount";
import ListHotProduct from "../listhot/ListProductHot";
function ListProduct({ handleClick }) {
  const user = getUser();
  const [products, setProducts] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(products);
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);
  const [countProducts, setCountProducts] = useState();

  
  useEffect(() => {
    getData();
    getCategory();
  }, [limit]);

  
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

 
  return (
    <div>

      <div className="container my-5 py-2">

    
      
      <div className="border border-info bg-info p-2 mb-5">
      <h5 className="fw-bolder">SẢN PHẨM KHUYẾN MÃI</h5>
          <ListDiscount handleClick={handleClick}/>
          </div>

          <div className="bg-warning p-2 mb-5 bg-opacity-25" >
      <h5 className="fw-bolder">SẢN PHẨM NỔI BẬT</h5>
          <ListHotProduct handleClick={handleClick}/>
          </div>

          <div className="bg-light p-2 mb-5 pb-4">
      <h5 className="fw-bolder">DANH MỤC SẢN PHẨM</h5>
          <CategoryList/>
          </div>
        <div className="p-2 mb-5 bg-danger bg-opacity-50">
        
            <h2 className="fw-bolder text-center">Tất cả sản phẩm</h2>
            <hr />
       
          <div>
          <div className="row">
            {loading ? (
              <Loading />
            ) : (
              filter && (
                <Product products={filter} handleClick={handleClick} />
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

        {/* <div className="buttons d-flex justify-content-center mb-1 pb-5">
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
        </div> */}
        
      </div>
        
    </div>
  );
}

export default ListProduct;
