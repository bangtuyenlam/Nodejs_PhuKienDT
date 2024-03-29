import React from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PersonOutline,
  MessageOutlined,
  FeedbackOutlined,
  RateReview,
  StorefrontOutlined,
  AssignmentIndOutlined,
  LocalOfferOutlined,
  InputOutlined,
} from "@material-ui/icons";
import "./sidebar.css";
import {getUser} from "../../../Utils/Common";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const nv = getUser();
  return (
    <div className="sidebar ">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className=" bg-info bg-opacity-25">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">MENU</span>
              </div>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                  <Link to={"/admin/"} className="nav-link px-0">
                    <LineStyle className="sidebarIcon" />
                    <span className="ms-1 d-none d-sm-inline">Trang chủ</span>
                  </Link>
                </li>
                {/* <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                            </li>
                        </ul>
                    </li> */}
                <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                  <Link
                    to={"/admin/invoiceManager"}
                    className="nav-link px-0"
                  >
                    <Timeline className="sidebarIcon" />
                    <span className="ms-1 d-none d-sm-inline">Đơn hàng</span>
                  </Link>
                </li>
              
                {/* <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                            <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li className="w-100">
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                            </li>
                        </ul>
                    </li> */}
                <li>
                  <a
                    href="#submenu1"
                    data-bs-toggle="collapse"
                    className="nav-link px-0"
                  >
                    <i className="fs-4 bi-grid"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      Quản lý sản phẩm
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav ms-1"
                    id="submenu1"
                    data-bs-parent="#menu"
                  >
                    <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                        to={"/admin/importProduct"}
                        className="nav-link px-0"
                      >
                        <InputOutlined className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Nhập hàng
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                        to={"/admin/productManager"}
                        className="nav-link px-0"
                      >
                        <StorefrontOutlined className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Sản phẩm
                        </span>
                      </Link>
                    </li>
                    <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                        to={"/admin/discountProducts"}
                        className="nav-link px-0"
                      >
                        <LocalOfferOutlined className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Khuyến mãi
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="#submenu2"
                    data-bs-toggle="collapse"
                    className="nav-link px-0"
                  >
                    <i className="fs-4 bi-grid"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">
                      Quản lý người dùng
                    </span>{" "}
                  </a>
                  <ul
                    className="collapse nav ms-1"
                    id="submenu2"
                    data-bs-parent="#menu"
                  >
                    <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                        to={"/admin/customerManager"}
                        className="nav-link px-0"
                      >
                        <PersonOutline className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Khách hàng
                        </span>
                      </Link>
                    </li>
                    {nv["Nhanvien.Maquyen"] === 1 ? (
                    <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                         to={"/admin/employeeManager"}
                        className="nav-link px-0"
                      >
                        <AssignmentIndOutlined className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Nhân viên
                        </span>
                      </Link>
                    </li>
                    ) : <></>}
                    {/* <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                      <Link
                        to={"/admin/discountProducts"}
                        className="nav-link px-0"
                      >
                        <LocalOfferOutlined className="sidebarIcon" />
                        <span className="ms-1 d-none d-sm-inline">
                          Tài khoản
                        </span>
                      </Link>
                    </li> */}
                  </ul>
                </li>

                
                <li className="nav-item btn btn-outline-dark ps-4 pe-4 border-0">
                  <Link
                    to={"/admin/postManager"}
                    className="nav-link px-0"
                  >
                    <RateReview className="sidebarIcon" />
                    <span className="ms-1 d-none d-sm-inline">Bài đăng</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  );
}
