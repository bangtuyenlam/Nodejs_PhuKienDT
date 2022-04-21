import { Facebook, GitHub, Instagram, MailOutline, Phone, Twitter, Home } from "@material-ui/icons";
import React from "react";


function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start bg-light text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Liên lạc với chúng tôi thông qua:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <Facebook/>
            </a>
            <a href="" className="me-4 text-reset">
              <Twitter/>
            </a>
            <a href="" className="me-4 text-reset">
              <Instagram />
            </a>
            <a href="" className="me-4 text-reset">
              <GitHub/>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Phụ kiện XZ
                </h6>
                <p>
                  Trang web bán các loại phụ kiện điện thoại với các sản phẩm chất lượng cao,
                  giá cả phù hợp một các nhanh chóng và tiện lợi.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Truy cập</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Trang chủ
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Blog
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Liên hệ
                  </a>
                </p>
               
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <Home/>
                   Ninh Kiều, Cần Thơ
                </p>
                <p>
                  <MailOutline/>
                  tuyenb5382020@gmail.com
                </p>
                <p>
                  <Phone/>
                    0989 243 536
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
        >
          © 2022 Copyright:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            Phụ kiện XZ
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
