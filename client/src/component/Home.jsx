import React, {useEffect} from "react";
import { setUserSession, removeUserSession } from "../Utils/Common";
import { useNavigate } from "react-router";
import axios from "axios";
import cover from "./image/1615267646c5fd7d8146a32e9eee257b25a0ded7ae.png";
import ListProduct from "./homePage/listproduct/ListProduct";
import cover2 from "./image/1615267853f39977d392ba9de413da48c8fdd41387.jpg";
import cover3 from "./image/01_Apraad43118d5560ef4e4af1620cd813334.gif";
function Home({handleClick}) {
  
 
  return (
    <div>
    
      <div className="carousel pt-3">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators" >
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
 
  <div className="carousel-inner"  style={{ width: "100%"}}>
    <div className="carousel-item active">
    <img src={cover} className="card-img" alt="Cover" height="500px" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h3 className="fw-bolder">    Cập nhật sản phẩm mới</h3>
      
      </div> */}
    </div>
    <div className="carousel-item">
    <img src={cover2} className="card-img" alt="Cover" height="500px" />
      {/* <div className="carousel-caption d-none d-md-block">
        <h3>Tìm kiếm sản phẩm phù hợp xu hướng</h3>
        
      </div> */}

    </div>
    <div className="carousel-item">
    <img src={cover3} className="card-img" alt="Cover" height="500px" />
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
        
      </div>
      <ListProduct handleClick={handleClick}/>

    </div>
  );
}

export default Home;
