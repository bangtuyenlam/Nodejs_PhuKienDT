import {
  Facebook,
  GitHub,
  Instagram,
  MailOutline,
  Phone,
  Twitter,
  Home,
} from "@material-ui/icons";
import React from "react";
import {Link} from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import PetsIcon from '@material-ui/icons/Pets';
function Footer() {
  return (
    <div>
       <ScrollToTop smooth top={800} component={<PetsIcon color='primary'/>}/>
      <footer
        className="text-center text-lg-start bg-warning text-muted"
        style={{ marginTop: "20px"}}
      >
        <section
        style={{ backgroundColor: "rgba(166, 181, 226, 1)" }}
         className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Liên lạc với chúng tôi thông qua:</span>
          </div>

          <div>
            <Link to={"/"} className="me-4 text-reset"
            reloadDocument={true}>
              <Facebook />
            </Link>
            <Link to={"/"} className="me-4 text-reset"
            reloadDocument={true}>
              <Twitter />
            </Link>
            <Link to={"/"} className="me-4 text-reset"
            reloadDocument={true}>
              <Instagram />
            </Link>
            <Link to={"/"} className="me-4 text-reset"
            reloadDocument={true}>
              <GitHub />
            </Link>
          </div>
        </section>

        <section className="" >
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Phụ kiện XZ
                </h6>
                <p>
                  Trang web bán các loại phụ kiện điện thoại với các sản phẩm
                  chất lượng cao, giá cả phù hợp một các nhanh chóng và tiện
                  lợi.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Truy cập</h6>
                <p>
                  <Link to={"/"} className="text-reset"
                  reloadDocument={true}>
                    Trang chủ
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="text-reset"
                  reloadDocument={true}>
                    Blog
                  </Link>
                </p>
                <p>
                  <Link to={"/"} className="text-reset"
                  reloadDocument={true}>
                    Liên hệ
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LIÊN HỆ</h6>
                <p>
                  <Home />
                  Ninh Kiều, Cần Thơ
                </p>
                <p>
                  <MailOutline />
                  tuyenb5382020@gmail.com
                </p>
                <p>
                  <Phone />
                  0989 243 536
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4 fw-bold"
          style={{ backgroundColor: "rgba(166, 181, 226, 1)" }}
        >
          © 2022 Copyright:
          <Link to={'/'} className="text-reset fw-bold" reloadDocument={true}>
            Phụ kiện XZ
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
