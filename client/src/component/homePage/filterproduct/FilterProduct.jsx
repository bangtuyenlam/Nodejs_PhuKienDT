import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import banner1 from "../../image/12_Mar131771c46f2072bd40605e9f002c4b66.gif";
import banner2 from "../../image/banner phukien.jpg";
import banner3 from "../../image/banner_home_1.jpg";
import axios from 'axios';
import Product from "../product/Product";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function FilterProduct({handleClick}) {
    const categoryId = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(0);
    const [countProducts, setCountProducts] = useState();
    useEffect(() => {
      getData();
    }, [limit])

    const getData = async () => {
      await axios
        .post(`/locsp/${categoryId.id}`, {
          limit: limit,
        })
        .then((res) => {
          if(limit === 0) {
            setProducts(res.data.rows)
            }
            else setProducts(data => [...data, ...res.data.rows])
            setCountProducts(res.data.count.length);
            setLoading(false);
        })
        .catch((err) => {
          console.log(err + " Không thể lấy được sản phẩm");
        });
    };
    const Loading = () => {
      return (
        <>
          {products &&
            products.map((sp, i) => {
              return (
                <div className="col-md-3 mb-4" key={i}>
                  <Skeleton height={300} />
                </div>
              );
            })}
        </>
      );
    };
    console.log(products);
    
  const loadMore = () => {
   
    setLimit(limit+1);
  }

  const shortCut = () => {
    setLimit(0);
  }

    const Carousel = () => (
      <div id="carouselExampleIndicators" className="carousel slide pt-sm-5" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner" style={{width: "100%", height: "250px"}}>
        <div className="carousel-item active"> 
          <img src={banner1} className="card-img bg-image hover-zoom" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src={banner2} className="card-img bg-image hover-zoom" alt="..." />
        </div>
        <div className="carousel-item">
        <img src={banner3} className="card-img bg-image hover-zoom" alt="..." />
        </div>
      </div>
    </div>
    )
  return (
    <div className='container my-5 py-2'>
      <Carousel/>

    <div className='p-2 mt-5 bg-danger bg-opacity-100'>
      <div className="row mt-2">
            {loading ? (
              <Loading />
            ) : (
              products && (
                <Product products={products} handleClick={handleClick} />
              )
            )}
          </div>
          {  products.length < countProducts ? (
        <div className="d-grid gap-2 col-3 mx-auto">
            <div className="btn btn-outline-secondary w-100" onClick={loadMore}>Xem thêm sản phẩm</div>
            
          </div>)
          : ( products.length > 12 && <div className="d-grid gap-2 col-3 mx-auto">
          <div className="btn btn-outline-secondary w-100" onClick={shortCut}>Rút gọn</div>
          
        </div>)
}
</div>
  
    
    </div>
  )
}

export default FilterProduct