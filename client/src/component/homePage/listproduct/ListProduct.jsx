import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../../Utils/Common";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryList from "../categorylist/CategoryList";
import 'react-alice-carousel/lib/alice-carousel.css';
import ListDiscount from "../listdiscount/ListDiscount";
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

      <div className="container my-5 py-5">
      
    
          <ListDiscount handleClick={handleClick}/>
     
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
