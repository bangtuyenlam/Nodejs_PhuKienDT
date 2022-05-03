import React from 'react';
import "./sidePersonal.css";
import {
  StorefrontOutlined, AssignmentIndOutlined,
  Update
  } from '@material-ui/icons';
  import { Link } from 'react-router-dom';
  import {getUser} from "../../../Utils/Common";
export default function SidePersonal() {
    const user = getUser();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Trang cá nhân</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <AssignmentIndOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={`/personal/${user["Khachhang.id"]}`}>
              Tài khoản
              </Link>
            </li>
    
            <li className="sidebarListItem">
            <StorefrontOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/personal/listorder'}>
             Đơn hàng
              </Link>
            
            </li>
          </ul>
        </div>
       </div>
    </div>
  )
}
