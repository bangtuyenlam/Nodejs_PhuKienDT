import React from "react";
import { Link } from "react-router-dom";
import { AddShoppingCart, ExitToApp, PersonAdd } from "@material-ui/icons";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div class="container">
          <Link className="navbar-brand fw-bold fs-4" to={"/"}>
            Phụ kiện điện thoại
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-4 mb-lg-0">
              <li class="nav-item">
                <Link
                  className="nav-link active"
                  to={"/"}
                  style={{ fontSize: 18 }}
                >
                  Trang chủ
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={"/"} style={{ fontSize: 18 }}>
                  Blog
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={"/"} style={{ fontSize: 18 }}>
                  Liên hệ
                </Link>
              </li>
            </ul>
            <div className="buttons">
              <Link
                className="btn btn-outline-dark"
                to={"/login"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <ExitToApp />
                  Đăng nhập
                </div>
              </Link>
              </div>
              <div>
              <Link
                className="btn btn-outline-dark"
                to={"/register"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <PersonAdd />
                  Đăng ký
                </div>
              </Link>
            </div>
            <div>
            <Link
              className="btn btn-outline-dark"
              to={"/"}
              style={{ marginRight: 6, marginBottom: 3 }}
            >
              <div className="fa fa-login">
                <AddShoppingCart />
                Giỏ hàng
              </div>
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
    //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container-fluid">
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <Link className='navbar-brand' to={'/'}> Trang chủ </Link>
    //     <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">

    //           <Link className='nav-link active' aria-current="page" to={'/register'}> Đăng ký</Link>
    //         </li>
    //         <li className="nav-item">
    //         <Link className='nav-link active' aria-current="page" to={'/login'}> Đăng nhập </Link>
    //         </li>

    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;
