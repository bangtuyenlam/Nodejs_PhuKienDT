import React from 'react';
import {LineStyle, Timeline, TrendingUp, 
  PersonOutline, MessageOutlined,
FeedbackOutlined, RateReview,
StorefrontOutlined, AssignmentIndOutlined
} from '@material-ui/icons';
import './sidebar.css';
import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyle className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/admin/'}>
              Trang chủ
              </Link>
            </li>
            <li className="sidebarListItem">
              <Timeline className='sidebarIcon'/>
              Phân tích
            </li>
            <li className="sidebarListItem">
              <TrendingUp className='sidebarIcon'/>
              Bán
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <StorefrontOutlined className='sidebarIcon'/>
              Sản phẩm
            </li>
            <li className="sidebarListItem">
              <PersonOutline className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/admin/customerManager'}>
              Khách hàng
              </Link>
            </li>
            <li className="sidebarListItem">
              <AssignmentIndOutlined className='sidebarIcon'/>
              <Link className='sidebarLink' to={'/admin/employeeManager'}>
              Nhân viên
              </Link>
            </li>
            <li className="sidebarListItem">
              <RateReview className='sidebarIcon'/>
              Bài đăng
            </li>

          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <FeedbackOutlined className='sidebarIcon'/>
              Phản hồi
            </li>
            <li className="sidebarListItem">
              <MessageOutlined className='sidebarIcon'/>
              Tin nhắn
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
