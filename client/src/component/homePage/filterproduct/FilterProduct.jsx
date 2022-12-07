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
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(0);
    const [countProducts, setCountProducts] = useState();
    const [phoneList, setPhoneList] = useState([]);
    const [phoneId, setPhoneId] = useState([]);
    const [product, setProduct] = useState([]);
    const [sort, setSort] = useState(0);
    useEffect(() => {
      getPhoneList();
      if(phoneId.length > 0) {
      filterbyPhone();
      }
      else 
      getData();
    }, [limit, phoneId, sort])
  //   console.log(phoneId)
  //   console.log(products);
  // console.log(product);

    const getData = async () => {
      await axios
        .post(`/locsp/${categoryId.id}`, {
          limit: limit,
          sortid: sort,
        })
        .then((res) => {
          if(limit === 0) {
            setProduct(res.data.rows)
            }
            else setProduct(data => [...data, ...res.data.rows])
            setCountProducts(res.data.count.length);
            setLoading(false);
        })
        .catch((err) => {
          console.log(err + " Không thể lấy được sản phẩm");
        });
    };
    console.log(countProducts);

    const filterbyPhone = () => {
      axios
      .post(`/locsp/dt/${categoryId.id}`, {
       limit: limit,
       madt: phoneId,
       sortid: sort 
     })
       .then((res) => {
        if(limit === 0) {
          setProduct(res.data.rows)
          }
          else setProduct(data => [...data, ...res.data.rows])
          setCountProducts(res.data.count.length);
          setLoading(false);
       })
       .catch((err) => {
         console.log(err);
       }); 
    }

    const getPhoneList = () => {
      axios
      .get("/dienthoai")
      .then((res) => {
        setPhoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const Loading = () => {
      return (
        <>
          {product &&
            product.map((sp, i) => {
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

    const getLstPhoneId = (value) => {
     
      if(phoneId.includes(value) === false) {
        setPhoneId([...phoneId, value])
      }else
        setPhoneId(phoneId.filter((item) => item !== value))
      
    }

    const selectSortChange = (value) => {
      setSort(value.target.value);
    }
    console.log(countProducts);
  return (
    <div className='container my-5 py-2'>
      <Carousel className="mb-5"/>
      <h5 className="fw-bolder mt-5">Tìm được {product.length} sản phẩm</h5>

      <div className="bg-light p-2 mb-5 pb-4 shadow-lg mt-3">
      <h5 className="fw-bolder">Bộ lọc</h5>
          <hr/>
         
          <div className="buttons d-inline justify-content-center mb-1 pb-5">
      {phoneList &&
            phoneList.map((value) => {
              return (
                <button
                  key={value.id}
                  className="btn btn-outline-dark ms-1 me-1 mb-2"
                  style={{ backgroundColor: phoneId.includes(value.id) ? "rgba(166, 181, 226, 1)" : "rgba(161, 89, 160, 0.9)" }}
                  onClick={() => getLstPhoneId(value.id)}
                >
                  <img className="rounded-circle" style={{width: "60px", height: "50px"}} src={`http://localhost:5000/image/${value.DT_Anh}`}/>
                  <div> {value.DT_Ten} </div>
                  
                </button>
              );
            })}
    </div>

      </div>
    <div className='p-3 mb-5 mt-5 bg-danger bg-opacity-100 shadow-lg'>
      <div className='d-flex flex-row-reverse bd-highlight'>
      <select
            className="p-2 border-0 rounded"
            id="order"
            onChange={selectSortChange}
            placeholder="Sắp xếp: "
          >
 
            <option value={0}>
              Mặc định
            </option>

           
                  <option value={1} key={1}>
                    Giá cao đến thấp
                  </option>
                  <option value={2} key={2}>
                    Giá thấp đến cao
                  </option>
                  <option value={3} key={3}>
                    Mới nhất
                  </option>
                  <option value={4} key={4}>
                    Giảm giá
                  </option>
              
          </select>
      </div>
      <div className="row mt-2">
            {loading ? (
              <Loading />
            ) : (
              product && (
                product[0] ?
                // phoneId.length > 0  ?
                <Product products={product} handleClick={handleClick}/> :
                // : <Product products={products} handleClick={handleClick}/>

                <div className="d-flex justify-content-center fw-bold">
          Không tìm thấy sản phẩm phù hợp yêu cầu
        </div>
              )
            )}
          </div>
          {  product.length < countProducts  ? (
        <div className="d-grid gap-2 col-3 mx-auto">
            <div className="btn btn-outline-secondary w-100" onClick={loadMore}>Xem thêm sản phẩm</div>
            
          </div>)
          : ( product.length > 12 && <div className="d-grid gap-2 col-3 mx-auto">
          <div className="btn btn-outline-secondary w-100" onClick={shortCut}>Rút gọn</div>
          
        </div>)
}
</div>
  
    
    </div>
  )
}

export default FilterProduct