import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className='navbar-brand' to={'/'}> Trang chủ </Link>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        
          <Link className='nav-link active' aria-current="page" to={'/login'}> Đăng ký</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link active' aria-current="page" to={'/login'}> Đăng nhập </Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar