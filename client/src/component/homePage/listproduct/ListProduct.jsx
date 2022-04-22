import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
import { getUser} from "../../../Utils/Common";
import { useNavigate } from "react-router";
function ListProduct({handleClick}) {
  const user = getUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState(products);
  const [amount, setAmount] = useState();
  useEffect(() => {
    getData();
    getCategory();
  }, []);

  const getCategory = () =>{
     axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      }); 
    }

  const getData = async () => {
     await axios
      .get("/sanpham")
      .then((res) => {
        setProducts(res.data);
        setFilter(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err + " Không thể lấy được sản phẩm");
      });
  };

  const getid = (id) => {
      const filterProduct = products.filter(value => value.LSP_Ma === id);
      setFilter(filterProduct);
  }

  
  const CategoryList = () => {
    return (
        <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
            <button key={0} className="btn btn-outline-dark me-2" onClick={() => setFilter(products)}>Tất cả sản phẩm</button>
            {categoryList && categoryList.map(value => {
                return (
                <button key={value.id} className="btn btn-outline-dark me-2" onClick={() => getid(value.id)}>{value.LSP_Ten}</button>
                )
            })}
        </div>
        {filter&& filter.map((product) => {
            return(
                <>
                {setAmount(product.amount = 1)}
                <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                <Link to={`/product/${product.id}`}>
                        
                    <img 
                    src={`http://localhost:5000/image/${product.Anhdaidien}`}
                    alt="Anh dai dien"
                    className="card-img-top"
                    height="180px"
                    />
        
                            </Link>
                    <div className="card-body">
                        <p className="card-title"><b>{product.SP_Ten.substring(0,50)}</b></p>
                        <p className="card-text lead fw-bold">{product.SP_Gia} VNĐ</p>

                        
                        <button className="btn btn-outline-dark" onClick={() => handleClick(product)}>
                        Thêm vào giỏ hàng
                            </button>
                           
                        
                    </div>
                    </div>
                </div>
                </>
            )
        })}
        </>
    )
  }
  return ( 
  <div>
      <div className="container my-5 py-5">
          <div className="row">
              <div className="col-12 mb-5">
                  <h1 className="display-6 fw-bolder text-center">Latest Product</h1>
                  <hr/>
              </div>
          </div>
          
          <div className="row justify-content-center">
              <CategoryList/>
          </div>
      </div>
  </div>
  )
}

export default ListProduct;
