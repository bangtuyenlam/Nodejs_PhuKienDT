import React from "react";


import cover from "./image/360_F_269841802_kK2onWwT5uWj9g11exq9MZH9zHq4WmZ6.jpg";
import ListProduct from "./homePage/listproduct/ListProduct";

function Home() {
  return (
    <div>
    
      <div className="hero">
        <div className="card bg-dark text-white border-0">
          <img src={cover} className="card-img" alt="Cover" height="550px" />
          <div className="card-img-overlay d-flex flex-column justify-content-between">
            <div className="container">
              <h5 className="card-title display-3 fw-bolder mb-0">
                Cập nhật sản phẩm mới
              </h5>
              <p className="card-text lead fs-2">
                Tìm kiếm sản phẩm phù hợp xu hướng
              </p>
            </div>
          </div>
        </div>
        <ListProduct/>
      </div>
    </div>
  );
}

export default Home;
