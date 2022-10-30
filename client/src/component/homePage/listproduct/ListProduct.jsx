import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser } from "../../../Utils/Common";
import { Pagination } from "@material-ui/lab";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CategoryList from "../categorylist/CategoryList";
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
          filter.map(() => {
            return (
              <div className="col-md-3 mb-4">
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

  // const CategoryList = () => {
  //   return (
  //     <>
  //       <div className="buttons d-flex justify-content-center mb-5 pb-5">
  //         <button
  //           key={0}
  //           className="btn btn-outline-dark me-2"
  //           onClick={() => setFilter(products)}
  //         >
  //           Tất cả sản phẩm
  //         </button>
  //         {categoryList &&
  //           categoryList.map((value) => {
  //             return (
  //               <button
  //                 key={value.id}
  //                 className="btn btn-outline-dark me-2"
  //                 onClick={() => getid(value.id)}
  //               >
  //                 {value.LSP_Ten}
  //               </button>
  //             );
  //           })}
  //       </div>
  //       {loading ? (
  //         <Loading />
  //       ) : (
  //         filter &&
  //         filter.map((product) => {
  //           return (
  //             <>
  //               {setAmount((product.amount = 1))}
  //               <div className="col-md-3 mb-4">
  //                 <div className="card h-100 text-center p-4" key={product.id}>
  //                   <Link to={`/product/${product.id}`}>
  //                     <img
  //                       key={product.id}
  //                       src={`http://localhost:5000/image/${product.Anhdaidien}`}
  //                       alt="Anh dai dien"
  //                       className="card-img-top"
  //                       height="180px"
  //                     />
  //                   </Link>
  //                   <div className="card-body">
  //                     <p className="card-title">
  //                       <b key={product.SP_Ten}>{product.SP_Ten.substring(0, 50)}</b>
  //                     </p>
  //                     <p className="card-text lead fw-bold" key={product.SP_Gia}>
  //                       {product.SP_Gia} VNĐ
  //                     </p>

  //                     {user !== null ? (
  //                       <button
  //                         className="btn btn-outline-dark"
  //                         onClick={() => handleClick(product)}
  //                       >
  //                         Thêm vào giỏ hàng
  //                       </button>
  //                     ) : (
  //                       <Link className="btn btn-outline-dark" to={"/login"}>
  //                         Đăng nhập/Đăng ký để mua hàng
  //                       </Link>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             </>
  //           );
  //         })
  //       )}
  //     </>
  //   );
  // };

  // <section style={{display: "flex"}}>
  // <div class="container py-5">
  //   <div class="row">
  //     <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
  return (
    <div>
      <div className="container my-5 py-5">
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
