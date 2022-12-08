import React from 'react';
import "./sidePersonal.css";
import {
  StorefrontOutlined, AssignmentIndOutlined,
  RateReviewOutlined, StarBorder, VpnKey
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
              Thông tin cá nhân
              </Link>
            </li>
    
            <li className="sidebarListItem">
            <StorefrontOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/personal/listorder'}>
             Đơn hàng
              </Link>
            
            </li>

            {/* <li className="sidebarListItem">
            <RateReviewOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/personal/purchased-product'}>
             Đánh giá sản phẩm
              </Link>
            
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Sản phẩm đã mua</h3>
          <ul className="sidebarList">
          <li className="sidebarListItem">
            <RateReviewOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/personal/review-product'}>
             Đánh giá
              </Link>
            
            </li>

            <li className="sidebarListItem">
            <StarBorder className='sidebarIcon'/>
              <Link className='sidebarLink' to={`/personal/reviewed-product/${user["Khachhang.id"]}`}>
             Đã đánh giá
              </Link>
            
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tài khoản</h3>
          <ul className="sidebarList">
          <li className="sidebarListItem">
            <VpnKey className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/personal/review-product'}>
             Đổi mật khẩu
              </Link>
            
            </li>

          
          </ul>
        </div>
       </div>
    </div>
  )
}
