import React from 'react';
import "./topbar.css";
import { Link } from "react-router-dom";
import { ExitToApp ,Person, CancelPresentation } from "@material-ui/icons";
import { getUser, removeUserSession, getToken } from "../../../Utils/Common";
import { useNavigate } from "react-router";
export default function Topbar() {
  const user = getUser();
  // const token = getToken();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeUserSession();
    navigate("/");
  };
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
        <div className="topLeft">
            <span className="logo">
            <Link className='topbarLink' to={'/admin/'}>
              Quản lý shop
              </Link>
                </span>
        </div>
        <div className="topRight">
        <div className="buttons">
              <Link
                className="btn btn-outline-dark"
                to={"/admin"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <Person />
                  {user.TenTK}
                </div>
              </Link>
              </div>
        <div className="buttons">
              <Link
                className="btn btn-outline-dark"
                to={"/"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <ExitToApp />
                  Trang chủ
                </div>
              </Link>
              </div>
           
            <Link
                className="btn btn-outline-dark"
                to={"/"}
                onClick={handleLogout}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <CancelPresentation/>
                  Đăng xuất
                </div>
              </Link>
              </div>
            </div>
        </div>
        
        
    
  )
}
