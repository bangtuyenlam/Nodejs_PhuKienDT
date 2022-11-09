import React, {useEffect} from "react";
import { setUserSession, removeUserSession } from "../Utils/Common";
import { useNavigate } from "react-router";
import axios from "axios";
import cover from "./image/360_F_269841802_kK2onWwT5uWj9g11exq9MZH9zHq4WmZ6.jpg";
import ListProduct from "./homePage/listproduct/ListProduct";
import cover2 from "./image/pexels-ready-made-3921712.jpg";
import cover3 from "./image/pexels-andy-kuzma-1646704.jpg";
function Home({handleClick}) {
  
 
  return (
    <div>
    
      <div className="hero">
        {/* <div className="card bg-dark text-white border-0">
          <img src={cover} className="card-img" alt="Cover" height="620px" />
          <div className="card-img-overlay d-flex flex-column justify-content-between">
            <div className="container">
              <h5 className="card-title display-3 fw-bolder mb-2 mt-5">
                Cập nhật sản phẩm mới
              </h5>
              <p className="card-text lead fs-2">
                Tìm kiếm sản phẩm phù hợp xu hướng
              </p>
            </div>
          </div>
        </div> */}
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators" >
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner"  style={{ width: "100%"}}>
    <div className="carousel-item active">
    <img src={cover} className="card-img" alt="Cover" height="630px" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h3 className="fw-bolder">    Cập nhật sản phẩm mới</h3>
      
      </div> */}
    </div>
    <div className="carousel-item">
    <img src={cover2} className="card-img" alt="Cover" height="630px" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h3>Tìm kiếm sản phẩm phù hợp xu hướng</h3>
        
      </div> */}

    </div>
    <div className="carousel-item">
    <img src={cover3} className="card-img" alt="Cover" height="630px" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h3>Mua hàng nhanh chóng và tiện lợi</h3>
      
      </div> */}
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        <ListProduct handleClick={handleClick}/>

      </div>
    </div>
  );
}

export default Home;
